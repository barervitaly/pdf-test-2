require('dotenv').config();
/* external dependencies*/
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');

let browser;

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
// Increase the limit for JSON payloads
app.use(bodyParser.json({ limit: '5mb' })); // Adjust the limit as needed
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* server modules */
const pdf = require('./pdf');
// const convertPdfToWord = require('./word_converter');
// const mailer = require('./mailer');

// If you're also accepting URL-encoded payloads, increase their limit too
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

// app.listen(port, () => {
//     console.log(`listening the port :${port}`);
// });

const startServer = async () => {
    try {
        browser = await puppeteer.launch({
            headless: 'new', // Use the new headless mode
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        console.log('Puppeteer browser launched');

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Error launching Puppeteer:', error);
        process.exit(1); // Exit the process with an error code
    }
};

app.get('/', (req, res) => {
    res.send('Tzomet PDF Generation Service');
});

app.post('/generate-pdf', async (req, res) => {
    if (!req.body.html) {
        console.error('HTML parameter is missing' );
        return res.status(500).send('HTML parameter is required');
    }
    try {
        const response = await pdf(req, browser);
        res.contentType('application/pdf');
        res.send(response);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while generating the PDF');
    }
});

startServer().catch(error => {
    console.error('Error starting server:', error);
    process.exit(1);
});

// app.post('/generate-pdf-word', async (req, res) => {
//     // Validate that the HTML parameter is present
//     if (!req.body.html) {
//         console.error('HTML parameter is missing');
//         return res.status(500).send('HTML parameter is required');
//     }
//
//     try {
//         const pdfBuffer = await pdf(req);
//         console.log("PDF generation successful");
//
//         // Convert PDF to Word and get the response containing both files
//         const conversionResponse = await convertPdfToWord(pdfBuffer);
//
//         const wordBase64 = conversionResponse.wordBuffer.toString('base64');
//         const originalPdfBase64 = conversionResponse.pdfBuffer.toString('base64');
//
//         res.json({
//             pdf: originalPdfBase64,
//             word: wordBase64
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).send('An error occurred during conversion');
//     }
// });


/*
git push heroku master
git commit -am "add body-parser"
heroku logs --tail

 */
