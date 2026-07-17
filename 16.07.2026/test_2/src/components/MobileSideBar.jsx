import './Sidebar.css'
import { Link } from 'react-router-dom';
import { GoStack } from "react-icons/go";
import { FaTv, FaHome } from "react-icons/fa";

export default function MobileSidebar({ filter, setFilter , handleClose}) {

    return (
        <aside>
            <ul className='list-unstyled m-2 text-start'>
                <li className={`p-2 ${filter === '' && "active"}`} onClick={() => {
                    setFilter('')
                    handleClose()
                }}>
                    <GoStack className='m-2' />
                    All category
                </li>
                <li className={`p-2 ${filter === 'electronics' && "active"}`} onClick={() => {
                    setFilter('electronics')
                    handleClose()
                }}>
                    <FaTv className='m-2' />
                    Electronics
                </li>
                <li className={`p-2 ${filter === 'fashion' && "active"}`} onClick={() => {
                    setFilter('fashion')
                    handleClose()
                }}>
                    <GoStack className='m-2' />
                    Fashion
                </li>
                <li className={`p-2 ${filter === 'home' && "active"}`} onClick={() => {
                    setFilter('home')
                    handleClose()
                }} >
                    <GoStack className='m-2' />
                    Home
                </li>
                <li className={`p-2 ${filter === 'beauty' && "active"}`} onClick={() => {
                    setFilter('beauty')
                    handleClose()
                }}>
                    <GoStack className='m-2' />
                    Beauty
                </li>
            </ul>
        </aside>
    )
}
