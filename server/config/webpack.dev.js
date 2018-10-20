const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const pkg = require('./../package.json');
const NodemonPlugin = require('nodemon-webpack-plugin');
const path = require('path');

let webpackConfig = merge(common, {
    output: {
        filename: pkg.name + '.[name].bundle.js'
    },
    plugins: [
        new NodemonPlugin({
            watch: [
                path.resolve('../build'),
                "./"
            ],
            ignore: [
                ".git",
                "node_modules/**/node_modules"
            ],
            verbose: true,
            script: '../server/build/community-app-server.app.bundle.js',
        }),
    ],
});

module.exports = webpackConfig;
