import subprocess

user_event_topic_name = 'ticket-swap-user-events'
ticket_event_topic_name = 'ticket-swap-ticket-events'


ticket_user_queue_name = 'ticket-swap-tickets-user-events-queue'
user_ticket_queue_name = 'ticket-swap-users-ticket-events-queue'

create_user_events_topic = f'aws --endpoint-url=http://localhost:4575 sns create-topic --name {user_event_topic_name}'.split(
    ' ')
create_ticket_events_topic = f'aws --endpoint-url=http://localhost:4575 sns create-topic --name {ticket_event_topic_name}'.split(
    ' ')

create_ticket_user_queue = f'aws --endpoint-url=http://localhost:4576 sqs create-queue --queue-name {ticket_user_queue_name}'.split(
    ' ')
create_user_ticket_queue = f'aws --endpoint-url=http://localhost:4576 sqs create-queue --queue-name {user_ticket_queue_name}'.split(
    ' ')


ticket_user_events_subscription = f'aws --endpoint-url=http://localhost:4575 sns subscribe --topic-arn arn:aws:sns:eu-central-1:000000000000:{user_event_topic_name} --protocol sqs --notification-endpoint arn:aws:sqs:eu-central-1:123456789012:{ticket_user_queue_name}'.split(
    ' ')
user_ticket_events_subscription = f'aws --endpoint-url=http://localhost:4575 sns subscribe --topic-arn arn:aws:sns:eu-central-1:000000000000:{ticket_event_topic_name} --protocol sqs --notification-endpoint arn:aws:sqs:eu-central-1:123456789012:{user_ticket_queue_name}'.split(
    ' ')

commands = [
    create_user_events_topic, create_ticket_user_queue,    ticket_user_events_subscription,
    create_ticket_events_topic, create_user_ticket_queue, user_ticket_events_subscription
]

for command in commands:
    p = subprocess.Popen(command)
    p.communicate()

print('Done!')


# aws --endpoint-url=http://localhost:4575 sns list-topics
# aws --endpoint-url=http://localhost:4576 sqs list-queues
# aws --endpoint-url=http://localhost:4576 sqs send-message --queue-url http://localhost:4576/queue/ticket-swap-users-ticket-events --message-body '{"test":"asht"}'
# aws --endpoint-url=http://localhost:4576 sqs receive-message --queue-url http://localhost:4576/queue/ticket-swap-users-ticket-events

#  {
#    endpoint: 'http://localhost:4575',
#    arn: 'arn:aws:sns:eu-central-1:000000000000:ticket-swap-user-events'
#  }
