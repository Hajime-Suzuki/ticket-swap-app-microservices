import { ThemeProvider } from '@material-ui/styles'
import { client } from 'graphql/client'
import React from 'react'
import { ApolloProvider } from 'react-apollo-hooks'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { theme } from 'theme'
import App from './App'

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
