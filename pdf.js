const puppeteer = require('puppeteer');

const pdf = async (req) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    //await page.setContent(req.body.html); // Assuming HTML is sent in the request body
    await page.goto(req.body.url, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4', margin: {
        top: '20mm',
        bottom: '20mm'
        } });
    await browser.close();
    return pdfBuffer;
}



module.exports = pdf;
