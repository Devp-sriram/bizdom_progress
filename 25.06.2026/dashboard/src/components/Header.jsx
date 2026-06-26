import { FaUserCircle } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { IconContext } from "react-icons";
import './Header.css'

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from "react-router-dom";

function Header() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return <header className="d-flex px-4 p-3 justify-content-between border">
        <div className="d-flex gap-2 align-items-center">
            <Button className='hamburger' variant="primary" onClick={handleShow}><HiOutlineMenu /></Button>
            <h3 className="mb-0">Dash</h3>
        </div>


        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ul className="list-unstyled m-3 text-none">
                    <Link to="/" onClick={handleClose}><li className='w-100 p-2 text-start'>Home</li></Link>
                    <Link to="/employee" onClick={handleClose}><li className='w-100 p-2 text-start'>Employees</li></Link>
                    <Link to="/contact" onClick={handleClose}><li className='w-100 p-2 text-start'>contact</li></Link>
                    <Link to="/qoeifoeif" onClick={handleClose}><li className='w-100 p-2 text-start'>notFound</li></Link>
                </ul>
            </Offcanvas.Body>
        </Offcanvas>
        <IconContext.Provider value={{ size: "2rem", className: "global-class-name" }}>
            <div>
                <FaUserCircle />
            </div>
        </IconContext.Provider>
    </header>
}

export default Header