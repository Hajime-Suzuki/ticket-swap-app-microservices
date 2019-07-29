For communication between services, I used SNS => SQS => Lambda setup.
But if SQS is trigger for Lambda, the Lambda calls SQS once in every 20 seconds, which ends up huge number of SQS requests and you're charged for it. Though it's not big amount, taking it into account that this is my personal project, I would like to avoid it. In stead, I will use only SNS for Lambda trigger, and set up dead letter queue for failure.

In this setup, I use localstack (SNS + SQS) for local development.

### how to setup.

- use docker compose file to run localstack
- create SNS topic and SQS queue. I used setup.python for this.
- specify queue arn to functions.events in serverless.yml. Don't forget to add serverless-offline-sqs section in custom section. specify endpoint that is used by localstack in serevrless-offline-sqs.endpoint. you still need to specify port even though you don't use it.
- then run each service. a service gets an error if the queue(s) has not been created when it runs.
