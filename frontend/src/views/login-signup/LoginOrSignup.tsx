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

const initialValues = { username: '', email: '', password: '' }
const LoginOrSignUp: FC<RouteComponentProps> = props => {
  const isLogin = props.location.pathname.includes(pathNames.login())
  const handleSubmit = (values: typeof initialValues) => {
    console.log(values)
  }
  return (
    <Wrapper>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Typography variant="h4" gutterBottom>
            {isLogin ? 'Login' : 'Signup'}
          </Typography>
        </Grid>
        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
          {({ handleChange }) => (
            <Form>
              <Grid
                item
                container
                spacing={4}
                direction="column"
                alignItems="center"
              >
                {isLogin && (
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
