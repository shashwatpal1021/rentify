import React from 'react'
import { useCurrentUserValue } from '../atoms'

const Profile = () => {
  const currentUser = useCurrentUserValue()
  console.log("currentUser", currentUser)
  return (
    <div>Profile</div>
  )
}

export default Profile