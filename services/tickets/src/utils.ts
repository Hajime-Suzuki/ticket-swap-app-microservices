import { Logger } from '@ticket-swap-app/shared/src/logger'
import { ResponseHandler } from '@ticket-swap-app/shared/src/response'

export const logger = new Logger('tickets')
export const responseHandler = new ResponseHandler(logger)
