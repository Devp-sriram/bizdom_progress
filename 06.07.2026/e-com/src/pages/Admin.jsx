import React from 'react'
import AdminPanel from '../components/Adminpanel'
import { Outlet } from 'react-router-dom'

export default function Admin() {
  return (
    <div className='d-flex' style={{ marginTop: '100px' }}>
        <AdminPanel/>
        <Outlet/>
    </div>
  )
}
