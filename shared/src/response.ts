import { Logger } from './logger'

export class ResponseHandler {
  logger: Logger
  constructor(logger: Logger) {
    this.logger = logger
  }
  success(res: any) {
    return {
      statusCode: 200,
      body: JSON.stringify(res)
    }
  }
  error(error: any) {
    if (error.name === 'Error') {
      this.logger.error(error)
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message })
      }
    }
    if (error.name === 'ItemNotFoundException') {
      const tableNameArray = error.itemSought.TableName.split('-')
      const tableName = tableNameArray[tableNameArray.length - 1]
      return {
        statusCode: 500,
        body: `Not found: ${tableName}`
      }
    }
  }
}
