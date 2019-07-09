export const handleResponse = {
  success(res: any) {
    return {
      statusCode: 200,
      body: JSON.stringify(res)
    }
  },
  error(error: any) {
    console.log(error)
    return {
      statusCode: 500,
      body: error.message
    }
  }
}
