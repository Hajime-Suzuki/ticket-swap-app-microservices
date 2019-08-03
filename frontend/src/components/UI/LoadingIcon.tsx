import React from 'react'
import ReactLoading from 'react-loading'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import { theme } from 'theme'

const Wrapper = styled(Grid)`
  width: 85vw;
  height: 85vh;
  margin: auto;
`
const LoadingIcon = () => {
  return (
    <Wrapper container alignItems="center" justify="center">
      <ReactLoading
        type="bubbles"
        color={theme.palette.secondary.light}
        delay={0}
        width="10vw"
        height="10vh"
      />
    </Wrapper>
  )
}

export default LoadingIcon
