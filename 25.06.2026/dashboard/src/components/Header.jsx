import { FaUserCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import './Header.css'

function Header() {
    return <header className="d-flex px-4 p-3 justify-content-between border">
        <h3 className="mb-0">Dash</h3>
        <IconContext.Provider value={{ size: "2rem", className: "global-class-name" }}>
            <div>
                <FaUserCircle />
            </div>
        </IconContext.Provider>
    </header>
}

export default Header