import { Logger } from './logger'

export class ResponseHandler {
  logger: Logger
  constructor(logger: Logger) {
    this.logger = logger
  }
  success<TData = any>(res: TData) {
    return {
      statusCode: 200,
      body: JSON.stringify(res)
    }
  }
  error(error: any) {
    this.logger.error(error)

    if (error.name === 'ItemNotFoundException') {
      const tableNameArray = error.itemSought.TableName.split('-')
      const tableName = tableNameArray[tableNameArray.length - 1]
      return {
        statusCode: 500,
        body: `Not found: ${tableName}`
      }
    }

    return {
      statusCode: error.status || 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}
