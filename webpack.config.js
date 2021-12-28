const path = require('path');
const pkg = require('./package.json');

module.exports = {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, 'lib'),
      filename: "index.js",
      library: pkg.name,
      libraryTarget: "commonjs"
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
      ]
    }
};