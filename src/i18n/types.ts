// Define our supported locales
export type AppLocale = 'en' | 'uk';

// Define the structure of our translation files
// Update to use the .ts file instead of .json
export type Messages = typeof import('../../messages/en').default;

// Utility type to make TypeScript happy with certain operations
export type LocalePrefix<P extends string = ''> = P;
