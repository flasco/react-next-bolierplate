// next.config.js
const withStyles = require('./thrid-party/styles');
const withPlugins = require('next-compose-plugins/lib');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
);

if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {};
  require.extensions['.scss'] = file => {};
}

module.exports = withPlugins(
  [
    withStyles({
      cssModules: true,
      cssLoaderOptions: {
        localIdentName: '[local]___[hash:base64:5]',
      },
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: themeVariables, // make your antd custom effective
      },
      webpack: (config, { isServer }) => {
        if (isServer) {
          const antStyles = /antd\/.*?\/style.*?/;
          const origExternals = [...config.externals];
          config.externals = [
            (context, request, callback) => {
              if (request.match(antStyles)) return callback();
              if (typeof origExternals[0] === 'function') {
                origExternals[0](context, request, callback);
              } else {
                callback();
              }
            },
            ...(typeof origExternals[0] === 'function' ? [] : origExternals),
          ];

          config.module.rules.unshift({
            test: antStyles,
            use: 'null-loader',
          });
        }
        config.resolve.alias = {
          components: path.resolve(__dirname, './components'),
          pages: path.resolve(__dirname, './pages'),
          utils: path.resolve(__dirname, './utils'),
          ...config.resolve.alias,
        };

        return config;
      },
    }),
  ],
  {
    distDir: 'build',
    useFileSystemPublicRoutes: false,
  }
);
