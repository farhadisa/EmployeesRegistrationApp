var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'bundles'),
      filename: 'webpack.bundle.js',
    },

    mode: "development",
    
    module: {
      rules: [{ test: /\.txt$/, use: 'babel-loader' }],
    },
    
    devServer: {
      port: 5500,
      static: './src/'
    }
};


