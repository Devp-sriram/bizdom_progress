
import './SideBar.css'
import { Link } from "react-router-dom"

function Sidebar() {
    return <aside className='border-end aside'>
        <ul className="list-unstyled m-3 text-brand">
            <Link to="/home"><li className='w-100 p-2 text-start'>Home</li></Link>
            <Link to="/home/users"><li className='w-100 p-2 text-start'>Users</li></Link>
            <Link to="/home/products"><li className='w-100 p-2 text-start'>Products</li></Link>
        </ul>
    </aside>
}

export default Sidebar
