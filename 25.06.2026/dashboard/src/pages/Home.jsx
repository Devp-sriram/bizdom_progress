import { useState } from 'react'

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Card from 'react-bootstrap/Card';
import { Outlet } from 'react-router-dom';

const Home = () => {

    return (
        <>
            <Header />
            <section className='d-flex'>
                <Sidebar />
                <Outlet/>
            </section>
        </>
    )
}

export default Home