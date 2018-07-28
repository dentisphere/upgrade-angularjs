const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const distFolder = path.resolve(__dirname, '../..', 'dist');

module.exports = {
    output: {
        filename: '[name].bundle.[hash].js',
        path: distFolder,
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },

    mode: 'production',
    plugins: [
        new CleanWebpackPlugin([distFolder], {
            allowExternal: true,
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true,
                },
                canPrint: true,
            },
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};
