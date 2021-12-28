const path = require('path');
const pkg = require('./package.json');

module.exports = {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, 'lib'),
      filename: "index.js",
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
      alias: {
        react: path.resolve('./node_modules/react')
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        },
      ]
    }
};