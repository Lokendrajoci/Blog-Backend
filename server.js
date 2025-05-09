const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

//error is not caught by any try-catch block.
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  process.exit(1);
});
dotenv.config({ path: "./config.env" });

//connection string
// const DB = process.env.DATABASE.replace(
//   "<db_password>",
//   process.env.DATABASE_PASSWORD
const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

//connecting to the database
mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => {
    console.error("DB connection failed:", err.message);
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

//handling unhandled promise rejections
// rejection is not handled using .catch() or a try-catch block.
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
