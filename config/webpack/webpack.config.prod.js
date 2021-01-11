const paths = require("./paths");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

const publicPath = "/";
const BUILD_DIR = paths.appBuild;
const APP_DIR = paths.appSrc + "/index.tsx";

const isProd = process.env.NODE_ENV === "production";
const config = {
  mode: isProd ? "production" : "development",
  entry: APP_DIR,
  performance: { hints: false },
  output: {
    path: BUILD_DIR,
    filename: "bundle.js",
    publicPath,
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".css"],
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
              localIdentName: "[name]__[local]--[hash:base64:5]",
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

  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true,
          cache: true,
          parallel: true,
          module: false,
        },
        extractComments: true,
      }),
    ],
    splitChunks: {
      chunks: "all",
      automaticNameDelimiter: "-",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        general: {
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },

  plugins: [
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    }),
    new HtmlWebpackPlugin({
      title: "Ecommerce",
      inject: true,
      template: "public/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        map: {
          inline: false,
          annotation: true,
        },
      },
    }),
    new webpack.DefinePlugin({
      "process.env": {
        TOKEN_API: JSON.stringify(process.env.TOKEN_API),
      },
    }),
  ],
};

config.devServer = {
  port: 8080,
  historyApiFallback: true,
  open: true,
  env: {
    TOKEN_API: process.env.TOKEN_API,
  },
  hot: true,
  compress: true,
  stats: "errors-only",
  overlay: true,
};

module.exports = config;
