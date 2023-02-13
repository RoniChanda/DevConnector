const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

// connect mongoDB
connectDB();

// Initialise middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res, next) => {
  res.send("API running!");
});

// Define CORS
app.use(cors());

// Define routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/users", require("./routes/api/users"));

// connect backend server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
