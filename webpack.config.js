const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

module.exports = {
  entry: './src/assets/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/main.bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/css'),
          to: path.resolve(__dirname, 'dist/assets/css'),
        },
        {
          from: path.resolve(__dirname, 'dist/'),
          to: path.resolve(__dirname, 'docs/'),
        },
      ],
    }),
    new ReplaceInFileWebpackPlugin([
      {
        dir: 'dist',
        files: ['index.html'],
        rules: [
          {
            search: '<script type="module" src="assets/js/main.js"></script>',
            replace: '',
          },
        ],
      },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        type: 'javascript/auto',
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
