const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

router.post("/send-email", async (req, res) => {
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
            subject: "New Booking Received",
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
        console.error(error);
        res.status(500).json({ message: "Error sending email", error });
    }
});

module.exports = router;
