const express = require("express");
const data = require("./Data.json");
const mysql = require("mysql2");
const { ApolloServer, gql } = require("apollo-server-express");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
// const typeDefs = require("./typeDefs");
// const resolvers = require("./resolvers");
const { conn } = require("./db");

const typeDefs = gql`
  type Note {
    name: String!
    text: String!
    id: ID!
  }
  type Query {
    notes: [Note!]!
  }

  type Mutation {
    addNote(name: String!, text: String!, id: ID!): Note
  }

  type Mutation {
    deleteNote(name: String!, text: String!, id: ID!): Note
  }
`;

const resolvers = {
  Query: {
    notes: () => {
      //mysql2
      conn;
      return new Promise((res, rej) => {
        conn.query("SELECT * FROM customers", function (err, result, fields) {
          return res(result);
        });
      });
    },
  },

  Mutation: {
    addNote(parents, args) {
      const note = {
        name: args.name,
        text: args.text,
        id: args.id,
        email: null,
      };

      console.log(note, "here");

      return new Promise((res, rej) => {
        let sql = `INSERT INTO customers (name, text, id) VALUES ('${note.name}', '${note.text}', '${note.id}')`;
        conn.query(sql, note, (err, result, fields) => {
          if (!err) {
            res(result);
          }
        });
      });
    },
    deleteNote(parents, args) {
      const note2 = {
        name: args.name,
        text: args.text,
        id: args.id,
        email: null,
      };
      console.log(note2, "delete note");
      //delete from mysql
    },
  },
};

let PORT = 3060;

async function createServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground({ app })],
  });

  await server.start();

  server.applyMiddleware({ app });

  app.get("/graphql", (req, res) => {
    res.send("hello world");
  });

  app.listen(PORT, () => {
    console.log(`port listen on http://localhost:${PORT}/graphql`);
  });
}

createServer();
