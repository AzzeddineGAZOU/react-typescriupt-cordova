const path = require('path');

module.exports = {
    devServer: {
        publicPath: "/",
        contentBase: "./public",
        hot: true,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|j?g|svg|gif)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                    },
                }]
            }

        ]
    },
};