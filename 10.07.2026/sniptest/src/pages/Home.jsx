import Header from '../components/Header'
import SideBar from '../components/SideBar'
import Footer from '../components/Footer'

import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <div>
        <Header/>
        <div className='d-flex'>
            <SideBar/>
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default Home