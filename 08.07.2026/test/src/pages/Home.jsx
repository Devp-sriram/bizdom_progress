import Header from '../components/Header';
import SideBar from '../components/SideBar';

import { Outlet } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

export default function Home() {
  return (
    <>
      <Header />
      <div className='d-flex'>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <SideBar />
        <Outlet />
      </div>
    </>
  )
}
