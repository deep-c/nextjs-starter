const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const { withSentryConfig } = require('@sentry/nextjs');

const useCompress = process.env.COMPRESS === 'true';
const useSentry = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

module.exports = withSentryConfig(
  withBundleAnalyzer({
    compress: useCompress,
    eslint: {
      ignoreDuringBuilds: true,
    },
    i18n: {
      defaultLocale: 'en-AU',
      locales: ['en-AU'],
    },
    images: {
      domains: ['tailwindui.com', 'images.unsplash.com'],
    },
    poweredByHeader: false,
    reactStrictMode: true,
    webpack: (config) => {
      config.module.rules.push({ loader: 'ignore-loader', test: /\.test\./ });
      return config;
    },
  }),
  {
    dryRun: !useSentry,
  }
);
