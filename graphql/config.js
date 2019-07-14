const { shared } = require('../shared-config')
module.exports.env = () => {
  const output = { ...shared() }
  console.log('env: ', output)

  return output
}
