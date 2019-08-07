import Amplify, { Auth } from 'aws-amplify'
import { CognitoUser } from 'amazon-cognito-identity-js'

const config = {
  Auth: {
    region: process.env.REACT_APP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_WEB_CLIENT_ID
  }
}

Amplify.configure(config)

interface SignUpArgs {
  username: string
  email: string
  password: string
}
export const signUp = async ({ username, email, password }: SignUpArgs) => {
  const res = await Auth.signUp({
    username: email,
    password,
    attributes: {
      preferred_username: username,
      email
    }
  })
  return res
}

type LoginArgs = Pick<SignUpArgs, 'email' | 'password'>

export const login = async ({ email, password }: LoginArgs) => {
  const user = await Auth.signIn({ username: email, password })
  return user
}

export const getCurrentUserInfo = async (): Promise<
  CognitoUser | undefined
> => {
  const res = await Auth.currentAuthenticatedUser()
  return res
}

export const logout = async () => {
  return Auth.signOut()
}
