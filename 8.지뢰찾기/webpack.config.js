const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name : 'minesweeper-setting',
    mode : 'development',
    devtool : 'eval',
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    
    entry : {
        app : ['./client',],
    }, // input

    module : {
        rules : [{
            test : /\.jsx?/,
            loader : 'babel-loader',
            options : {
                presets : ["@babel/preset-env", "@babel/preset-react"],
                plugins : [
                    'react-refresh/babel',
                ],
            }
        }],
    },

    plugins : [
        new RefreshWebpackPlugin(),
    ],

    output : {
        path : path.join(__dirname, '/dist'),
        filename : "app.js",
    }, // output

    devServer : {
        devMiddleware : {publicPath: '/dist'},
        static : {directory : path.resolve(__dirname)},
        hot : true,
    },
};