## ticket swap app

### this is a project for my learning. Try to clone the basic functionalities of ticket swap. (in progress)

- Fully serverless
- Monorepo: In order to share code.
- GraphQL: Apollo + Lambda. I don't use AppSync this time. I wouldn't like to write business logic in mapping templates.
- DynamoDB: This is for the sake of price. I don't want to pay for the idle time for DB.
- SNS: Trigger Lambda functions when certain event happens.
- Authentication: Authentication is handled by Cognito + Amplify in frontend. Backend takes only care of validation of tokens.

Communication between services is done by SNS + Lambda. Initially I use SNS + SQS => Lambda, but since Lambda functions poll SQS every 20 seconds or so, the amount of SQS requests got too big... So I decided to use SNS and add dead letter queues to Lambda in case of multiple failures.

### set up

create config/src/.secrets.ts file and set

```
export const secrets = {
  AWS_ACCOUNT_ID: <Your AWS accountID>,
  AWS_COGNITO_USER_POOL_ID: <Your User Pool ID>, // first deploy users service then you will see that user pool id in AWS console.
  AWS_COGNITO_WEB_CLIENT_ID: <Your Cognito web client id>
}
```

#### run service

Before running service, make user serverless-offline-sns is running. Go to `sns` then run `yarn install` then run `yarn start`

- Go to services/_service name_.
- Run `yarn install`
- Install dynamodb local by `yarn sls dynamodb install`
- Run `yarn dev`

#### resource names

Lambda:

- ticket-swap-_SERVICE_NAME_-_FUNC_NAME_
- ticket-swap-_SERVICE_NAME_-event-listener-_TARGET_SERVICE_NAME_

DynamoDB:

- ticket-swap-_SERVICE_NAME_-_TABLE_NAME_

SNS:

- ticket-swap*SERVICE_NAME*-_SERVICE_NAME_-events

#### Frontend

in local environment,

- signup
- add the user in services/_service_/.seed/user.json
