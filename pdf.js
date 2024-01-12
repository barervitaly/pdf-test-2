const puppeteer = require('puppeteer');

const pdf = async (req) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(req.body.html); // Assuming HTML is sent in the request body
    console.log("req.body.html");
    // Take a screenshot
    await page.screenshot({ path: 'screenshot.png' });
    await page.waitForTimeout(5000);
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();
    return pdfBuffer;
}



module.exports = pdf;
