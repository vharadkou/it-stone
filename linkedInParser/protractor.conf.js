const { browser } = require('protractor');

exports.config = {
    specs: ['e2e/*.js'],
    allScriptsTimeout: 30000,
    baseUrl: 'https://www.linkedin.com/m/login/',
    maxSessions: 1,
    multiCapabilities: [
        {
            browserName: 'chrome',
            chromeOptions: {
                // args: ['--headless']
            }
        }
    ],
    params: {
        login: {
            email: 'example@example.com',
            password: 'example'
        },
        search: {
            username: 'example user'
        },
    },

    directConnect: true,
};
