const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendNewChatEmail(username) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER, // Default to sender if admin email not set
    subject: 'New Chat Request',
    text: `A new chat has been started by user: ${username}.`,
  });
}

module.exports = { sendNewChatEmail };