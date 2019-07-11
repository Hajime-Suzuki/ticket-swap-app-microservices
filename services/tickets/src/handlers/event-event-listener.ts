import { SNSHandler, SQSEvent } from 'aws-lambda'

export const handler: SNSHandler = async event => {
  // console.log(((event as any) as SQSEvent).Records[0])
  // console.log(
  //   'message received: ',
  //   event.Records[0].Sns && event.Records[0].Sns.Message
  // )
  // return
}
