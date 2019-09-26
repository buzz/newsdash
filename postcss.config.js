module.exports = ({ env }) => ({
  plugins: {
    'postcss-preset-env': {},
    cssnano: env === 'production' ? {} : false,
  },
})
