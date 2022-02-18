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
    swcMinify: true, // Blir default på i Next 12.2

    eslint: {
        build: true,
    },

    i18n: {
        locales: ['nb', 'nn', 'en'],
        defaultLocale: 'nb',
        localeDetection: false,
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

if (process.env.ENABLE_SENTRY === 'true') {
    module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
} else {
    module.exports = moduleExports;
}
