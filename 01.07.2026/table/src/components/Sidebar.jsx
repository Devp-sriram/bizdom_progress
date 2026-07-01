import './Sidebar.css'
import { Link } from "react-router-dom"

function Sidebar() {
    return <aside className='border-end aside bg-dark text-white'>
        <ul className="list-unstyled m-3 text-none">
            <Link to="/home"><li className='w-100 p-2 text-start'>Home</li></Link>
        </ul>
    </aside>
}

export default Sidebar