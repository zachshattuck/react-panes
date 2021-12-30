const path = require('path');
const nodeExternals = require('webpack-node-externals')
const pkg = require('./package.json')

module.exports = {
    entry: "./src/index.js",
    externalsPresets: { node: true },
    externals: [nodeExternals(), { 'react': 'React', 'react-dom': 'ReactDOM'}],
    output: {
      path: path.resolve(__dirname, 'lib'),
      filename: "index.js",
      libraryTarget: 'umd',
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
      // alias: {
      //   react: path.resolve('./node_modules/react')
      // }
    },
    // externals: {
    //   // Use external version of React and React DOM
    //   'react': 'react',
    //   'react-dom': 'react-dom'
    // },
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
        // {
        //   test: /\.s[ac]ss$/i,
        //   use: ["style-loader", "css-loader", "sass-loader"]
        // },
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