import { useState , useEffect} from 'react'

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Card from 'react-bootstrap/Card';
import { Outlet } from 'react-router-dom';

const Home = () => {
    const [user, setUser] = useState({})
    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('loggedIn')))
        console.log(user)
    },[])
    return (
        <>
            <Header username={user?.name}/>
            <section className='d-flex'>
                <Sidebar/>
                <Outlet/>
            </section>
        </>
    )
}

export default Home