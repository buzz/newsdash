const {
  NodeJsInputFileSystem,
  CachedInputFileSystem,
  ResolverFactory,
} = require('enhanced-resolve') // eslint-disable-line import/no-extraneous-dependencies

const webpackConfig = require('./webpack.config')

const resolver = ResolverFactory.createResolver({
  alias: webpackConfig.resolve.alias,
  extensions: ['.sss'],
  modules: [],
  useSyncFileSystemCalls: true,
  fileSystem: new CachedInputFileSystem(new NodeJsInputFileSystem(), 60000),
})

module.exports = ({ env }) => ({
  parser: 'sugarss',
  plugins: {
    'postcss-import': {
      resolve: (id, basedir) => resolver.resolveSync({}, basedir, id),
    },
    'postcss-mixins': {},
    precss: {},
    'postcss-color-function': {},
    'postcss-preset-env': {},
    cssnano: env === 'production' ? {} : false,
  },
})
