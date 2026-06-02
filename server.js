const express = require("express");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // The 16-character App Password
    },
    tls: {
        rejectUnauthorized: false,
    },
});
app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname, 'public/index.html'));
 });
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(''));

// app.get('/public/styles.css', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/styles.css')); 
// });
// app.get('/public/img/Profile_pic.jpg', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/img/Profile_pic.jpg'));
// });

app.post("/send-email", async (req, res) => {   
    const { name, email, message } = req.body;

    try {
        const info = transporter.sendMail({
            from: process.env.EMAIL_USER, // sender address
            to: process.env.EMAIL_USER, // list of recipients
            subject: "Contact Form Submission", // subject line
            html: ` From : ${name}  (${email}) <br/>Enquiry : ${message}`, // HTML body
        });
        res.status(200).json({
            success: true,
            message: "Email sent successfully!",
        });
    } catch (err) {
        console.error("Error while sending mail:", err);
        res.status(500).json({
            success: false,
            message: "Failed to send email",
        });
    }
});

app.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
});
