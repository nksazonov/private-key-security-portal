import type {Messages, AppLocale} from './src/i18n/types';

declare module 'next-intl' {
  export type LocalePrefix<P extends string = ''> = P;

  // Extend Locale to include our specific locales
  export type Locale = AppLocale;

  // Override with our messages type
  type IntlMessages = Messages;
}

declare module 'next-intl/server' {
  export interface RequestConfig {
    locale: AppLocale;
    now?: Date;
    messages: Messages;
    timeZone?: string;
    formats?: Record<string, Record<string, object>>;
    defaultTranslationValues?: Record<string, unknown>;
    onError?: (error: Error) => void;
    getMessageFallback?: (params: GetMessageFallbackParams) => string;
  }
}