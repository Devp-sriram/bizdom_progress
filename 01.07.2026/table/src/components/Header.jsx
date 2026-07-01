import { FaUserCircle } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { IconContext } from "react-icons";
import './Header.css'

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from "react-router-dom";

import Dropdown from 'react-bootstrap/Dropdown';

function Header({ username }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return <header className="d-flex px-4 p-3 justify-content-between border">
        <div className="d-flex gap-2 align-items-center">
            <Button className='hamburger btn btn-light' onClick={handleShow}><HiOutlineMenu /></Button>
            <h2 className="mb-0">User Manager</h2>
        </div>


        <Offcanvas show={show} onHide={handleClose} className='bg-secondary'>
            <Offcanvas.Header closeButton>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ul className="list-unstyled m-3 text-none ">
                    <Link to="/home" onClick={handleClose}><li className='w-100 p-2 text-start'>Home</li></Link>
                </ul>
            </Offcanvas.Body>
        </Offcanvas>
        <IconContext.Provider value={{ size: "2rem", className: "global-class-name" }}>
            <div>
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center m-0 p-0 bg-transparent border-0">
                        <div>
                            <FaUserCircle />
                            {username && <p className="mb-0 username">{username}</p>}
                        </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="/">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </IconContext.Provider>
    </header >
}

export default Header