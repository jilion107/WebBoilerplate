var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //抽取CSS文件插件

module.exports = {
    // 配置入口
    entry: {
        app: './app/index.js',
        vendors: ['react','react-dom','react-router','alt']  //第三方库和框架
    },
    output: {
        path: __dirname + '/build',
        filename: '[name].js',
        publicPath: '/zhijian/'
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query:{
                    presets: ['es2015', 'react','stage-1'],
                    plugins: [['import', { "libraryName": "antd", "style": true }]]
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['style-loader', 'css-loader']
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [ 'css-loader','less-loader' ]
                })
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'url-loader?limit=10000&name=[hash:8].[name].[ext]',
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css')
    ],
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        contentBase: "./build",
        port: 8082
    }
};
