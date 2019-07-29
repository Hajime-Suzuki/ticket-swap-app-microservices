require('ts-node').register({ module: 'commonjs' })

module.exports.env = () => {
  const { shared } = require('../config/src/global-config.ts')
  const output = {
    ...shared
  }
  return output
}

module.exports.SQS = () => {
  const { SQS } = require('../config/src/sns-sqs-config.ts')
  return {
    ...SQS
  }
}
