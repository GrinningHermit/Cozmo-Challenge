var path = require('path');

module.exports = {
    entry: {
        app: ['./engine.js']
    },
    output: {
        filename: './output.js'
    },
    module: {
        rules: [],
    },
    plugins: [],
    devtool: '#source-map'
};