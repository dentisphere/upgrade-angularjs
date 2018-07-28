const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './app.ts',
    output: {
        filename: 'dist/bundle.js',
        path: path.resolve(__dirname),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss?$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css?$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: 'file-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [new CleanWebpackPlugin('dist')],
    devtool: 'source-map',
    devServer: {
        contentBase: './',
        port: 9000,
    },
};
