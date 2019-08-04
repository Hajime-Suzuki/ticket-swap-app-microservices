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
