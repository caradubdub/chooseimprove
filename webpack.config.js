const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./src/index.js",
  node: {
    fs: "empty",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  mode: process.env.NODE_ENV,
  devServer: {
    open: true,
    publicPath: "/build",
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
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
};
