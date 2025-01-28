## Getting Started

### Set these variables in AWS Amplify frontend dashboard

- AMPLIFY_USERPOOL_ID
- AMPLIFY_WEBCLIENT_ID
- AMPLIFY_NATIVECLIENT_ID

### Update APPLICANT_WEB_CLIENT_ID in lambda CognitoPostConfirmation - AddUserToGroup

### Import models from database

npx sequelize-auto -p 5432 -h localhost -d avancy -u avancy -e postgres -x avancy --caseModel=p -o ./db/models/ --singularize --additional ./db/additional-attrs.json
npx sequelize-auto -p $DB_PORT -h $DB_HOST -d $DB_NAME -u $DB_USER -x $DB_PASS -e postgres --caseModel=p -o ./db/models/ --singularize --additional ./db/additional-attrs.json

### Remove and reinstall auth

amplify remove auth
amplify import auth
