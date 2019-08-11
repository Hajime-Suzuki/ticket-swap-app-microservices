import { Event } from 'graphql/generated/events'
import { format } from 'date-fns'

const FormatTypes = {
  'MMM DD': 'MMM DD',
  'MMM': 'MMM',
  'DD': 'DD'
}

interface ExtractStartDateAndEndDateReturn {
  startDate: string | null
  endDate: string | null
}
export const extractStartDateAndEndDate = (
  event: Partial<Event>,
  options?: {
    format?: keyof typeof FormatTypes
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
      startDate: format(new Date(dates.startDate), options.format),
      endDate: format(new Date(dates.endDate), options.format)
    }
  }
  return dates
}

export const getDate = (date: string) => {
  return format(new Date(date), FormatTypes['MMM DD'])
}

export const extractDate = (date: string) => {
  return {
    month: format(new Date(date), FormatTypes.MMM),
    date: format(new Date(date), FormatTypes.DD)
  }
}
