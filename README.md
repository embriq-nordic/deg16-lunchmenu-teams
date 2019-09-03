This script fetches the lunch menu from deg16.no/kjokkenet and publish it to a channel in Teams.

1. Install nodejs and git
2. Clone this repo to `/srv` 
3. Add this to CRONTAB

crontab

    sudo su
    crontab -e
    00 10 * * 1-5 /usr/local/bin/node /srv/deg16-lunchmenu-teams/index.js