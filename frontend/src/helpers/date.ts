import { Event } from 'graphql/generated/events'
import { format } from 'date-fns'

export const DateFormat = {
  'YYYY-MM-DD': 'yyyy-MM-dd',
  'MMM DD': 'MMM dd',
  'MMM': 'MMM',
  'DD': 'dd'
}

export const formatDate = (
  date: Date | number,
  formatString: keyof typeof DateFormat,
  options?: {
    locale?: Locale
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
    firstWeekContainsDate?: number
    useAdditionalWeekYearTokens?: boolean
    useAdditionalDayOfYearTokens?: boolean
  }
): string => {
  return format(date, DateFormat[formatString], options)
}

interface ExtractStartDateAndEndDateReturn {
  startDate: string | null
  endDate: string | null
}
export const extractStartDateAndEndDate = (
  event: Partial<Event>,
  options?: {
    format?: keyof typeof DateFormat
  }
): ExtractStartDateAndEndDateReturn => {
  if (!event || !event.dates || !event.dates.length)
    return { startDate: null, endDate: null }

  const dates = {
    startDate: event.dates[0].date,
    endDate: event.dates[event.dates.length - 1].date
  }

  if (options && options.format) {
    return {
      startDate: formatDate(new Date(dates.startDate), options.format),
      endDate: formatDate(new Date(dates.endDate), options.format)
    }
  }
  return dates
}

export const getDate = (date: string) => {
  return formatDate(new Date(date), 'MMM DD')
}

export const extractDate = (date: string) => {
  return {
    month: formatDate(new Date(date), 'MMM'),
    date: formatDate(new Date(date), 'DD')
  }
}
