import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';

const Dashboard = () => {
  const location = useLocation();
  const [tab,setTab]= useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabfromUrl = urlParams.get('tab');
    if(tabfromUrl){
      setTab(tabfromUrl);
    }
  },[location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md: w-56'>
        <DashSidebar/>
      </div>
      {tab === 'profile' && <DashProfile/>}
    </div>
  )
}

export default Dashboard

