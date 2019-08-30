const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devMode = process.env.NODE_ENV !== 'production'
const SRC_DIR = path.join(__dirname, 'src')
const DIST_DIR = path.join(__dirname, 'dist')

module.exports = {
  entry: [
    path.join(SRC_DIR, 'index.js'),
  ],
  output: {
    path: DIST_DIR,
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        loaders: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        loaders: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[local]__[hash:base64:5]',
                context: path.join(__dirname, 'src'),
              },
              sourceMap: true,
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
          options: { minimize: true },
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(SRC_DIR, 'index.html'),
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
  ],
  devServer: {
    contentBase: DIST_DIR,
    hot: true,
    port: 3000,
  },
}
