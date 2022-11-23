const path = require('path');

module.exports = {
    entry: './src/page.js',
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};