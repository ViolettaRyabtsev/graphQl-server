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
  type Cocktail {
    id: ID!
    name: String!
    image: String!
    text: String!
    price: Int!
  }

  type Query {
    cocktailList: [Cocktail!]!
  }

  type Login {
    id: ID!
    username: String!
    password: String!
  }

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

  type Mutation {
    addUser(id: ID!, username: String!, password: String!): Login
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

    cocktailList: () => {
      const sql = "SELECT * FROM cocktails";
      return new Promise((res, rej) => {
        conn.query(sql, (err, result, fields) => {
          console.log(result, "cocktails");
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
        id: Number(args.id),
        email: null,
      };
      console.log(note2, "delete note");
      //delete from mysql
      return new Promise((res, rej) => {
        const sql = `DELETE FROM customers WHERE id=${note2.id}`;
        conn.query(sql, note2, (err, result, fields) => {
          if (!err) res(result);
        });
      });
    },
    addUser(parents, args) {
      const NewUser = {
        id: args.id,
        username: args.username,
        password: args.password,
      };
      console.log(NewUser, "add User ");
      let sql = `INSERT INTO users (id, username, password ) VALUES ('${NewUser.id}', '${NewUser.username}', '${NewUser.password}')`;
      return new Promise((res, rej) => {
        conn.query(sql, function (err, result, fields) {
          return res(result);
        });
      });
    },
  }, //end of mutation
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
