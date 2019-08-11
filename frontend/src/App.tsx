import CssBaseline from '@material-ui/core/CssBaseline'
import NavigationBar from 'components/UI/NavigationBar'
import React, { FC } from 'react'
import { Routes } from 'routes'

const App: FC = () => {
  return (
    <>
      <CssBaseline />
      <NavigationBar />
      <Routes />
    </>
  )
}

export default App
