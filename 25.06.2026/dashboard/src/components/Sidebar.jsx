import './Sidebar.css'
import { Link } from "react-router-dom"

function Sidebar() {
    return <aside className='border-end aside'>
        <ul className="list-unstyled m-3 text-none">
            <li className='w-100 p-2 text-start'><Link to="/">Home</Link></li>
            <li className='w-100 p-2 text-start'><Link to="/about">About</Link></li>
            <li className='w-100 p-2 text-start'><Link to="/contact">contact</Link></li>
            <li className='w-100 p-2 text-start'><Link to="/qoeifoeif">notFound</Link></li>
        </ul>
    </aside>
}

export default Sidebar