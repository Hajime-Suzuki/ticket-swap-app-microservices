import React from 'react'
import { Route } from 'react-router'
import Events from 'views/events'
import Top from 'views/top'
import { pathNames } from './paths'

const Routes = () => {
  return (
    <>
      <Route path={pathNames.top} exact component={Top} />
      <Route path={pathNames.events} exact component={Events} />
    </>
  )
}

export default Routes
