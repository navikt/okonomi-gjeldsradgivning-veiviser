// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
    dsn: SENTRY_DSN || 'https://e1ebfd84266b4eecb8fb9a286fb06e7c@sentry.gc.nav.no/58',
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1.0,
    environment: process.env.NEXT_PUBLIC_ENVIRONMENT ?? 'prod-gcp',
    // ...
    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
});
