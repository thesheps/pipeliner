const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",

  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.json"
          }
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],

  node: {
    fs: "empty",
    net: "empty"
  }
};
