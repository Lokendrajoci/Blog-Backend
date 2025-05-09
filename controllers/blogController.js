const Blog = require("../models/BlogModel");
const APIFeatures = require("../utils/apiFeatures");

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    
    const fetures = new APIFeatures(Blog.find(), req.query);
    console.log("Features object:", fetures);
    // 1. Filtering
    fetures.filter();
    // console.log("Final query being executed:", fetures.query);
    const blogs = await fetures.query;
    // const blogs = await Blog.find().sort(sortOptions);
    res.status(200).json({
      status: "success",
      results: blogs.length,
      data: {
        blogs,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Get a blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        status: "fail",
        message: "Blog not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
