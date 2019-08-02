import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router'
import React from 'react'
import Top from 'views/top'
import Events from 'views/events'
import { pathNames } from './paths'

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path={pathNames.top} exact component={Top} />
      <Route path={pathNames.events} exact component={Events} />
    </BrowserRouter>
  )
}

export default Routes
