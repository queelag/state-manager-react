const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const ReactRefreshTypescript = require('react-refresh-typescript')

const MODE = process.env.NODE_ENV || 'development'

const isDevelopment = MODE === 'development'
const isProduction = MODE === 'production'

module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: true
  },
  devtool: false,
  entry: './docs/src/index.tsx',
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: () => ({
                before: [isDevelopment && ReactRefreshTypescript()].filter(Boolean)
              }),
              transpileOnly: isDevelopment
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: '[name].[fullhash].js',
    path: path.resolve(__dirname, './'),
    publicPath: isProduction ? './' : undefined
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './docs/public/index.html'
    }),
    isDevelopment && new ReactRefreshWebpackPlugin()
  ].filter(Boolean),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
}
