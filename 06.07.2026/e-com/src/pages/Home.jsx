import Header from '../components/Header'
import Hero from '../pages/Hero'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar';

import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

function Home() {
    return <>
        <Header/>
         <Outlet/>
        <Footer />
    </>
}

export default Home