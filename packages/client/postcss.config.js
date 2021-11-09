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
  // until new version of postcss-advanced-variables
  require.resolve('@knagis/postcss-advanced-variables'),
  require.resolve('postcss-nested'),
  // using PostCSS8-fork from https://github.com/onigoetz/postcss-color-function
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
