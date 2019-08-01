const path = require('path')
const slsw = require('serverless-webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  // devtool: 'source-map',
  resolve: {
    mainFields: ['main', 'module'], // https://github.com/graphql/graphql-js/issues/1272
    extensions: ['.mjs', '.js', '.json', '.graphql', '.gql', '.ts']
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: { transpileOnly: true }
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: true
    })
  ]
}
