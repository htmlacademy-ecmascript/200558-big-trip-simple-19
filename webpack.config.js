const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  devtool: 'inline-source-map',
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      }
    ]
  }
};
