const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { resourceUsage } = require('process');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
  entry: {
    index: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js',
    clean: true,
    // assetModuleFilename: "[name][ext]",
    // assetModuleFilename: "assets/image/[name][ext]",
    assetModuleFilename: pathData => {
      const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
      console.log(filepath)
      return `${filepath}/[name][ext]`;
    },
  },
  devServer :{
    static:{
        directory: path.resolve(__dirname, 'dist')
    },
    port: 5000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true, 

  },

  module: {
    rules:[
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                }
            }
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
            type: 'asset/resource'
            
        },
        {
            test: /\.mp3$/,
            type: 'asset/resource'
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset',
        },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
        title:'Puzzie',
        filename:'index.html',
        template: 'src/index.html',
        chunks: ['index'],
    }),

    // new CopyPlugin({
    //     patterns: [
    //         {
    //           from: "./src/assets/images",
    //           to: "assets/images",
    //         },
    //       ],
    // }),

  ],

};