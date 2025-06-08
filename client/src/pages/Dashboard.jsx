import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Dashboard = () => {
  const location = useLocation();
  const [tab,setTab]= useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabfromUrl = urlParams.get('tab');
    console.log(tabfromUrl);
  },[location.search]);
  return (
    <div>
      dash
    </div>
  )
}

export default Dashboard

