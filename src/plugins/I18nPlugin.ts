import en from '@/infrastructure/locales/en.json'
import id from '@/infrastructure/locales/id.json'
import { createI18n, type I18nOptions } from 'vue-i18n'

type I18nMessageSchema = typeof id
const options: I18nOptions<{
  message: I18nMessageSchema
}> = {
  legacy: false,
  locale: 'id',
  fallbackLocale: 'en',
  messages: {
    en,
    id
  },
  pluralRules: {
    id: () => {
      return 0; // In Indonesian, we typically use the same form
    }
  },
  escapeParameter: true,
  datetimeFormats: {
    en: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      },
      time: {
        hour: 'numeric',
        minute: 'numeric'
      }
    },
    id: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      },
      time: {
        hour: 'numeric',
        minute: 'numeric'
      }
    }
  },
  numberFormats: {
    en: {
      currency: {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol'
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      },
      percent: {
        style: 'percent',
        useGrouping: false
      }
    },
    id: {
      currency: {
        style: 'currency',
        currency: 'IDR',
        currencyDisplay: 'symbol'
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      },
      percent: {
        style: 'percent',
        useGrouping: false
      }
    }
  }
}
const i18n = createI18n<false, typeof options>(options)



export default i18n

