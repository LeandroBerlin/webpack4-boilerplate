const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')


module.exports = {
  entry: "./src/assets/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "assets/js/bundle.js",
    publicPath: ""
  },
  devtool: 'source-map',
  optimization: {
    minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin()]
  },
  module: {
    rules: [
      //babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      },
      //style and css extract
      {
        test: [/.css$|.scss$/],
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader", {
          loader: 'postcss-loader',
          options: {
            plugins: () => [require('autoprefixer')({
              'browsers': ['> 1%', 'last 2 versions']
            })],
          }
        }]
      },
      //image file loader
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/img/",
              publicPath: '../img/'
            }
          }
        ]
      },
      //fonts
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/fonts/',
            publicPath: '../fonts'
          }
        }]
      }
    ]
  },
  resolve: {
    alias: {
      '@scss': path.resolve(__dirname, 'src/assets/scss'),
      '@img': path.resolve(__dirname, 'src/assets/img'),
      '@': path.resolve(__dirname, 'src')
    },
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/css/styles.css"
    }),
    new HtmlWebpackPlugin({
      title: "Setting up webpack 4",
      template: "src/index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['dist'] }
    })
  ],
  performance: {
    maxEntrypointSize: 1000000,
    maxAssetSize: 1000000
  }
};
