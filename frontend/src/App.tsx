import CssBaseline from '@material-ui/core/CssBaseline'
import NavigationBar from 'components/UI/NavigationBar'
import React from 'react'
import Routes from 'routes'
import styled from 'styled-components'
import { theme } from 'theme'

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <NavigationBar />
      <MainWrapper>
        <Routes />
      </MainWrapper>
    </>
  )
}

const MainWrapper = styled.div`
  margin: auto;
  padding: 20px;
  max-width: 1200px;
  & a {
    text-decoration: none;
    color: ${theme.palette.text.primary};
  }
`

export default App
