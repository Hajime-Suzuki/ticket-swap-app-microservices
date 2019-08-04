export const pathNames = {
  top: () => '/',
  events: () => '/events',
  singleEvent: (eventId?: string) =>
    eventId ? `/events/${eventId}` : '/events/:eventId',
  tickets: (eventId?: string, date?: string) =>
    eventId && date
      ? `/events/${eventId}/${date}/tickets`
      : '/events/:eventId/:date/tickets',
  singleTicket: (eventId?: string, date?: string, ticketId?: string) =>
    eventId && ticketId
      ? `/events/${eventId}/${date}/tickets/${ticketId}`
      : '/events/:eventId/:date/tickets/:ticketId'
}
