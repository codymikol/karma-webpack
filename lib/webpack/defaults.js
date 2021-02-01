const path = require('path');
const os = require('os');

function create() {
  return {
    mode: 'development',
    output: {
      filename: '[name].js',
      // eslint-disable-next-line prettier/prettier
      path: path.join(os.tmpdir(), '_karma_webpack_') + Math.floor(Math.random() * 1000000),
    },
    stats: {
      modules: false,
      colors: true,
    },
    watch: false,
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        minSize: 0,
        cacheGroups: {
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 1,
          },
        },
      },
    },
    plugins: [],
  };
}

module.exports = { create };
