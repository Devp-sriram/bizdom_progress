import './SideBar.css'
import { Link , useLocation } from "react-router-dom"

function Sidebar() {
    const location = useLocation()
    return <aside className='border-end aside'>
        <ul className="list-unstyled m-3 text-brand">
            <Link to="/home"><li className={`w-100 p-2 text-start ${location.pathname == '/home' && `text-white bg-primary`}`}>Home</li></Link>
            <Link to="/home/users"><li className={`w-100 p-2 text-start ${location.pathname == '/home/users' && `text-white bg-primary`}`}>Users</li></Link>
            <Link to="/home/products"><li className={`w-100 p-2 text-start ${location.pathname == '/home/products' && `text-white bg-primary`}`}>Products</li></Link>
        </ul>
    </aside>
}

export default Sidebar