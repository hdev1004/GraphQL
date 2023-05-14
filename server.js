import { ApolloServer, gql } from "apollo-server";
import fetch from "node-fetch";

import connection from "./db.js";
import { promisify } from 'util';

import * as userGET from "./get/user.js";
import * as tweetGet from "./get/tweet.js";

import * as tweetPost from "./post/tweet.js";

import * as tweetDel from "./delete/tweet.js";

const query = promisify(connection.query).bind(connection);

const loaded = async () => {
    const server = new ApolloServer({ typeDefs, resolvers })

    server.listen().then(({url}) => {
        console.log(`Running on ${url}`)
    })
}

const typeDefs = gql`
    type User {
        id: ID,
        name: String!
        """
           Is the sum of firstName + lastName as a String 
        """
        age: String!
        fullInfo: String!
    }

    """
    Tweet object represents a resource for a Tweet
    """
    type Tweet {
       id: ID!
       text: String!
       author: User
    }

    type Query {
        #allTweets: [Tweet] 이렇게 하면 [Tweet, null, Tweet] 이런형태로 저장될 수 있어서 !를 붙임
        allTweets: [Tweet!]!
        allUsers: [User!]!
        allMovies: [Movie!]!
        user(id: ID!): User 
        tweet(id: ID!): Tweet
        movie(id: String!): Movie
    }

    type Mutation {
        postTweet(text: String!, userId: ID!): Tweet!
        """
            Deletes a Tweet if found, else returns false
        """
        deleteTweet(id: ID!): Boolean!
    }

    type Movie {
        id: Int!
        url: String!
        imdb_code: String!
        title: String!
        title_english: String!
        title_long: String!
        slug: String!
        year: Int!
        rating: Float!
        runtime: Float!
        genres: [String]!
        summary: String
        description_full: String!
        synopsis: String
        yt_trailer_code: String!
        language: String!
        background_image: String!
        background_image_original: String!
        small_cover_image: String!
        medium_cover_image: String!
        large_cover_image: String!
    }
`

const resolvers = {
    
    Query: {
        async tweet(root, {id}) {
            let data = await tweetGet.getTweet(query, id);
            return data;
        },
        async allTweets() {
            let data = await tweetGet.getAllTweets(query);
            return data;
        },
        async user(_, {id}) {
            let data = await userGET.getUser(query, id);
            return data;
        },
        async allUsers() {
            let data = await userGET.getAllUsers(query);
            return data;
        },
        allMovies() {
            return fetch("https://yts.mx/api/v2/list_movies.json")
                .then(r => r.json())
                .then(json => json.data.movies);
        },
        movie(_, {id}) {
            return fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
            .then(r => r.json())
            .then(json => json.data.movie);
        }
    },
    Mutation: {
        async postTweet(_, {text, userId}) {
            let res = await tweetPost.postTweet(query, text, userId);
            const newTweet = {
                id: "new id",
                text: res ? text : "error"
            };
            return newTweet;
        },
        async deleteTweet(_, {id}) {
            let data = await tweetDel.deleteTweet(query, id);
            return data;
        }
    },
    User: { //이렇게 전역으로 해줄 수 있음
        fullInfo({id, name, age}) { //root를 쓰면 전역에서 부른 객체 값을 가져올 수 있음, 또는 {}로 가져올 수 있음
            return `${id} ${name} ${age}`
        }
    },
    Tweet: {
        async author({userId}) { //tweet 함수에서 받은 데이터 정보를 토대로 확인
            let data = await userGET.getUser(query, userId);
            return data
        }
    }
}

loaded();

