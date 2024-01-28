const puppeteer = require('puppeteer');

const pdf = async (req) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(req.body.html); // Assuming HTML is sent in the request body
    // await page.goto(req.body.url, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4', margin: {
        top: '20mm',
        bottom: '20mm'
        },
        printBackground: true,
        footerTemplate: '<span style="font-size: 10px; width: 100%; text-align: center;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>',
        displayHeaderFooter: true,
        preferCSSPageSize: false
    });
    await browser.close();
    return pdfBuffer;
}

module.exports = pdf;
