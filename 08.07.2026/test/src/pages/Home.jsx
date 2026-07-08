import React from 'react'
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import { Outlet } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <Header/>
      <div className='d-flex'>
        <SideBar/>
        <Outlet/>
      </div>
    </>
  )
}
