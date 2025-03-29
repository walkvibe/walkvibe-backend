const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email Sending Route (Merged from emailRoutes.js)
app.post("/api/send-email", async (req, res) => {
    const { company, address1, address2, phone, email, duration, adCreation, total } = req.body;

    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.TO_EMAIL,
            subject: `New Booking Received - ${new Date().toISOString()}`, // Unique subject
            html: `
                <h2>New Booking Details</h2>
                <p><strong>Company Name:</strong> ${company}</p>
                <p><strong>Address Line 1:</strong> ${address1}</p>
                <p><strong>Address Line 2:</strong> ${address2}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Duration:</strong> ${duration}</p>
                <p><strong>Ad Creation:</strong> ${adCreation}</p>
                <p><strong>Total Amount:</strong> ₹${total}</p>
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully!" });

    } catch (error) {
        console.error("EMAIL ERROR:", error);
        res.status(500).json({ message: "Error sending email", error });
    }
});

// Root Route
app.get("/", (req, res) => {
    res.send("WalkVibe Backend is Running!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
