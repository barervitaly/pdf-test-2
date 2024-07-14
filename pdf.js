// const puppeteer = require('puppeteer');
//
// const pdf = async (req) => {
//     const browser = await puppeteer.launch({
//         headless: true,
//         args: ['--no-sandbox', '--disable-setuid-sandbox']
//     });
//     const page = await browser.newPage();
//     await page.setContent(req.body.html); // Assuming HTML is sent in the request body
//     // await page.goto(req.body.url, { waitUntil: 'networkidle0' });
//
//     // Wait for 2 seconds to allow animations to finish
//     await page.waitForTimeout(2000);
//
//     const pdfBuffer = await page.pdf({
//         format: 'A4',
//         printBackground: true,
//         displayHeaderFooter: false,
//         preferCSSPageSize: false,
//         margin: {
//             top: '0',
//             right: '0',
//             bottom: '0',
//             left: '0'
//         }
//     });
//     await browser.close();
//     return pdfBuffer;
// }
//
//
// module.exports = pdf;

const puppeteer = require('puppeteer');

const pdf = async (req) => {
    try {
        console.log('Launching browser...');
        const browser = await puppeteer.launch({
            headless: 'new', // Use the new headless mode
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        console.log('Opening new page...');
        const page = await browser.newPage();

        console.log('Setting page content...');
        await page.setContent(req.body.html);

        console.log('Waiting for animations to finish...');
        await page.waitForTimeout(2000);

        console.log('Generating PDF...');
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            displayHeaderFooter: false,
            preferCSSPageSize: false,
            margin: {
                top: '0',
                right: '0',
                bottom: '0',
                left: '0'
            }
        });

        console.log('Closing browser...');
        await browser.close();

        console.log('PDF generation complete');
        return pdfBuffer;
    } catch (error) {
        console.error('Error in pdf function:', error);
        throw new Error('Failed to generate PDF');
    }
};

module.exports = pdf;

