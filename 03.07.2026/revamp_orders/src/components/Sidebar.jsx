import './Sidebar.css'
import { Link } from "react-router-dom"

function Sidebar() {
    return <aside className='border-end aside'>
        <ul className="list-unstyled m-3 text-brand">
            <Link to="/"><li className='w-100 p-2 text-start'>Orders</li></Link>
            <Link to="/users"><li className='w-100 p-2 text-start'>Users</li></Link>
        </ul>
    </aside>
}

export default Sidebar