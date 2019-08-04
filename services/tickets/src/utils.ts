import { Logger } from '@ticket-swap-app/shared/src/logger'
import { ResponseHandler } from '@ticket-swap-app/shared/src/response'
import {
  GetExpressionArgs,
  getFilterExpression
} from '@ticket-swap-app/shared/src/types/database'
import { TicketModel } from './models/Ticket'

export const logger = new Logger('tickets')
export const responseHandler = new ResponseHandler(logger)
export const getQueryFilter = (args: GetExpressionArgs<TicketModel>) =>
  getFilterExpression<TicketModel>(args)
