import React from 'react'
import { Route } from 'react-router'
import EventsPage from 'views/events'
import TopPage from 'views/top'
import { pathNames } from './paths'
import EventPage from 'views/event'
import TicketsPage from 'views/tickets'

const Routes = () => {
  return (
    <>
      <Route path={pathNames.top()} exact component={TopPage} />
      <Route path={pathNames.events()} exact component={EventsPage} />
      <Route path={pathNames.singleEvent()} exact component={EventPage} />
      <Route path={pathNames.tickets()} exact component={TicketsPage} />
    </>
  )
}

export default Routes
