const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  name: String,
  text: String,
  email: String,
});

const Post = mongoose.model("post", PostSchema);
module.export = Post;
