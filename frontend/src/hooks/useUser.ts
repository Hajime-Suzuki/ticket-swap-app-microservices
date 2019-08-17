import {
  getCurrentUserInfo,
  getUserAttributes,
  login as _login,
  logout as _logout,
  UserAttributes
} from 'auth/amplify'
import { useEffect, useState } from 'react'

export const useUser = () => {
  const [user, setUser] = useState<UserAttributes | null>(null)

  useEffect(() => {
    getCurrentUserInfo()
      .then(res => getUserAttributes(res))
      .then(data => setUser(data))
  }, [])

  const logout = async () => {
    await _logout()
    setUser(null)
  }

  const login = async ({
    email,
    password
  }: {
    email: string
    password: string
  }) => {
    const loggedInUser = await _login({ email, password })
    const data = await getUserAttributes(loggedInUser)
    setUser(data)
  }

  // TODO: user isn't updated in nav bar component
  return {
    user,
    login,
    logout
  }
}
