const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "eval-cheap-module-source-map",
  watch: false,
  mode: "development",
  entry: "./src/main.js",
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(html)$/,
        loader: "html-loader",
        options: {
          sources: {
            // replace attributes!
            list: [
              {
                tag: "img",
                attribute: "src",
                type: "src",
              },
              {
                tag: "link",
                attribute: "href",
                type: "src",
              },
            ],
          },
        },
      },

      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};