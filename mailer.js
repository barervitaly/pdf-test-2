const nodemailer = require('nodemailer');

const sendEmail = async (pdfBuffer, recipientEmail) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Example using Gmail; configure for your email provider
        auth: {
            user: process.env.EMAIL_USER, // Use environment variables
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: 'Generated PDF',
        text: 'Please find the attached PDF.',
        attachments: [
            {
                filename: 'generated.pdf',
                content: pdfBuffer
            }
        ]
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Rethrow the error for handling upstream
    }
};

module.exports = sendEmail;
