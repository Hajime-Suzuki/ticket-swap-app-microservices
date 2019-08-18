import LoadingIcon from 'components/UI/LoadingIcon'
import { UserContext } from 'hooks/useUser'
import React, { ComponentType, FC, useContext } from 'react'
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router'
import { pathNames } from './paths'

interface Props {
  component: ComponentType<any>
}
const PrivateRoute: FC<Props & RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { user, loading } = useContext(UserContext)
  if (loading) return <LoadingIcon />
  if (!user) return <Redirect to={pathNames.login()} />

  const C = (routeProps: RouteComponentProps) => (
    <Component {...{ user, ...routeProps }} />
  )

  return <Route {...rest} component={C} />
}

export default PrivateRoute
