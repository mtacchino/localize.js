const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
module.exports = {
    context: __dirname + '/src',
    output: {
        path: __dirname + '/dist',
        filename: 'localize.js'
    },
    plugins: [
        new UglifyJsPlugin()
    ]
};