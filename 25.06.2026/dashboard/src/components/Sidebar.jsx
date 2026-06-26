import './Sidebar.css'
import { Link } from "react-router-dom"

function Sidebar() {
    return <aside className='border-end aside'>
        <ul className="list-unstyled m-3 text-none">
            <Link to="/home"><li className='w-100 p-2 text-start'>Home</li></Link>
            <Link to="/home/employee"><li className='w-100 p-2 text-start'>Employees</li></Link>
            <Link to="/home/contact"><li className='w-100 p-2 text-start'>contact</li></Link>
            <Link to="/home/qoeifoeif"><li className='w-100 p-2 text-start'>notFound</li></Link>
        </ul>
    </aside>
}

export default Sidebar