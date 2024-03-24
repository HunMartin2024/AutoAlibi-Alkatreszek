const nodemailer = require('nodemailer');
const Mail = require('nodemailer/lib/mailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASS
    }
})
module.exports = {
    transporter
}
