// Define our supported locales
export type AppLocale = 'en' | 'uk';

// Define the structure of our translation files
export type Messages = typeof import('../../messages/en.json');

// Utility type to make TypeScript happy with certain operations
export type LocalePrefix<P extends string = ''> = P;
