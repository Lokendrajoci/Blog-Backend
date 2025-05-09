const express = require("express");
const dotenv = require("dotenv");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
// Initialize app
dotenv.config({ path: "./config.env" });
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import routes
const blogRoutes = require("./routes/blogRoutes");

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  
  next();
});
// Mount routes
app.use("/api/v1/blogs", blogRoutes);






app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
