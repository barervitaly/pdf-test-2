require('dotenv').config();
/* external dependencies*/
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');




const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* server modules */
const pdf = require('./pdf');
const convertPdfToWord = require('./word_converter');
const mailer = require('./mailer');


// Increase the limit for JSON payloads
app.use(bodyParser.json({ limit: '5mb' })); // Adjust the limit as needed

// If you're also accepting URL-encoded payloads, increase their limit too
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.listen(port, () => {
    console.log(`listening the port :${port}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to HTML to PDF Service!');
});

app.post('/generate-pdf', async (req, res) => {
    const response = await pdf(req);
    res.contentType('application/pdf');
    res.send(response);
});

app.post('/generate-pdf-word', async (req, res) => {
    try {
        const pdfBuffer = await pdf(req);
        const wordBuffer = await convertPdfToWord(pdfBuffer);

        res.json({
            pdf: pdfBuffer.toString('base64'),
            word: wordBuffer.toString('base64')
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
    }
});

/*
git push heroku master
git commit -am "add body-parser"
heroku logs --tail

 */
