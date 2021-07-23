const path = require('path')

module.exports = {
  mode: 'production',
  target: 'node',
  entry: {
    main: './src/main.js',
    post: './src/post.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: {
    'node-gyp': 'node-gyp',
  },
  externalsPresets: { 'node': true },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'shebang-loader',
      },
    ],
  },
}
