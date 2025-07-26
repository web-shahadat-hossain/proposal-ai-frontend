const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Your frontend URL
      "https://proposal-ai-backend.onrender.com",
      "proposal-ai-backend.onrender.com", // Example frontend on Render
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/proposals", require("./routes/proposalRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
