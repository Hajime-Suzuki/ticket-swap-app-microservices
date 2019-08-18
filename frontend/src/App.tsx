import CssBaseline from '@material-ui/core/CssBaseline'
import NavigationBar from 'components/UI/NavigationBar'
import React, { FC } from 'react'
import { Routes } from 'routes'
import { UserProvider } from 'contexts/UserContext'

const App: FC = () => {
  return (
    <UserProvider>
      <CssBaseline />
      <NavigationBar />
      <Routes />
    </UserProvider>
  )
}

export default App
