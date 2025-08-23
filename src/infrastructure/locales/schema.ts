
import id from '@/infrastructure/locales/id.json'

export type I18nMessageSchema = typeof id
export type I18nDateTimeSchema = {
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
export type I18nCurrencySchema = {
  currency: {
    style: 'currency',
    currencyDisplay: 'symbol',
    currency: string,
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
