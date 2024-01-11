const express = require('express');
const cors = require('cors');



const app = express();
const port = process.env.PORT || 3000;

const pdf = require('./pdf');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`listening the port :${port}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to HTML to PDF Service!');
});

app.post('/generate-pdf', async (req, res) => {
    const response = await pdf();
    res.contentType('application/pdf');
    res.send(response);
});

