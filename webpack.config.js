const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const PROD = process.env.NODE_ENV === 'production';

module.exports = {
    entry: __dirname + '/src/localize.js',
    context: __dirname + '/src',
    output: {
        path: __dirname + '/dist',
        filename: PROD ? 'localize.min.js' : 'localize.js',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {
                test: /\.js$/, 
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: PROD ? [
        new UglifyJsPlugin()
    ] : []
};