const path = require("path");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname,
    publicPath: "/",
    filename: "bundle.js",
  },
  mode: process.env.NODE_ENV,
  devServer: {
    open: true,
    publicPath: "/build",
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|j?g|svg|gif)?$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        AIRTABLE_API_KEY: JSON.stringify(process.env.AIRTABLE_API_KEY),
      },
    }),
  ],
};
