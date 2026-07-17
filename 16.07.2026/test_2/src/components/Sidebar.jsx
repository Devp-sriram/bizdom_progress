import './Sidebar.css'
import { Link } from 'react-router-dom';
import { GoStack } from "react-icons/go";
import { FaTv, FaHome } from "react-icons/fa";

export default function Sidebar({ filter, setFilter , handleClose }) {

    return (
        <aside className='d-none d-md-block border' style={{ width: "250px", minHeight: '100vh' }}>
            <ul className='list-unstyled m-2 text-start'>
                <li className={`p-2 ${filter === '' && "active"}`} onClick={() => setFilter('')}>
                    <GoStack className='m-2' />
                    All category
                </li>
                <li className={`p-2 ${filter === 'electronics' && "active"}`} onClick={() => setFilter('electronics')}>
                    <FaTv className='m-2' />
                    Electronics
                </li>
                <li className={`p-2 ${filter === 'fashion' && "active"}`} onClick={() => setFilter('fashion')}>
                    <GoStack className='m-2' />
                    Fashion
                </li>
                <li className={`p-2 ${filter === 'home' && "active"}`} onClick={() => setFilter('home')} >
                    <GoStack className='m-2' />
                    Home
                </li>
                <li className={`p-2 ${filter === 'beauty' && "active"}`} onClick={() => setFilter('beauty')}>
                    <GoStack className='m-2' />
                    Beauty
                </li>
            </ul>
        </aside>
    )
}
