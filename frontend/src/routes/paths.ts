export const pathNames = {
  top: () => '/',
  events: () => '/events',
  singleEvent: (eventId?: string) =>
    eventId ? `/events/${eventId}` : '/events/:eventId'
}
