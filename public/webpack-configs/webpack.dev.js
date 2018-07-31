module.exports = {
    mode: 'development',

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        // https://github.com/TypeStrong/ts-loader/issues/267
                        options: { onlyCompileBundledFiles: true },
                    },
                    'angular2-template-loader',
                ],
                exclude: /node_modules/,
            },
        ],
    },
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
