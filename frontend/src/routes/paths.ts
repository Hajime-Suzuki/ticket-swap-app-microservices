export const pathNames = {
  top: () => '/',
  events: () => '/events',
  createEvent: () => '/create-event',
  singleEvent: (eventId?: string) =>
    eventId ? `/events/${eventId}` : '/events/:eventId',
  tickets: (eventId?: string, date?: string) =>
    eventId && date
      ? `/events/${eventId}/${date}/tickets`
      : '/events/:eventId/:date/tickets',
  // TODO: change path to start with 'tickets'
  singleTicket: (eventId?: string, date?: string, ticketId?: string) =>
    eventId && ticketId
      ? `/events/${eventId}/${date}/tickets/${ticketId}`
      : '/events/:eventId/:date/tickets/:ticketId',
  sellTicket: (eventId?: string) =>
    eventId ? `/sell-ticket/${eventId}` : '/sell-ticket/:eventId',
  orderTicket: (eventId?: string, ticketId?: string) =>
    eventId && ticketId
      ? `/order/${eventId}/${ticketId}`
      : `/order/:eventId/:ticketId`,
  user: (userId?: string) => (userId ? `/user/${userId}` : `user/:userId`),
  login: () => '/login',
  signup: () => '/signup'
}
