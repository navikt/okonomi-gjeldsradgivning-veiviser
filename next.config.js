const { withSentryConfig } = require('@sentry/nextjs');

const sentryWebpackPluginOptions = {
    silent: true,
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options.
};

const moduleExports = {
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
                    source: '/studio/desk/:path*',
                    destination: '/studio/index.html',
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

if (process.env.ENABLE_SENTRY) {
    module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
} else {
    module.exports = moduleExports;
}
