import { FaUserCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import './Header.css'

function Header() {
    return <header className="d-flex px-4 p-3 justify-content-between bg-secondary-subtle">
        <h3>Page Routing Example</h3>
        <IconContext.Provider value={{ size: "2rem", className: "global-class-name" }}>
            <div className="my-2">
                <FaUserCircle />
            </div>
        </IconContext.Provider>
    </header>
}

export default Header