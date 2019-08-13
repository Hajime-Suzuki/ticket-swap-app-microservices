import { ThemeProvider } from '@material-ui/styles'
import { client } from 'graphql/client'
import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { theme } from 'theme'
import App from './App'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
