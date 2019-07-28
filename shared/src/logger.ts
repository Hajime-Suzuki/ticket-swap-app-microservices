import * as winston from 'winston'
import { isOffline } from './constants'
const { createLogger, format, transports } = winston
const { printf, timestamp, prettyPrint } = format

export class Logger {
  private logger: winston.Logger
  constructor(label: string) {
    this.logger = createLogger({
      format: isOffline() ? localFormat() : customFormat(label),
      transports: [new transports.Console()]
    })
  }
  log(message?: string, data?: Record<string, any>) {
    return this.logger.info(message, data)
  }
  error(error: any) {
    console.log(error)
    return this.logger.error(error.message)
  }
}

const localFormat = () => {
  return format.combine(prettyPrint({ colorize: true }))
}

const customFormat = (label: string) => {
  const fmt = () =>
    printf(args => {
      return JSON.stringify({
        level: args.level,
        message: args.message,
        data: args.data,
        time: args.timestamp,
        label: args.label
      })
    })

  return format.combine(format.label({ label }), timestamp(), fmt())
}
