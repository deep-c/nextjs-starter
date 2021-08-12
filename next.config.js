const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
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
});
