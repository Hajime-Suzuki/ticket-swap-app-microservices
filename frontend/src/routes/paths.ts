export const pathNames = {
  top: () => '/',
  events: () => '/events',
  singleEvent: (eventId?: string) =>
    eventId ? `/events/${eventId}` : '/events/:eventId',
  tickets: (eventId?: string, date?: string) =>
    eventId && date
      ? `/events/${eventId}/tickets/${date}`
      : '/events/:eventId/tickets/:date'
}
