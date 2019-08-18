import { RouteComponentProps } from 'react-router'
import { UserAttributes } from 'auth/amplify'

export type PrivateRouteProps<TProps = any> = RouteComponentProps<TProps> & {
  user: UserAttributes
}

export interface SingleEventRouteProps {
  eventId: string
  date?: string
  ticketId?: string
}

export type SingleEventTicketSectionRouteProps = Required<
  Pick<SingleEventRouteProps, 'eventId' | 'date'>
>

export type SingleEventSingleTicketSectionRouteProps = Required<
  SingleEventRouteProps
>

export interface SellTicketRouteProps {
  eventId: string
}

export interface UserProfileProps {
  userId: string
}
