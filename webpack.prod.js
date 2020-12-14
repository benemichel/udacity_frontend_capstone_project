const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports =
    {
        entry: './src/client/index.js',
        mode: 'production',
        module: {
            rules: [
                {
                    test: '/\.js$/',
                    exclude: /node_modules/,
                    loader: "babel-loader"
                },
                {
                    test: /\.scss$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    loader: 'file-loader?name=app/images/[name].[ext]',
                    options: {
                        outputPath: 'images',
                    },
                },

            ]
        },
        plugins: [
            new MiniCssExtractPlugin({ filename: "[name].css" }),
            new WorkboxPlugin.GenerateSW(),
            new HtmlWebPackPlugin({
                template: "./src/client/views/index.html",
                filename: "./index.html",
            }),
        ],
        output: {
            libraryTarget: 'var',
            library: 'Client'
        },
    }
