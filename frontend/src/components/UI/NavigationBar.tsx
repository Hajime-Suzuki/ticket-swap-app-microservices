import { Grid } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
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
        <Grid container justify="flex-end">
          <StyledLink to={pathNames.events}>
            <Typography variant="h6">events</Typography>
          </StyledLink>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default NavigationBar
