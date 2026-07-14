import './SideBar.css'
import { Link , useLocation } from "react-router-dom"

function Sidebar() {
    const location = useLocation()
    return <aside className='border-end aside'>
        <ul className="list-unstyled m-3 text-brand">
            <Link to="/home"><li className={`w-100 p-2 text-start ${location.pathname == '/home' && `text-white bg-primary`}`}>Home</li></Link>
            <Link to="/home/employees"><li className={`w-100 p-2 text-start ${location.pathname == '/home/employees' && `text-white bg-primary`}`}>Employees</li></Link>
            <Link to="/home/asserts"><li className={`w-100 p-2 text-start ${location.pathname == '/home/asserts' && `text-white bg-primary`}`}>Asserts</li></Link>
        </ul>
    </aside>
}

export default Sidebar