const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[name].[ext]',
      //     outputPath: 'images/',
      //     publicPath: 'images/',
      //   },
      // },
      {
       test: /\.(jpe?g|jpg|JPG|gif|png|svg|ico)$/i,
       use: [
        {
          loader: 'url-loader',
           options: {
            limit: false,
            outputPath:'images/'
          }
        }
      ]
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  devServer: {
    historyApiFallback: true,
  },
  performance: {
    hints: false,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      favicon: './public/favicon.ico',
      filename: "./index.html",
    }),
  ],
};
