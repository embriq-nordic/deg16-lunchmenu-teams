This script fetches the lunch menu from deg16.no and publish it to a channel in Teams.

This script has now moved to AWS Lambda.

## Installation instructions

```bash
git clone https://github.com/rejlersembriq/deg16-lunchmenu-teams.git
cd deg16-lunchmenu-teams

# Permissions are needed for AWS to be able to read and execute our modules
chmod -R 777 node_modules
chmod 777 index.js

zip -r function.zip .
```

### Setup AWS Lambda function
1. Create a new AWS Lambda function
2. Set runtime to be > nodejs8
3. In the "Code entry type", choose "Upload a .zip file"
4. Upload `function.zip` you created earlier
5. Hit "Save"
6. Make sure Handler is `index.handler`
7. Under "Environmental Variables" enter "TEAMS_URL" for name and then the URL to your Incomming Webhook

### Setup trigger via CloudWatch
4. Go to CloudWatch/Rules and "Create rule"
5. Event Source must be "Scehduled"
6. Choose "Cron expression" with this expression `0 10 ? * MON-FRI *`
5. Click "Add Target" and choose "Lambda function"
6. Select your AWS Lambda function
7. Click "Configure Details"

## Updating AWS Lambda function

For updating an already existing function you just have to zip your files again and upload using "Upload a .zip file".