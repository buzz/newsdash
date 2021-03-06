// eslint-disable-next-line import/no-extraneous-dependencies
const resolver = require('postcss-import-resolver')

const webpackConfig = require('./webpack.config')

const plugins = [
  [
    require.resolve('postcss-import'),
    {
      resolve: resolver({
        alias: webpackConfig.resolve.alias,
        modules: [],
      }),
    },
  ],
  require.resolve('postcss-mixins'),
  require.resolve('precss'),
  require.resolve('postcss-color-function'),
  require.resolve('postcss-preset-env'),
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(require.resolve('cssnano'))
}

module.exports = {
  parser: require.resolve('sugarss'),
  plugins,
}
