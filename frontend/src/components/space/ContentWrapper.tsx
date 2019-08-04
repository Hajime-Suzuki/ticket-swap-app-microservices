import { theme } from 'theme'
import styled from 'styled-components'

const ContentWrapper = styled.div`
  margin: auto;
  padding: 20px;
  max-width: 1200px;
  & a {
    text-decoration: none;
    color: ${theme.palette.text.primary};
  }
`

export default ContentWrapper
