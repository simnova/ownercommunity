const CracoLessPlugin = require('craco-less');
const webpack = require('webpack');
module.exports = {
  babel: {
    presets: ["@babel/preset-env", "@babel/preset-react"],
    plugins: [
      [
        // babel-plugin-import for antd components
        // This plugin modifies the imports done in this way
        // import { Select } from 'antd'
        // To only import the relevant component and styles, not the whole library
        "import",
        {
          "libraryName": "antd",
          "libraryDirectory": "es",
          "style": "css"
        }
      ]
    ]
  },
  webpack: {
    configure: {
      resolve: {
        fallback: {
          process: require.resolve("process/browser"),
          zlib: require.resolve("browserify-zlib"),
          stream: require.resolve("stream-browserify"),
          util: require.resolve("util"),
          buffer: require.resolve("buffer"),
          asset: require.resolve("assert"),
        }
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
          process: "process/browser",
        }),
      ]
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              'border-radius-base': '2px',
            },
            javascriptEnabled: true,
          },
        },
        postcssLoaderOptions:
        {
          plugins: [
            require('tailwindcss')('./tailwind.config.js'),
            require('autoprefixer')
          ]
        },
      },
    },
  ],
}