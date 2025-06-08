import React, { use } from 'react'
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  const{currentUser}= useSelector((state) => state.user);
  return currentUser ? <Outlet/> : <Navigate to='/signin'/>
}

export default Dashboard
