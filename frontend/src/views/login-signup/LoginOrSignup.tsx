import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { TextField } from 'components/forms/Fields'
import ContentWrapper from 'components/space/ContentWrapper'
import { Form, Formik } from 'formik'
import React, { FC } from 'react'
import { RouteComponentProps } from 'react-router'
import { pathNames } from 'routes/paths'
import styled from 'styled-components'
import { signUp } from 'auth/amplify'
import { useUser } from 'hooks/useUser'

const initialSignupValues = { username: '', email: '', password: '' }
const initialLoginValues = { email: '', password: '' }
const LoginOrSignUp: FC<RouteComponentProps> = props => {
  const isLoginPage = props.location.pathname.includes(pathNames.login())
  const { login } = useUser()

  const handleSubmit = async (values: typeof initialSignupValues) => {
    await signUp(values)
    await login({ email: values.email, password: values.password })
    props.history.push(pathNames.events())
  }
  const handleLogin = async (values: typeof initialLoginValues) => {
    await login(values)
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
          {({ handleChange }) => (
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
                    <TextField name="username" onChange={handleChange} />
                  </Grid>
                )}
                <Grid item>
                  <TextField name="email" onChange={handleChange} />
                </Grid>
                <Grid item>
                  <TextField name="password" onChange={handleChange} />
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
