const path = require('path');
const nodeExternals = require('webpack-node-externals')

module.exports = {
    entry: "./src/index.ts",
    externalsPresets: { node: true },
    externals: [nodeExternals(), { 'react': {
        root: 'React',
        commonjs: 'react',
        commonjs2: 'react'
      }, 'react-dom': {
        root: 'ReactDOM',
        commonjs: 'react-dom',
        commonjs2: 'react-dom'
      }
    }],
    output: {
      path: path.resolve(__dirname, 'lib'),
      filename: "index.js",
      libraryTarget: 'umd',
    },
    resolve: {
      extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
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