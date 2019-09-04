// next.config.js
const withSass = require('@zeit/next-sass');
const withPlugins = require('next-compose-plugins/lib'); //结合sass css

module.exports = withPlugins(
  [
    withSass({
      cssModules: true,
      cssLoaderOptions: {
        localIdentName: '[local]___[hash:base64:5]',
      },
    }),
  ],
  {
    distDir: 'build',
    webpack(config, options) {
      return config;
    },
  }
);
