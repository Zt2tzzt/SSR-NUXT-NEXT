const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { VueLoaderPlugin } = require('vue-loader/dist/index')

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './src/server/index.js', // 相对于项目运行的目录。
  output: {
    filename: 'server_bundle.js',
    path: path.resolve(__dirname, '../build/server')
  },
  resolve: {
    extensions: [".js", ".json", ".wasm", ".jsx", ".vue"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [new VueLoaderPlugin()],
  externals: [nodeExternals()]
}
