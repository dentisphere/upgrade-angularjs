const path = require('path');
const ngToolsWebpack = require('@ngtools/webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const distFolder = path.resolve(__dirname, '../..', 'dist');

module.exports = {
    entry: {
        app: './src/main.aot.ts',
    },
    output: {
        filename: '[name].bundle.[hash].js',
        path: distFolder,
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: '@ngtools/webpack',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
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
        new ngToolsWebpack.AngularCompilerPlugin({
            tsConfigPath: './tsconfig.aot.json',
            entryModule: path.resolve(__dirname, '../src/app.module.ts#AppModule'),
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};
