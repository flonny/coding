const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'app.js'
    },
    resolve: { extensions: ['.js', '.ts', '.tsx'] },
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                enforce: 'pre',
                use: [{
                    loader: 'ts-loader'
                }, { loader: 'source-map-loader' }],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/tpl/index.html',
        })
    ],
    stats: {
        warningsFilter: [/Failed to parse source map/],
      },
}