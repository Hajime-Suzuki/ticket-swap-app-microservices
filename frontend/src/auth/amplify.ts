import { CognitoUser } from 'amazon-cognito-identity-js'
import Amplify, { Auth } from 'aws-amplify'
import { secrets } from '@ticket-swap-app/config/src/.secrets'
import shortId from 'shortid'

const config = {
  Auth: {
    region: 'eu-central-1',
    userPoolId: secrets.AWS_COGNITO_USER_POOL_ID,
    userPoolWebClientId: secrets.AWS_COGNITO_WEB_CLIENT_ID
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
      'preferred_username': username,
      email,
      'custom:id': shortId.generate()
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

export const getToken = async () => {
  try {
    const user = await getCurrentUserInfo()
    const session = user && user.getSignInUserSession()
    return session && session.getAccessToken().getJwtToken()
  } catch (error) {
    return null
  }
}

export interface UserAttributes {
  email: string | undefined
  id: string | undefined
}
export const getUserAttributes = (
  user: CognitoUser | null | undefined
): Promise<UserAttributes> => {
  return new Promise((resolve, reject) => {
    if (!user) return null
    user.getUserAttributes((e, attributes) => {
      if (e) return reject(e)
      if (!attributes) return null

      const id = attributes.find(att => att.getName() === 'custom:id')

      resolve({
        email: user.getUsername() || '',
        id: id ? id.getValue() : ''
      })
    })
  })
}
