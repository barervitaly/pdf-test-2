const fetch = require('node-fetch');
const FormData = require('form-data');

/*
const word_converter = async (pdfBuffer) => {
    const form = new FormData();
    form.append('file', pdfBuffer, 'document.pdf');
    console.log("start to convert");

    const response = await fetch('https://pdftowordconverter-2e5f6a875985.herokuapp.com/convert-pdf-to-word', {
        method: 'POST',
        body: form
    });

    const jsonResponse = await response.json();

    // Assuming the JSON object has the structure: { word: '...', pdf: '...' }
    // where 'word' and 'pdf' are Base64-encoded strings
    const wordBase64 = jsonResponse.word;
    const pdfBase64 = jsonResponse.pdf;

    // Convert Base64 back to binary if needed
    const wordBuffer = Buffer.from(wordBase64, 'base64');
    const originalPdfBuffer = Buffer.from(pdfBase64, 'base64');

    // Return an object containing both buffers
    return {
        wordBuffer: wordBuffer,
        originalPdfBuffer: originalPdfBuffer
    };
};
*/
const word_converter = async (htmlContent) => {
    // const form = new FormData();
    // form.append('html', htmlContent);

    const payload = {
        html: htmlContent,
        returndoc: false
    };

    const response = await fetch('https://pdftowordconverter-2e5f6a875985.herokuapp.com/convert-html', {
        method: 'POST',
        body: payload
    });

    const jsonResponse = await response.json();

    // Extract Base64-encoded strings
    const wordBase64 = jsonResponse.word;
    const pdfBase64 = jsonResponse.pdf;

    // Convert Base64 back to binary
    const wordBuffer = Buffer.from(wordBase64, 'base64');
    const pdfBuffer = Buffer.from(pdfBase64, 'base64');

    return {
        wordBuffer: wordBuffer,
        pdfBuffer: pdfBuffer
    };
};

module.exports = word_converter;
