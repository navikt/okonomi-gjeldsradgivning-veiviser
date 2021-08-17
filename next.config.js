module.exports = {
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
};
