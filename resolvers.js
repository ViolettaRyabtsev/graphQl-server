const userData = require("./Data.json");
const mongoose = require("mongoose");
const Post = require("./post.model");

const resolvers = {
  Query: {
    getAllPosts: async () => {
      // #find data in database
      const posts = new Post();
      return posts;
    },
  },

  Mutation: {
    createPost: async (parent, args, context, info) => {
      const newPost = new Post({
        text: args.text,
        name: args.name,
        email: args.email,
      });
      return new Promise((resolve, reject) => {
        newPost.save((err) => {
          if (err) reject(err);
          else resolve(newPost);
        });
      });
    },
  },
};

module.exports = { resolvers };
