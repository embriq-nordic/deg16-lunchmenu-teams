const axios = require('axios');
const cheerio = require('cheerio');
const dateFormat = require('dateformat');
require('dotenv').config();

const websiteUrl = 'https://braatheneiendom.no/eiendommer-5190/dronning-eufemias-gate-16/praktisk-informasjon';
const today = new Date().getDay();
const weekdays = [ "SØNDAG", "MANDAG", "TIRSDAG", "ONSDAG", "TORSDAG", "FREDAG", "LØRDAG" ];

axios.get(websiteUrl)
    .then(resp => {

        const $ = cheerio.load(resp.data);
        const menu = $('.blocktext .abstract').text().trim().split('\n');
        
        // Chop off everything before today's entries
        menu.splice(0, menu.indexOf(weekdays[today]));
        
        // If its friday (and since its no saturday)
        // we need to chop off the rest of the menu based on another criteria
        if (today == 5) {
            menu.splice(menu.indexOf('BESTILLING AV MAT TIL MØTER'));
        } else {
            menu.splice(menu.indexOf(weekdays[today+1]));
        }
        
        let title = menu.splice(0, 1)[0].trim() + " ";
        title += dateFormat(new Date(), 'dd mmm yyyy').toUpperCase();
        
        let text;
        text = title + "\n\n";
        text += "---\n\n";
        text += menu.join("\n\n");

        axios.post(process.env.TEAMS_URL, { text })
            .then(resp => {
                if (resp.status !== 200) {
                    console.log(resp.statusText);
                } 
            })
            .catch(err => console.log("ERROR:" + err));

    })
    .catch(err => console.log(err));