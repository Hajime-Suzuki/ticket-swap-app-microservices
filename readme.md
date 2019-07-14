- Monorepo: In order to share code.
- GraphQL: Apollo + Lambda. I don't use AppSync this time. I wouldn't like to write business logic in mapping templates.
- DynamoDB: This is for the sake of price. I don't want to pay for the idle time for DB.
- SNS: Trigger Lambda functions when certain event happens.

create .env.js file and

```
module.exports = {
  AWS_ACCOUNT_ID: <Your AWS accountID>
  AWS_COGNITO_USER_POOL_ID: <Your User Pool ID> // first deploy users service then you will see that user pool id in AWS console.
}
```
