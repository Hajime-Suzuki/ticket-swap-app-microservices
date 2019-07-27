export const handleResponse = {
  success(res: any) {
    return {
      statusCode: 200,
      body: JSON.stringify(res)
    }
  },
  error(error: any) {
    console.log(error)
    if (!error.name) {
      return {
        statusCode: 500,
        body: error.message
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
