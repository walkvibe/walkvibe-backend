const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const emailRoute = require("./routes/emailRoute");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", emailRoute);

// ✅ Fix for "Cannot GET /"
app.get("/", (req, res) => {
    res.send("WalkVibe Backend is Running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

