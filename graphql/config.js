require('ts-node').register({ module: 'commonjs' })
require('tsconfig-paths').register()

module.exports.env = () => {
  const { shared } = require('../config/src/global-config.ts')
  const output = {
    ...shared
  }
  return output
}
