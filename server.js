const url = "http//localhost:4000/";
const PORT = 4000;
const express = require("express");
const { typeDefs } = require("./typeDefs.js");
const { resolvers } = require("./resolvers");
const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    resolvers,
    typeDefs,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        // options
      }),
    ],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });
  app.use((req, res) => {
    res.send("hello from apollo");
  });
  mongoose.connect("mongodb://localhost:27017/graphql");
  // mongoose.connection.on("open", () => console.log("connected"));
  mongoose.connection.once("open", () => {
    console.log("connected");
  });
  app.listen(PORT, () =>
    console.log(`🚀  Server ready at http//localhost:${PORT}/graphql`)
  );
}

startServer();
