const request = require('request');
const cheerio = require('cheerio');
require('dotenv').config();

const websiteUrl = 'http://www.braatheneiendom.no/NO/Eiendommer/DEG16/Kjokkenet/';

request(websiteUrl, function (err, resp, html) {
    if (err && resp.statusCode != 200) {
        console.error(error);
        process.exit(1);
    }

    const today = new Date().getDay() - 1;
    const $ = cheerio.load(html);

    let message;
    let options;

    const lines = $('.caption-body').eq(today).text().split("\n").filter(elm => elm != "").map(elm => elm.trim());
    message = "##" + lines[1].toUpperCase() + "\n\n";
    message += "--- \n\n";
    for (let j = 2; j < lines.length; j++) {
        message += lines[j] + "\n\n";
    }

    options = {
        url: process.env.TEAMS_URL,
        method: 'POST',
        json: {
            "text": message
        }
    };

    request(options, function (err, resp, body) {
        if (err) return console.log(error);
    });
});



