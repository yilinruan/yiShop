const nodemailer = require('nodemailer');

const sendEmail = async options => {
    const transporter = nodemailer.createTransport({
        // host: process.env.SMTP_HOST,
        // port: process.env.SMTP_PORT,
        // auth: {
        //     user: process.env.SMTP_EMAIL,
        //     pass: process.env.SMTP_PASSWORD
        // }

        service: 'gmail',//smtp.gmail.com  //in place of service use host...
        secure: false,//true
        port: 25,//465
        auth: {
          user: 'allenruan97',
          pass: 'Tester433'
        }, tls: {
          rejectUnauthorized: false
        }

    });

    const message = {
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(message)
}

module.exports = sendEmail;