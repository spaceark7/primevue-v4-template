import { createI18n, type Composer, type ComposerOptions } from 'vue-i18n'
import en from '@/infrastructure/locales/en.json'
import id from '@/infrastructure/locales/id.json'

type I18nMessageSchema =  typeof id
const composerOptions: ComposerOptions<{
  message: I18nMessageSchema
}> ={

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
        notation: 'standard'
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
        notation: 'standard'
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
const i18n = createI18n<{
  message: I18nMessageSchema
}, 'id' | 'en' | any, false>({
  legacy: false,
  ...composerOptions,
  pluralizationRules: {
    // Add custom pluralization rules
    // Indonesian typically doesn't change word forms for plurals
    id: () => {
      return 0; // In Indonesian, we typically use the same form
    }
  },


})
// const i18n = createI18n<{
//   message: I18nMessageSchema
// }, 'id' | 'en' | any, false>({
//   legacy: false,
//   locale: 'id',
//   fallbackLocale: 'en',
//   messages: {
//     en,
//     id
//   },
//   escapeParameter: true,
//   pluralizationRules: {
//     // Add custom pluralization rules
//     // Indonesian typically doesn't change word forms for plurals
//     id: () => {
//       return 0; // In Indonesian, we typically use the same form
//     }
//   },
//   datetimeFormats: {
//     en: {
//       short: {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric'
//       },
//       long: {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//         weekday: 'long'
//       },
//       time: {
//         hour: 'numeric',
//         minute: 'numeric'
//       }
//     },
//     id: {
//       short: {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric'
//       },
//       long: {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//         weekday: 'long'
//       },
//       time: {
//         hour: 'numeric',
//         minute: 'numeric'
//       }
//     }
//   },
//   numberFormats: {
//     en: {
//       currency: {
//         style: 'currency',
//         currency: 'USD',
//         notation: 'standard'
//       },
//       decimal: {
//         style: 'decimal',
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2
//       },
//       percent: {
//         style: 'percent',
//         useGrouping: false
//       }
//     },
//     id: {
//       currency: {
//         style: 'currency',
//         currency: 'IDR',
//         notation: 'standard'
//       },
//       decimal: {
//         style: 'decimal',
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2
//       },
//       percent: {
//         style: 'percent',
//         useGrouping: false
//       }
//     }
//   }
// })

export default i18n

