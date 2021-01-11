const paths = require("./paths");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const publicPath = "/";
const BUILD_DIR = paths.appBuild;
const APP_DIR = paths.appSrc + "/index.tsx";

const config = {
  mode: "development",
  entry: APP_DIR,
  output: {
    path: BUILD_DIR,
    filename: "bundle.js",
    publicPath,
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.css|scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              localIdentName: "[local]",
              importLoaders: 1,
              modules: true,
            },
          },
          { loader: "sass-loader", options: { sourceMap: true } },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env"]],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // in bytes
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },

  plugins: [
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new HtmlWebpackPlugin({
      title: "Ecommerce",
      inject: true,
      template: "public/index.html",
    }),
  ],
};

config.devServer = {
  port: 8080,
  historyApiFallback: true,
  open: true,
  hot: true,
  compress: true,
  stats: "errors-only",
  overlay: true,
};

module.exports = config;
