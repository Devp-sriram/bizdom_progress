import { IconContext } from "react-icons";
import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { HiOutlineMenu } from "react-icons/hi";
import { Button, Offcanvas, Dropdown } from 'react-bootstrap';

import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from "react-router-dom";


function Header() {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [creds, setCreds] = useState({})
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        setCreds(JSON.parse(localStorage.getItem('loggedIn')) || {});
    }, [])

    const logout = () => {
        localStorage.removeItem('loggedIn')
    }

    return <header className="d-flex px-4 p-3 justify-content-between border top bg-primary-subtle">
        <div className="d-flex gap-2 align-items-center">
            <Button className='d-md-none btn btn-light' onClick={handleShow}><HiOutlineMenu /></Button>
            <h2 className="mb-0 text-brand ">Assert Manage</h2>
        </div>


        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ul className="list-unstyled m-3 text-none ">
                    <Link to="/home" onClick={() => handleClose()}><li className='w-100 p-2 text-start'>Home</li></Link>
                    <Link to="/home/employees" onClick={() => handleClose()}><li className='w-100 p-2 text-start'>Employees</li></Link>
                    <Link to="/home/asserts" onClick={() => handleClose()}><li className='w-100 p-2 text-start'>Asserts</li></Link>
                </ul>
            </Offcanvas.Body>
        </Offcanvas>
        <IconContext.Provider value={{ size: "2rem", color: "black", className: "global-className-name" }}>
            <div>

                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center m-0 p-0 bg-transparent border-0">
                        <div>
                            <FaUserCircle />
                            {creds?.name && <p className="mb-0" style={{ fontSize: "12px" }}>{creds.name}</p>}
                        </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {creds?.name
                            ? <>
                                <Dropdown.Item href="/" onClick={() => logout()}>Logout</Dropdown.Item>
                            </>
                            : <>
                                <Dropdown.Item href="/signin">Signin</Dropdown.Item>
                                <Dropdown.Item href="/">Login</Dropdown.Item>
                            </>
                        }
                    </Dropdown.Menu>
                </Dropdown>

            </div>
        </IconContext.Provider>
    </header >
}

export default Header