import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  typography: {
    fontFamily: 'Bellefair',
    fontSize: 19,
  },
  palette: {
    text: {
      primary: '#3e3e3e',
      secondary: '#4f6672',
    },
    primary: {
      light: '#51b7ae',
      main: '#26a69a',
      dark: '#1a746b',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffc947',
      main: '#ff9800',
      dark: '#c66900',
      contrastText: '#000',
    },
    error: {
      main: '#b71c1c',
      light: '#f05545',
      dark: '#7f0000',
    },
  },
})
