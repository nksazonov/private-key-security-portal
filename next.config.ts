import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
// Removed createMessagesDeclaration since we're now using TypeScript modules

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  // Add redirects for old routes to new localized routes
  async redirects() {
    return [
      {
        source: '/key-management',
        destination: '/en/key-management',
        permanent: true,
      },
      {
        source: '/private-keys',
        destination: '/en/private-keys',
        permanent: true,
      },
      {
        source: '/security-features',
        destination: '/en/security-features',
        permanent: true,
      },
      {
        source: '/wallet-matrix',
        destination: '/en/wallet-matrix',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
