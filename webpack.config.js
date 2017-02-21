const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
module.exports = {
    entry: __dirname + '/src/localize.js',
    context: __dirname + '/src',
    output: {
        path: __dirname + '/dist',
        filename: 'localize.js'
    },
    plugins: [
        new UglifyJsPlugin()
    ]
};