const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { root } = require('./helpers');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

let cleanOptions = {
    verbose: true,
    beforeEmit: true,
    allowExternal: true
};

let webpackConfig = {
    entry: {
        app: path.resolve(__dirname, root('./src/app.ts'))
    },

    output: {
        path: path.resolve(__dirname, root('./build/'))
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
    },

    resolveLoader: {
        modules: [
            root('node_modules')
        ]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin([path.resolve(__dirname, root('./build/'))], cleanOptions)
    ],
    target: 'node',
    // need to work with __dirname and filename
    node: {
        __dirname: false,
        __filename: false,
        // global: true,
        // crypto: 'empty',
        // process: true,
        // module: false,
        // clearImmediate: false,
        // setImmediate: false
    },
    externals: [nodeExternals()]
};

module.exports = webpackConfig;
