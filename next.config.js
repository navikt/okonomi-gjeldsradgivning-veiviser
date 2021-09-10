module.exports = {
    basePath: '/okonomi-og-gjeld',
    target: 'server',
    trailingSlash: false,
    reactStrictMode: true,

    eslint: {
        build: true,
    },

    i18n: {
        locales: ['nb', 'nn', 'en'],
        defaultLocale: 'nb',
        localeDetection: false,
    },

    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: '/sanity/production/:path*',
                    destination: '/sanity/index.html',
                },
                {
                    source: '/sanity/test/:path*',
                    destination: '/sanity/index.html',
                },
            ],
        };
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
