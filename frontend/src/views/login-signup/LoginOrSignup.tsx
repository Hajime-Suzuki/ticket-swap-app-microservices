import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { signUp } from 'auth/amplify'
import { TextField } from 'components/form-elements/Fields'
import ContentWrapper from 'components/space/ContentWrapper'
import { Form, Formik } from 'formik'
import { UserContext } from 'contexts/UserContext'
import React, { FC, useContext } from 'react'
import { RouteComponentProps } from 'react-router'
import { pathNames } from 'routes/paths'
import styled from 'styled-components'

const initialSignupValues = { username: '', email: '', password: '' }
const initialLoginValues = { email: '', password: '' }
const LoginOrSignUp: FC<RouteComponentProps> = props => {
  const isLoginPage = props.location.pathname.includes(pathNames.login())
  const { login } = useContext(UserContext)

  const handleSubmit = async (values: typeof initialSignupValues) => {
    await signUp(values)
    await login({ email: values.email, password: values.password })
    props.history.push(pathNames.events())
  }
  const handleLogin = async (values: typeof initialLoginValues) => {
    await login(values)
    props.history.push(pathNames.events())
  }
  return (
    <Wrapper>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Typography variant="h4" gutterBottom>
            {isLoginPage ? 'Login' : 'Signup'}
          </Typography>
        </Grid>
        <Formik
          onSubmit={isLoginPage ? handleLogin : handleSubmit}
          initialValues={
            isLoginPage ? initialLoginValues : (initialSignupValues as any)
          }
        >
          {() => (
            <Form>
              <Grid
                item
                container
                spacing={4}
                direction="column"
                alignItems="center"
              >
                {!isLoginPage && (
                  <Grid item>
                    <TextField name="username" />
                  </Grid>
                )}
                <Grid item>
                  <TextField name="email" />
                </Grid>
                <Grid item>
                  <TextField name="password" type="password" />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                className="submit-button"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Grid>
    </Wrapper>
  )
}

const Wrapper = styled(ContentWrapper)`
  text-align: center;
  .submit-button {
    margin-top: 2em;
  }
`

export default LoginOrSignUp
