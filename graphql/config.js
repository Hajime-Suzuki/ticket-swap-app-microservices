const { shared } = require('../shared-config')
const env = require('./.env')
module.exports.env = () => {
  const output = { ...shared(), ...env }
  console.log('env: ', output)

  return output
}
