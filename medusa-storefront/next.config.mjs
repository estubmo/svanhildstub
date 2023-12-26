import { withStoreConfig } from './store-config.mjs';
import store from './store.config.json' assert { type: "json" };

const config = withStoreConfig({
  experimental: {
    serverComponentsExternalPackages: [
      '@medusajs/product',
      '@medusajs/modules-sdk',
    ],
  },
  features: store.features,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'medusa-public-images.s3.eu-west-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'medusa-server-testing.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'medusa-server-testing.s3.us-east-1.amazonaws.com',
      },
    ],
    domains: [
      '<YOUR_SPACE_DOMAIN>', // TODO: Add your space domain here
    ],
  },
});

export default config;
