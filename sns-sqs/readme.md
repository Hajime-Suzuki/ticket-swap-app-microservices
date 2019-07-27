## users

#### user signup

- message to ticket (done)
- message to event

## tickets

#### ticket created

- message to user (done)

#### ticket updated

- message to event

## SNS => SQS Subscriptions

#### tickets topic

- users (done)
- events (done)

#### users topic

- events
- tickets (done)

#### events topic

- users
- tickets
