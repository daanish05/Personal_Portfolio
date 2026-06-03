// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const nodemailer = require("nodemailer");
// require("dotenv").config();
// const app = express();

// app.use(cors());
// app.use(express.json());
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER, // Your Gmail address
//         pass: process.env.EMAIL_PASS, // The 16-character App Password
//     },
//     tls: {
//         rejectUnauthorized: false,
//     },
// });
// app.get('/', (req, res) => {
//      res.sendFile(path.join(__dirname, 'public/index.html'));
//  });
// app.use(express.static(path.join(__dirname, 'public')));
// // app.use(express.static(''));

// // app.get('/public/styles.css', (req, res) => {
// //     res.sendFile(path.join(__dirname, '../public/styles.css')); 
// // });
// // app.get('/public/img/Profile_pic.jpg', (req, res) => {
// //     res.sendFile(path.join(__dirname, '../public/img/Profile_pic.jpg'));
// // });

// app.post("/send-email", async (req, res) => {   
//     const { name, email, message } = req.body;

//     try {
//         const info = transporter.sendMail({
//             from: process.env.EMAIL_USER, // sender address
//             to: process.env.EMAIL_USER, // list of recipients
//             subject: "Contact Form Submission", // subject line
//             html: ` From : ${name}  (${email}) <br/>Enquiry : ${message}`, // HTML body
//         });
//         res.status(200).json({
//             success: true,
//             message: "Email sent successfully!",
//         });
//     } catch (err) {
//         console.error("Error while sending mail:", err);
//         res.status(500).json({
//             success: false,
//             message: "Failed to send email",
//         });
//     }
// });

// app.listen(5000, () => {
//     console.log("Server running at http://localhost:5000");
// });


const express = require("express");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "Contact Form Submission",
            html: `
                <h3>New Contact Form Submission</h3>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Message:</b> ${message}</p>
            `,
        });

        res.status(200).json({
            success: true,
            message: "Email sent successfully!",
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Failed to send email",
        });
    }
});

module.exports = app;

if (process.env.NODE_ENV !== "production") {
    app.listen(5000, () => {
        console.log("Server running on http://localhost:5000");
    });
}