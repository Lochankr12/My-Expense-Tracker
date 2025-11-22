const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,          // use STARTTLS on 587
  secure: false,      // false for 587, true is for 465
  auth: {
    user: process.env.GMAIL_USER, // your Gmail
    pass: process.env.GMAIL_PASS, // Gmail APP password
  },
  // Optional but can help with timeouts
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

const sendEmail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Reset email sent to:', to);
  } catch (err) {
    console.error('Reset email error:', err);
    throw err; // let your controller send 500 to frontend
  }
};

module.exports = sendEmail;
