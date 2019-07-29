For communication between services, I used SNS => SQS => Lambda setup.
But if SQS is trigger for Lambda, the Lambda calls SQS once in every 20 seconds, which ends up huge number of SQS requests and you're charged for it. Though it's not big amount, taking it into account that this is my personal project, I would like to avoid it. In stead, I will use only SNS for Lambda trigger, and set up dead letter queue for failure.

In this setup, I use local stack (SNS + SQS) for local development.
