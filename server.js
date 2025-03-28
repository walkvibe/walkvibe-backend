const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const emailRoute = require("./routes/emailRoute");

const app = express();

// Fix CORS issue
app.use(
  cors({
    origin: "*", // Allow all origins (change this to your frontend URL if needed)
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(bodyParser.json());
app.use("/api", emailRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
