import './Sidebar.css'
import { Link } from "react-router-dom"

function Sidebar() {
    return <aside className='border-end aside'>
        <ul className="list-unstyled m-3 text-brand">
            <Link to="/admin"><li className='w-100 p-2 text-start'>All Products</li></Link>
            <Link to="/admin/add"><li className='w-100 p-2 text-start'>Add Products</li></Link>
            <Link to="/admin/edit"><li className='w-100 p-2 text-start'>Edit Products</li></Link>
        </ul>
    </aside>
}

export default Sidebar