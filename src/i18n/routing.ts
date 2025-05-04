import {defineRouting} from 'next-intl/routing';
import { AppLocale } from './types';

export const routing = defineRouting({
  locales: ['en', 'uk'] as AppLocale[],
  defaultLocale: 'en' as AppLocale,
  pathnames: {
    '/': '/',
    '/private-keys': '/private-keys',
    '/key-management': '/key-management',
    '/security-features': '/security-features',
    '/wallet-matrix': '/wallet-matrix'
  },
});
