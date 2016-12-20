// 'use strict'
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var plugins = [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './example/index.template.html',
        inject: true
    }),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("styles.bundle.css", {
        allChunks: true
    })
];

if(process.env.NODE_ENV !== 'production') plugins.push(new webpack.HotModuleReplacementPlugin())

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:4000',
        'webpack/hot/only-dev-server',
        './example/index'
    ],
    devServer: {
      port: 4000
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: plugins,
    module: {
        loaders: [
            {
              test: /\.(js|jsx)?$/,
              loaders: ['babel?presets[]=es2015,presets[]=stage-0,presets[]=react,plugins[]=react-hot-loader/babel'],
              exclude: /node_modules/,
              include: __dirname
            },
            {
              test: /\.css/,
              loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
              // exclude: /node_modules/
            },
            {
              test: /\.less$/,
              loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader"),
              // exclude: /node_modules/
            },
            {
              test: /\.png$/,
              loader: "url-loader?limit=100000"
            },
            {
              test: /\.jpg$/,
              loader: "file-loader"
            },
            {
              test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
              loader: 'file-loader'
            }
        ]
    }
};
