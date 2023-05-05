import { ApolloServer, gql } from "apollo-server";
import fetch from "node-fetch";

let tweets = [
    {
        id: "1",
        text: "first one!",
        userId: "2"
    },
    {
        id: "2",
        text: "second one!",
        userId: "1"
    },
]

let users = [
    {
        id: "1",
        firstName: "nico",
        lastName: "las"
    },
    {
        id: "2",
        firstName: "jinwon",
        lastName: "kim"
    }
]

const typeDefs = gql`

    type User {
        id: ID,
        firstName: String!
        lastName: String!
        """
           Is the sum of firstName + lastName as a String 
        """
        fullName: String!
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
        allTweets() {
            return tweets;
        },
        allUsers() {
            console.log("allUsers called!");
            return users;
        },
        tweet(root, {id}) {
            return tweets.find((tweet) => tweet.id === id);
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
        postTweet(_, {text, userId}) {
            const newTweet = {
                id: tweets.length + 1,
                text,
            };
            tweets.push(newTweet);
            return newTweet;
        },
        deleteTweet(_, {id}) {
            const tweet = tweets.find(tweet => tweet.id === id);
            if(!tweet) return false;
            tweets = tweets.filter(tweet => tweet.id !== id)
            return true;
        }
    },
    User: { //이렇게 전역으로 해줄 수 있음
        fullName({firstName, lastName}) { //root를 쓰면 전역에서 부른 객체 값을 가져올 수 있음, 또는 {}로 가져올 수 있음
            return `${firstName} ${lastName}`
        }
    },
    Tweet: {
        author({userId}) {
            return users.find(user => user.id === userId)
        }
    }
}


const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({url}) => {
    console.log(`Running on ${url}`)
})