const imaps = require('imap-simple');
const dotenv = require('dotenv');
const cheerio = require('cheerio');

dotenv.config();

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchOtpFromEmail() {
    const config = {
        imap: {
            user: 'errahul.rp@gmail.com',
            password: 'qbnm dvxk kjwk rvrx',
            host: 'imap.gmail.com',
            port: 993,
            tls: true,
            tlsOptions: {
                rejectUnauthorized: false
            },
            authTimeout: 3000,
        }
    };

    const connection = await imaps.connect(config);
    await connection.openBox('INBOX');

    const searchCriteria = ['UNSEEN', ['FROM', 'info@bezt.in']];
    const fetchOptions = { bodies: ['TEXT'], markSeen: true };

    const maxAttempts = 25;
    const waitTime = 10000;
    let attempts = 0;

    while (attempts < maxAttempts) {
        console.log(`Attempt ${attempts + 1}: Searching for OTP emails from info@bezt.in...`);
        const messages = await connection.search(searchCriteria, fetchOptions);

        if (messages.length === 0) {
            console.log('No new messages found. Waiting for 10 seconds...');
        }

        for (const item of messages) {
            const emailContent = item.parts[0].body; 
            const $ = cheerio.load(emailContent);

            const combinedContent = $.html();

            const otpMatch = combinedContent.match(/\b\d{4}\b/); 

            if (otpMatch) {
                const extractedOtp = otpMatch[0];
                await connection.end();
                return extractedOtp;
            }
        }

        attempts++;
        await delay(waitTime);
    }

    await connection.end();
    throw new Error('OTP email not found within the given time frame');
}

module.exports = { fetchOtpFromEmail };
