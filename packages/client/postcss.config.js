const path = require('path')
const {
  NodeJsInputFileSystem,
  CachedInputFileSystem,
  ResolverFactory,
} = require('enhanced-resolve') // eslint-disable-line import/no-extraneous-dependencies

const SRC_DIR = path.join(__dirname, 'src')

const resolver = ResolverFactory.createResolver({
  alias: {
    newsdash: path.join(SRC_DIR),
  },
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
