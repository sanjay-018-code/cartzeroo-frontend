import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import {getJWT} from '../../services/userServices'

const ProtectedRoutes = () => {
  const location = useLocation()
  
  return getJWT() ?( <Outlet/>) : (<Navigate to='/signup' state={{from : location.pathname}} />)
}

export default ProtectedRoutes