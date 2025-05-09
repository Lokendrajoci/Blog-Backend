const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, "A blog must have a title"],
  },
  content: {
    type: String,
    required: [true, "A blog must have content"],
  },
  author: {
    type: String,
    required: [true, "A blog must have an author"],
  },
  tags: {
    type: [String], // Array of strings
    default: [],
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
