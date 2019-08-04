import Amplify, { Auth } from 'aws-amplify'

const config = {
  Auth: {
    region: process.env.REACT_APP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_WEB_CLIENT_ID
  }
}

Amplify.configure(config)

export const signUp = async ({username, email, password}: {username: string, email: string, password: string}) => {
  const res = await Auth.signUp({
    username: email,
    password,
    attributes: {
      preferred_username: username,
      email
    }
  })
  console.log({res})
  return res
}
