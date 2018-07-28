const path = require('path');

module.exports = {
    mode: 'development',
    output: {
        filename: '[name].bundle.js',
        // path: path.resolve(__dirname),
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './',
        port: 9000,
        proxy: {
            '/api': 'http://localhost:9001',
        },
    },
};
