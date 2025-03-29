const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const emailRoute = require("./routes/emailRoute"); // ✅ Import correctly

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/api", emailRoute); // ✅ Make sure it's a valid middleware function

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
