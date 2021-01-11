const paths = require("./paths");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

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
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              localIdentName: "[name]__[local]--[hash:base64:5]",
              importLoaders: 1,
              modules: true,
            },
          },
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
        test: /\.(png|jpe?g|gif)$/,
        include: /assets/,
        use: [
          {
            loader: "file-loader",
          },
        ],
        exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/, /\.pdf$/],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "react-svg-loader",
            options: {
              svgo: {
                plugins: [{ removeTitle: false }],
                floatPrecision: 2,
              },
            },
          },
        ],
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
      ENV: JSON.stringify({ env: { development: true } }),
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
