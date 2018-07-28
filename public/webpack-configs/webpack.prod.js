const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const distFolder = path.resolve(__dirname, '../..', 'dist');

module.exports = {
    output: {
        filename: '[name].bundle.[hash].js',
        path: distFolder,
    },

    mode: 'production',
    plugins: [
        new CleanWebpackPlugin([distFolder], {
            allowExternal: true,
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};
