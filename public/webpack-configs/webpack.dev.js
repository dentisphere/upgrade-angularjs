module.exports = {
    mode: 'development',
    output: {
        filename: '[name].bundle.js',
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './src/',
        port: 9000,
        proxy: {
            '/api': 'http://localhost:9001',
        },
    },
};
