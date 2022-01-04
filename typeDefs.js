// const userData = require("./Data.json");
const { ApolloServer, gql } = require("apollo-server-express");

const typeDefs = gql`
  type Post {
    name: String!
    text: String!
  }

  type Query {
    getAllPosts: [Post!]!
  }

  type Mutation {
    createPost(name: String!, text: String!): Post
  }
`;

module.exports = { typeDefs };
