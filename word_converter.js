

const word_converter = async (pdfBuffer) => {
    const form = new FormData();
    form.append('file', pdfBuffer, 'document.pdf');

    const response = await fetch('https://pdftowordconverter-2e5f6a875985.herokuapp.com/convert-pdf-to-word', {
        method: 'POST',
        body: form
    });
    return response.buffer();
}
module.exports = word_converter;
