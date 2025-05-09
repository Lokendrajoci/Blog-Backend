const Blog = require("../models/BlogModel");
const APIFeatures = require("../utils/apiFeatures");
const qs = require("qs");
// Get all blogs
exports.getAllBlogs = async (req, res) => {
  const queryP = qs.parse(req.query);

  try {
    // Create a new APIFeatures instance
    const features = new APIFeatures(Blog.find(), queryP).filter();

    // Execute the query
    const blogs = await features.query;

    // Send response
    res.status(200).json({
      status: "success",
      results: blogs.length,
      data: {
        blogs,
      },
    });
  } catch (err) {
    // Handle errors
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Get a blog by ID
exports.getBlogById = async (req, res) => {
  console.log("Request Params: ", req.params);
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

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        blog: newBlog,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Update a blog by ID
exports.updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({
        status: "fail",
        message: "Blog not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        blog: updatedBlog,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Delete a blog by ID
exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return res.status(404).json({
        status: "fail",
        message: "Blog not found",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

//find one and delete
