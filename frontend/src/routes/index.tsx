import React from 'react'
import { Route } from 'react-router'
import EventsPage from 'views/events'
import TopPage from 'views/top'
import { pathNames } from './paths'
import EventPage from 'views/event'
import { EventFromQueryRes } from 'views/event/types'
import EventDateListSection from 'views/event/EventDateListSection'
import TicketListSection from 'views/event/TicketListSection'
import SingleTicketSection from 'views/event/SingleTicketSection'

export const Routes = () => {
  return (
    <>
      <Route path={pathNames.top()} exact component={TopPage} />
      <Route path={pathNames.events()} exact component={EventsPage} />
      <Route path={pathNames.singleEvent()} exact component={EventPage} />
      <Route path={pathNames.tickets()} exact component={EventPage} />
      <Route path={pathNames.singleTicket()} exact component={EventPage} />
    </>
  )
}

export const EventPageSubRoutes = (event: EventFromQueryRes) => {
  return (
    <>
      <Route
        path={pathNames.singleEvent()}
        exact
        component={() => <EventDateListSection event={event}></EventDateListSection>}
      />
      <Route path={pathNames.tickets()} exact component={() => <TicketListSection />} />
      <Route path={pathNames.singleTicket()} exact component={() => <SingleTicketSection />} />
    </>
  )
}
