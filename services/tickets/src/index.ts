import { APIGatewayProxyHandler } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async event => {
  // const evt = (event as any) as SNSEvent
  // console.log('Body: ', JSON.stringify(event, null, 2))

  // console.log('Event Triggered: ', JSON.parse(evt.Records[0].Sns.Message))

  return {
    statusCode: 200,
    body: JSON.stringify({
      message:
        'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event
    })
  }
}
