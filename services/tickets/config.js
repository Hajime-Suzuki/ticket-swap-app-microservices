require('ts-node').register({ module: 'commonjs' })
require('tsconfig-paths').register()

module.exports.env = () => {
  const { shared } = require('../../config/src/global-config.ts')
  const { tableNames } = require('../../config/src/tickets-config.ts')
  const output = {
    ...shared,
    ...tableNames
  }
  return output
}
