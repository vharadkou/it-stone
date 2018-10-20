const prod = 'prod';
const dev = 'dev';

function buildConfig(env) {
    let config;

    if (env === prod) {
        console.info('Production configuration is running...');
        config = require('./config/webpack.' + env + '.js');
    } else if (env === dev) {
        console.info('Development configuration is running...');
        config = require('./config/webpack.' + env + '.js');
    } else {
        console.warn('Unknown configuration is running...');
        config = require('./config/webpack.dev.js');
    }

    return config;
}

module.exports = buildConfig;