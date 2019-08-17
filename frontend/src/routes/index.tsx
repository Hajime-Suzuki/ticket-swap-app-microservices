import React from 'react'
import { Route } from 'react-router'
import EventPage from 'views/event'
import EventDateListSection from 'views/event/sub-routes/EventDateListSection'
import SingleTicketSection from 'views/event/sub-routes/SingleTicketSection'
import TicketListSection from 'views/event/sub-routes/TicketListSection'
import EventsPage from 'views/events'
import LoginOrSignUp from 'views/login-signup/LoginOrSignup'
import TopPage from 'views/top'
import { pathNames } from './paths'
import CreateEventPage from 'views/create-event'
import SellTicketPage from 'views/sell-ticket'
import UserProfilePage from 'views/profile'

export const Routes = () => {
  return (
    <>
      <Route path={pathNames.top()} exact component={TopPage} />
      <Route path={pathNames.events()} exact component={EventsPage} />
      <Route path={pathNames.createEvent()} exact component={CreateEventPage} />
      <Route path={pathNames.singleEvent()} exact component={EventPage} />
      <Route path={pathNames.tickets()} exact component={EventPage} />
      <Route path={pathNames.singleTicket()} exact component={EventPage} />
      <Route path={pathNames.sellTicket()} exact component={SellTicketPage} />
      <Route path={pathNames.orderTicket()} exact component={() => null} />
      <Route path={pathNames.user()} exact component={() => null} />
      <Route path={pathNames.profile()} exact component={UserProfilePage} />
      <Route path={pathNames.login()} exact component={LoginOrSignUp} />
      <Route path={pathNames.signup()} exact component={LoginOrSignUp} />
    </>
  )
}

export const EventPageSubRoutes = () => {
  return (
    <>
      <Route
        path={pathNames.singleEvent()}
        exact
        component={() => <EventDateListSection />}
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
