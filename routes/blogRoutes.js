const express = require("express");
const BlogController = require("../controllers/blogController");

const router = express.Router();

// Define routes
router.get("/", BlogController.getAllBlogs);
router.get("/:id", BlogController.getBlogById);

module.exports = router;
