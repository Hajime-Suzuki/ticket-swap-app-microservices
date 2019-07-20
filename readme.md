- Monorepo: In order to share code.
- GraphQL: Apollo + Lambda. I don't use AppSync this time. I wouldn't like to write business logic in mapping templates.
- DynamoDB: This is for the sake of price. I don't want to pay for the idle time for DB.
- SNS: Trigger Lambda functions when certain event happens.
- Authentication: Authentication is handled by Cognito + Amplify in frontend. Backend takes only care of validation of tokens.

create config/src/.secrets.ts file and set

```
export const secrets = {
  AWS_ACCOUNT_ID: <Your AWS accountID>
  AWS_COGNITO_USER_POOL_ID: <Your User Pool ID> // first deploy users service then you will see that user pool id in AWS console.
}
```

#### resource names

Lambda:

- ticket-swap-_SERVICE_NAME_-_FUNC_NAME_
- ticket-swap-_SERVICE_NAME_-event-listener-_TARGET_SERVICE_NAME_

DynamoDB:

- ticket-swap-_SERVICE_NAME_-_TABLE_NAME_

---

Todo:

- Separate SNS and SQS resource creation from services.
