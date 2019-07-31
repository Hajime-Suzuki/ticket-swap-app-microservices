import { Lambda } from 'aws-sdk'
import { isOffline } from '@ticket-swap-app/shared/src/constants'
import { logger } from '../utils'

export class LambdaCaller {
  lambda: Lambda
  functionName: string

  constructor(port: string | number, functionName: string) {
    this.lambda = new Lambda({
      apiVersion: '2015-03-31',
      endpoint: isOffline() ? 'http://localhost:' + port : undefined
    })
    this.functionName = functionName
  }

  async invoke<TRes = any>(actionName: string, data: any) {
    const body = {
      action: actionName,
      data
    }
    const params = {
      FunctionName: this.functionName,
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify({ body })
    }

    logger.log('will invoke lambda', { ...params, Payload: body })
    const res = await this.lambda.invoke(params).promise()
    console.log(res)
    const response = JSON.parse(res.Payload.toString())
    logger.log('invoked lambda', response)
    if (response.statusCode !== 200)
      throw new Error(
        `lambda function ${this.functionName}.${actionName} failed`
      )
    return JSON.parse(response.body) as TRes
  }
}
