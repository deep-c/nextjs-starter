const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: ['tailwindui.com', 'images.unsplash.com'],
  },
  i18n: {
    locales: ['en-AU'],
    defaultLocale: 'en-AU',
  },
});
