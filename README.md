This script fetches the lunch menu from deg16.no and publish it to a channel in Teams.

1. Install nodejs and git
2. Clone this repo to `/srv`
3. Run `npm install`
4. Add a file called `.env` and add your Teams Inomming Webhook URL to the variable TEAMS_URL
5. Add this to CRONTAB

crontab

    sudo su
    crontab -e
    00 10 * * 1-5 /usr/local/bin/node /srv/deg16-lunchmenu-teams/index.js