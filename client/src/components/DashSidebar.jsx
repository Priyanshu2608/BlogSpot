import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Sidebar, SidebarItem, SidebarItems, SidebarItemGroup } from 'flowbite-react';
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const DashSidebar = () => {
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
    <Sidebar className='bg-blue-800' >
      <SidebarItems color='white' >
        <SidebarItemGroup color='white'>
         <Link to='/dashboard?tab=profile'> <SidebarItem active={tab ==='profile'} icon={HiUser} label="User" >Profile</SidebarItem></Link>
          <SidebarItem  icon={HiArrowSmRight} className='cursor-pointer' >Sign Out</SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};

export default DashSidebar;
