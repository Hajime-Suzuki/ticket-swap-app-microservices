import subprocess

create_queue = 'aws --endpoint-url=http://localhost:4576 sqs create-queue --queue-name my_queue'.split(
    ' ')

create_topic = 'aws --endpoint-url=http://localhost:4575 sns create-topic --name my_topic'.split(
    ' ')


create_subscription = 'aws --endpoint-url=http://localhost:4575 sns subscribe --topic-arn arn:aws:sns:eu-central-1:000000000000:my_topic --protocol sqs --notification-endpoint arn:aws:sqs:eu-central-1:123456789012:my_queue'.split(
    ' ')

commands = [create_queue, create_topic, create_subscription]

for command in commands:
    p = subprocess.Popen(command)
    p.communicate()

print('Done!')
