const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const pkg = require('./../package.json');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let webpackConfig = merge(common, {
    output: {
        filename: pkg.name + '.[name].bundle.min.js'
    },
    plugins: [
        new UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
                mangle: false,
                compress: {
                    warnings: false
                }
            }
        })
    ]
});

module.exports = webpackConfig;
