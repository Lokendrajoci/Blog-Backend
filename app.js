const express = require("express");
const dotenv = require("dotenv");

// Initialize app
dotenv.config({ path: "./config.env" });
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import routes
const blogRoutes = require("./routes/blogRoutes");

// Mount routes
app.use("/api/v1/blogs", blogRoutes);

module.exports = app;
