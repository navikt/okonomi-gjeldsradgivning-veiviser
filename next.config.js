const withLess = require('@zeit/next-less');
const packageJson = require('./package.json');
const navFrontendModuler = [];
Object.keys(packageJson.dependencies).forEach((key) => {
    if (key.startsWith('nav-frontend-')) {
        navFrontendModuler.push(key);
    }
});
const withTranspileModules = require('next-transpile-modules')(navFrontendModuler);
module.exports = withTranspileModules(
    withLess({
        basePath: '/okonomi-og-gjeld',
        target: 'server',
        trailingSlash: false,
        reactStrictMode: true,

        async redirects() {
            return [
                {
                    source: '/artikkel/jeg-trenger-hjelp-av-en-okonomi-og-gjeldsradgiver-i-nav',
                    destination: '/artikkel/fa-gjeldsradgivning-fra-nav',
                    permanent: true,
                },
            ];
        },
    })
);
