import CssBaseline from '@material-ui/core/CssBaseline'
import NavigationBar from 'components/UI/NavigationBar'
import React from 'react'
import { Routes } from 'routes'

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <NavigationBar />
      <Routes />
    </>
  )
}

export default App
