const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports =
    {
        entry: './src/client/index.js',
        mode: 'production',
        stats: {
            //remove MiniCSS console outputs
            children: false
        },
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
                    test: /\.(png|jpe?g|gif)$/,
                    loader: 'url-loader',
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
