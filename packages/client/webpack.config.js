const path = require('path')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const pkgInfo = require('../../package.json')

const devMode = process.env.NODE_ENV !== 'production'
const SRC_DIR = path.join(__dirname, 'src')
const DIST_DIR = path.join(__dirname, 'dist')

const config = {
  entry: [path.join(SRC_DIR, 'index.js')],
  output: {
    path: DIST_DIR,
    publicPath: '/',
    filename: devMode ? 'newsdash.js' : 'newsdash.[contenthash].js',
  },
  optimization: {
    minimize: !devMode,
    minimizer: [new TerserJSPlugin()],
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
        test: /\.sss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[local]__[contenthash:base64:5]',
              },
              sourceMap: devMode,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: devMode,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
          options: { minimize: !devMode },
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'file-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      'newsdash-root': path.join(SRC_DIR, '..', '..', '..'),
      newsdash: path.join(SRC_DIR),
    },
    extensions: ['.js'],
    fallback: {
      // for rss-parser -> sax
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      stream: require.resolve('stream-browserify'),
      timers: require.resolve('timers-browserify'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(SRC_DIR, 'index.html'),
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
    }),
    new FaviconsWebpackPlugin({
      logo: path.join(SRC_DIR, 'static', 'logo.svg'),
      favicons: {
        appName: pkgInfo.name,
        appDescription: pkgInfo.description,
        developerName: null,
        developerURL: null,
        version: pkgInfo.version,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          windows: false,
          yandex: false,
        },
        start_url: '/',
      },
    }),
  ],
}

if (process.env.BUNDLE_ANALYZE) {
  config.plugins.push(new BundleAnalyzerPlugin())
}

if (devMode) {
  config.devServer = {
    static: {
      directory: DIST_DIR,
    },
    hot: true,
    port: 3000,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  }
}

module.exports = config
