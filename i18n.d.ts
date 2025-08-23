import type { I18nCurrencySchema, I18nDateTimeSchema, I18nMessageSchema } from '@/infrastructure/locales/schema';
import {
  DefineLocaleMessage,
} from 'vue-i18n'


declare module 'vue-i18n' {
  // Extend the DefineLocaleMessage interface with message schema
  export interface DefineLocaleMessage extends I18nMessageSchema {
  }

}
