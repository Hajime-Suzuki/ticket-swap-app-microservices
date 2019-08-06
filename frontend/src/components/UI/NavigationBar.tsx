import { Button, Grid } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import React from 'react'
import { Link } from 'react-router-dom'
import { pathNames } from 'routes/paths'
import styled from 'styled-components'
import { theme } from 'theme'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${theme.palette.primary.contrastText};
`

const NavigationBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justify="flex-end" spacing={2}>
          <Grid item>
            <StyledLink to={pathNames.top()}>
              <Button color="inherit">home</Button>
            </StyledLink>
          </Grid>
          <Grid item>
            <StyledLink to={pathNames.events()}>
              <Button color="inherit">events</Button>
            </StyledLink>
          </Grid>
          <Grid item>
            <StyledLink to={pathNames.login()}>
              <Button color="inherit">Login</Button>
            </StyledLink>
          </Grid>
          <Grid item>
            <StyledLink to={pathNames.signup()}>
              <Button color="inherit">Signup</Button>
            </StyledLink>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default NavigationBar
