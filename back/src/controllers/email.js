const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

const sendEmail = async (req, res) => {
    const {to, subject, html} = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        html: html
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).json(error)
            console.log(error);
        } else {
            res.status(200).json(info)
            console.log('Email envoyé : ' + info.response);
        }
    });

}

module.exports = {
    sendEmail
}