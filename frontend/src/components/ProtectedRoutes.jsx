import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useAuthState } from '../atoms'
const ProtectedRoutes = (props) => {
  const [authState, setAuthState] = useAuthState()
  return authState.loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to={props.to || "/signin"} />
  )
}

export default ProtectedRoutes