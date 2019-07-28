import subprocess


def main():
    user_event_topic = 'ticket-swap-user-events'
    ticket_event_topic = 'ticket-swap-ticket-events'
    event_event_topic = 'ticket-swap-event-events'

    ticket_user_queue = 'ticket-swap-tickets-user-events-queue'
    ticket_event_queue = 'ticket-swap-tickets-event-events-queue'
    user_ticket_queue = 'ticket-swap-users-ticket-events-queue'
    user_event_queue = 'ticket-swap-users-event-events-queue'
    event_user_queue = 'ticket-swap-events-user-events-queue'
    event_ticket_queue = 'ticket-swap-events-ticket-events-queue'

    for topic in [user_event_topic, ticket_event_topic, event_event_topic]:
        create_topic(topic)

    for queue in [
        ticket_user_queue,
        ticket_event_queue,
        user_ticket_queue,
        user_event_queue,
        event_user_queue,
        event_ticket_queue
    ]:
        create_queue(queue)

    for (topic, queues) in [
        (user_event_topic, [ticket_user_queue, event_user_queue]), (ticket_event_topic, [
            user_ticket_queue, event_ticket_queue]),
            (event_event_topic, [ticket_event_queue, user_event_queue])]:
        for queue in queues:
            subscribe(topic, queue)


def run_command(command):
    p = subprocess.Popen(command)
    p.communicate()


def create_topic(topic_name):
    topic_command = f'aws --endpoint-url=http://localhost:4575 sns create-topic --name {topic_name}'.split(
        ' ')
    run_command(topic_command)


def create_queue(queue_name):
    queue_commnad = f'aws --endpoint-url=http://localhost:4576 sqs create-queue --queue-name {queue_name}'.split(
        ' ')
    run_command(queue_commnad)


def subscribe(topic_name, queue_name):
    subscribe_command = f'aws --endpoint-url=http://localhost:4575 sns subscribe --topic-arn arn:aws:sns:eu-central-1:000000000000:{topic_name} --protocol sqs --notification-endpoint arn:aws:sqs:eu-central-1:123456789012:{queue_name}'.split(
        ' ')
    run_command(subscribe_command)


if __name__ == "__main__":
    main()
    print('Done!')


# aws --endpoint-url=http://localhost:4575 sns list-topics
# aws --endpoint-url=http://localhost:4576 sqs list-queues
# aws --endpoint-url=http://localhost:4576 sqs send-message --queue-url http://localhost:4576/queue/ticket-swap-users-ticket-events --message-body '{"test":"asht"}'
# aws --endpoint-url=http://localhost:4576 sqs receive-message --queue-url http://localhost:4576/queue/ticket-swap-users-ticket-events
