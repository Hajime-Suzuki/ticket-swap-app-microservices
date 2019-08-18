import {
  getCurrentUserInfo,
  getUserAttributes,
  login as _login,
  logout as _logout,
  UserAttributes
} from 'auth/amplify'
import React, { useEffect, useState, createContext, FC } from 'react'

const useUser = () => {
  const [user, setUser] = useState<UserAttributes | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!user) {
      setLoading(true)
      getCurrentUserInfo()
        .then(res => getUserAttributes(res))
        .then(data => {
          setUser(data)
          setLoading(false)
        })
        .catch(e => {
          setLoading(false)
        })
    }
  }, [user])

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

  return {
    user,
    loading,
    login,
    logout
  }
}

type UserContext = ReturnType<typeof useUser>
export const UserContext = createContext({} as UserContext)

export const UserProvider: FC = ({ children }) => {
  const values = useUser()
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}
