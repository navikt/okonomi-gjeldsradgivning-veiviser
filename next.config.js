const path = require('path');
const withLess = require('@zeit/next-less');
const packageJson = require('./package.json');
const constants = require('./src/constants.json');
const navFrontendModuler = [];
Object.keys(packageJson.dependencies).forEach((key) => {
    if (key.startsWith('nav-frontend-')) {
        navFrontendModuler.push(key);
    }
});
const withTranspileModules = require('next-transpile-modules')(navFrontendModuler);
const isProd = process.env.NODE_ENV === 'production';
module.exports = withTranspileModules(
    withLess({
        basePath: '/okonomi-og-gjeld',
        target: 'server',
        trailingSlash: false,
        assetPrefix: isProd ? constants.CONTEXT_PATH : '',
        webpack: (config, options) => {
            config.module.rules.push({
                test: /\.svg$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            svgoConfig: {
                                plugins: [
                                    {
                                        removeTitle: false,
                                    },
                                ],
                            },
                        },
                    },
                ],
            });
            config.resolve.modules.push(path.resolve('./src'));
            return config;
        },
    })
);
