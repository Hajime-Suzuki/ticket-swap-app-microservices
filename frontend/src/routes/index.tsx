import React from 'react'
import { Route } from 'react-router'
import EventsPage from 'views/events'
import TopPage from 'views/top'
import { pathNames } from './paths'
import EventPage from 'views/event'
import { EventFromQueryRes } from 'views/event/types'
import EventDateListSection from 'views/event/sub-routes/EventDateListSection'
import TicketListSection from 'views/event/sub-routes/TicketListSection'
import SingleTicketSection from 'views/event/sub-routes/SingleTicketSection'
import LoginOrSignUp from 'views/login-signup/LoginOrSignup'

export const Routes = () => {
  return (
    <>
      <Route path={pathNames.top()} exact component={TopPage} />
      <Route path={pathNames.events()} exact component={EventsPage} />
      <Route path={pathNames.singleEvent()} exact component={EventPage} />
      <Route path={pathNames.tickets()} exact component={EventPage} />
      <Route path={pathNames.singleTicket()} exact component={EventPage} />
      <Route path={pathNames.orderTicket()} exact component={() => null} />
      <Route path={pathNames.user()} exact component={() => null} />
      <Route path={pathNames.login()} exact component={LoginOrSignUp} />
      <Route path={pathNames.signup()} exact component={LoginOrSignUp} />
    </>
  )
}

export const EventPageSubRoutes = (event: EventFromQueryRes) => {
  return (
    <>
      <Route
        path={pathNames.singleEvent()}
        exact
        component={() => <EventDateListSection event={event} />}
      />
      <Route
        path={pathNames.tickets()}
        exact
        component={() => <TicketListSection />}
      />
      <Route
        path={pathNames.singleTicket()}
        exact
        component={() => <SingleTicketSection />}
      />
    </>
  )
}
