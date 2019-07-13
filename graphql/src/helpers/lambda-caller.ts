import { Lambda } from 'aws-sdk'

export class LambdaCaller {
  lambda: Lambda
  functionName: string

  constructor(port: string, functionName: string) {
    this.lambda = new Lambda({
      apiVersion: '2015-03-31',
      endpoint: process.env.IS_OFFLINE ? 'http://localhost:' + port : undefined
    })
    this.functionName = functionName
  }

  async invoke<TRes = any>(actionName: string, data: any) {
    const params = {
      FunctionName: this.functionName,
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify({
        body: {
          action: actionName,
          data
        }
      })
    }
    console.log('will invoke lambda: ', params)
    const res = await this.lambda.invoke(params).promise()
    console.log('invoked lambda: ', res)
    if (res.StatusCode !== 200) throw new Error(`lambda function ${this.functionName}.${actionName} failed`)
    return JSON.parse(JSON.parse(res.Payload.toString()).body) as TRes
  }
}