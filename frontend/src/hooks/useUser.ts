import { useEffect, useState } from 'react'
import {
  getCurrentUserInfo,
  logout as _logout,
  login as _login
} from 'auth/amplify'
import { CognitoUser } from '@aws-amplify/auth'

export const useUser = () => {
  const [user, setUser] = useState<CognitoUser | undefined>(undefined)

  useEffect(() => {
    getCurrentUserInfo().then(res => setUser(res))
  }, [])

  const logout = async () => {
    await _logout()
    setUser(undefined)
  }

  const login = async ({
    email,
    password
  }: {
    email: string
    password: string
  }) => {
    const loggedInUser = await _login({ email, password })
    console.log(loggedInUser)
    setUser(loggedInUser)
  }

  return {
    user,
    login,
    logout
  }
}
