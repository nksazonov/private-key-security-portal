import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'uk'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/private-keys': '/private-keys',
    '/key-management': '/key-management',
    '/security-features': '/security-features',
    '/wallet-matrix': '/wallet-matrix'
  },
});
