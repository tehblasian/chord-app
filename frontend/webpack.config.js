const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
    entry: [
        'babel-polyfill',
        './src/index.js',
        'webpack-dev-server/client?http://localhost:3000',
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/',
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /.css$/,
                loaders: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './public/index.html', 
        })
    ],
    devServer: {
        host: 'frontend',
        public: 'localhost',
        port: 3000,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
        },
        historyApiFallback: true,
    },
    node: {
        fs: "empty",
    },
};

module.exports = config;
