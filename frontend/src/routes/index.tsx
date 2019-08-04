import React from 'react'
import { Route } from 'react-router'
import EventsPage from 'views/events'
import TopPage from 'views/top'
import { pathNames } from './paths'
import EventPage from 'views/event'

const Routes = () => {
  return (
    <>
      <Route path={pathNames.top()} exact component={TopPage} />
      <Route path={pathNames.events()} exact component={EventsPage} />
      <Route path={pathNames.singleEvent()} exact component={EventPage} />
      <Route path={pathNames.tickets()} exact component={EventPage} />
    </>
  )
}

export default Routes
