const express = require("express");
const BlogController = require("../controllers/blogController");

const router = express.Router();

// Define routes
router.get("/", BlogController.getAllBlogs);
router.get("/:id", BlogController.getBlogById);

router.post("/", BlogController.createBlog);
router.patch("/:id", BlogController.updateBlog);

router.delete("/:id", BlogController.deleteBlog);

module.exports = router;
