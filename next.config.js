const packageJson = require('./package.json');
const navFrontendModuler = [];
Object.keys(packageJson.dependencies).forEach((key) => {
    if (key.startsWith('@navikt')) {
        navFrontendModuler.push(key);
    }
});
const withTranspileModules = require('next-transpile-modules')(navFrontendModuler);
module.exports = withTranspileModules({
    basePath: '/okonomi-og-gjeld',
    target: 'server',
    trailingSlash: false,
    reactStrictMode: true,

    eslint: {
        build: true,
    },

    async redirects() {
        return [
            {
                source: '/artikkel/jeg-trenger-hjelp-av-en-okonomi-og-gjeldsradgiver-i-nav',
                destination: '/artikkel/fa-gjeldsradgivning-fra-nav',
                permanent: true,
            },
        ];
    },
});
