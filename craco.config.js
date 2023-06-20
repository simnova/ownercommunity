const CracoLessPlugin = require('craco-less');
const webpack = require('webpack');
const path = require('path');
module.exports = {
  style: {
    modules: {
      localIdentName: '[name]__[local]--[hash:base64:5]',
    },
  },
  webpack: {
    configure: {
      resolve: {
        fallback: {
          process: require.resolve('process/browser'),
          zlib: require.resolve('browserify-zlib'),
          stream: require.resolve('stream-browserify'),
          util: require.resolve('util'),
          buffer: require.resolve('buffer'),
          asset: require.resolve('assert'),
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser.js',
        }),
      ],
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              hack: `true; @import "${path.resolve(
                __dirname,
                './src/styles',
                'theme.less'
              )}";`,
            },
            javascriptEnabled: true,
          },
        },
        postcssLoaderOptions: {
          plugins: [
            require('tailwindcss')('./tailwind.config.js'),
            require('autoprefixer'),
          ],
        },
        /*
        overrideWebpackConfig: ({ webpackConfig, cracoConfig, pluginOptions, context: { env, paths } }) => { 
          webpackConfig.resolve.fallback = { ...webpackConfig.resolve.fallback, 
            process: require.resolve("process/browser"),
            zlib: require.resolve("browserify-zlib"),
            stream: require.resolve("stream-browserify"),
            util: require.resolve("util"),
            buffer: require.resolve("buffer"),
            asset: require.resolve("assert"),
          };
          webpackConfig.plugins.push(
            new webpack.ProvidePlugin({
              Buffer: ["buffer", "Buffer"],
              process: "process/browser",
            }),
          );
          return webpackConfig; 
        },
        */
      },
    },
  ],
};
