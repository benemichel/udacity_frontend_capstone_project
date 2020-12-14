const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports =
    {
        entry: './src/client/index.js',
        mode: 'development',
        devtool: 'source-map',
        stats: 'verbose',
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: '/\.js$/',
                    exclude: /node_modules/,
                    loader: "babel-loader"
                },
                {

                    test: /\.(png|jpe?g|gif)$/i,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images',
                    },
                },
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: "./src/client/views/index.html",
                filename: "./index.html",
            }),

            new CleanWebpackPlugin({
                // Simulate the removal of files
                dry: true,
                // Write Logs to Console
                verbose: true,
                // Automatically remove all unused webpack assets on rebuild
                cleanStaleWebpackAssets: true,
                protectWebpackAssets: false
            })
        ],
        output: {
            libraryTarget: 'var',
            library: 'Client'
        },
    }
