const mongoose = require("./connect");

const PostSchema = mongoose.Schema(
  {
    title: String,
    content: String,
    author: {
      type: String,
      ref: "user",
    },
    date: Number,
  },
  { collection: "post" }
);

const PostModel = mongoose.model("post", PostSchema);
module.exports = PostModel;
