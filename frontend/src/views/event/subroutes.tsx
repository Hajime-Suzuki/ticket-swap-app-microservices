import React from 'react'
import { Route } from 'react-router'
import { pathNames } from 'routes/paths'
import EventDateListSection from './EventDateListSection'
import SingleTicketSection from './SingleTicketSection'
import TicketSection from './TicketSection'
import { EventFromQueryRes } from './types'

export const subRoutes = (event: EventFromQueryRes) => {
  return [
    <Route
      key={0}
      path={pathNames.singleEvent()}
      exact
      component={() => (
        <EventDateListSection event={event}></EventDateListSection>
      )}
    />,
    <Route
      key={1}
      path={pathNames.tickets()}
      exact
      component={() => <TicketSection></TicketSection>}
    />,
    <Route
      key={2}
      path={pathNames.singleTicket()}
      exact
      component={() => <SingleTicketSection></SingleTicketSection>}
    />
  ]
}
