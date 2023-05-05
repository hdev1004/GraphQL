# Apollo server를 이용한 GraphQL 구현

Node JS와 Apollo Server를 이용해 GraphQL의 설계 규칙을 반영하여 구현

참고 자료

- [노마드 코더 - GraphQL](https://nomadcoders.co/graphql-for-beginners/lobby?gad=1&gclid=Cj0KCQjw0tKiBhC6ARIsAAOXutlzEYvK3TlXjFMtREUjTyLZly1_VgZ4kRKV3Bnp777sjaOikuEk3Y8aAjk8EALw_wcB)

<br>

## 📕GraphQL 이란?

1. GraphQL은 페이스북에서 개발한 쿼리 언어 
2. RESTful API와 같은 기존의 API 설계 방식에서는 클라이언트가 필요한 데이터를 받아오기 위해 여러 번의 요청을 보내야 했지만, GraphQL에서는 클라이언트가 필요한 데이터의 구조를 정의한 후, 해당 구조에 맞게 데이터를 한 번에 요청할 수 있음. 
3. 이를 통해 불필요한 데이터 전송을 줄이고, 효율적인 데이터 요청이 가능함.

<br>

## 📕사용하는 이유
1. GraphQL을 사용하는 가장 큰 이유는 오버패칭과 언더패칭을 해결할 수 있음. 
2. RESTful API에서는 클라이언트가 요청한 데이터보다 많은 데이터를 가져오는 오버패칭과, 클라이언트가 요청한 데이터를 가져오기 위해 여러 번 요청해야 하는 언더패칭의 문제가 발생할 수 있음. 
3. GraphQL은 필요한 데이터만을 선택적으로 요청할 수 있는 기능을 제공하기 때문에, 네트워크 비용과 성능을 효율적으로 관리할 수 있음.


<br>

## 📕Usage

필수 요구사항 : `nodeJS`

다운로드 - `git clone https://github.com/hdev1004/GraphQL.git`

<br>

### 📖 Ready

현재는 Mysql을 사용하지 않고, 로컬 변수로 진행하였음.

추후 다른 언어 및 Mysql을 추가할 예정.

```
npm i
npm run dev
```

`http://localhost:4000` 접속 

<br>

### 📖 CRUD

GraphQL의 CRUD를 위해 Mutation을 이용하여 post와 delete를 구현하였음

```javascript
type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    """
        Deletes a Tweet if found, else returns false
    """
    deleteTweet(id: ID!): Boolean!
}
```

<br>

postTweet

```
postTweet(_, {text, userId}) {
    const newTweet = {
        id: tweets.length + 1,
        text,
    };
    tweets.push(newTweet);
    return newTweet;
}
```

<br>

deleteTweet

```
deleteTweet(_, {id}) {
    const tweet = tweets.find(tweet => tweet.id === id);
    if(!tweet) return false;
    tweets = tweets.filter(tweet => tweet.id !== id)
    return true;
}
```

<br>

<b>Thank you!</b>
