const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './app.js',
    output: {
        filename: 'bundle.js',
    },
    plugins: [new CleanWebpackPlugin('dist')],
};
