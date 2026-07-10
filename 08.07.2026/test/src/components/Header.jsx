import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { HiOutlineMenu } from "react-icons/hi";
import { IconContext } from "react-icons";
import './Header.css'

// import { useCart } from '../context/context'
import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from "react-router-dom";
// import { reduceLength } from '../utils/len'

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Dropdown from 'react-bootstrap/Dropdown';

function Header() {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [creds, setCreds] = useState({})
    // const { cart, setCart } = useCart()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const SubQty = (e, id) => {
        e.stopPropagation()
        setCart(prev =>
            prev.map(item => item.id == id ? item.qty > 1 ? { ...item, qty: item.qty -= 1 } : {} : item)
        )
    }

    const AddQty = (e, id) => {
        e.stopPropagation()
        setCart(prev =>
            prev.map(item => item.id == id ? { ...item, qty: item.qty += 1 } : item)
        )
    }
    // const cartTotal = useMemo(() => {
    //     return cart.filter(item => item && Object.keys(item).length > 0).reduce((acc, item) => acc + item.price * item?.qty, 0).toFixed(2);
    // }, [cart]);

    useEffect(() => {
        setCreds(JSON.parse(localStorage.getItem('loggedIn')) || {});
    }, [])

    const logout = () => {
        localStorage.removeItem('loggedIn')
    }

    return <header className="d-flex px-4 p-3 justify-content-between border top bg-primary-subtle">
        <div className="d-flex gap-2 align-items-center">
            <Button className='hamburger btn btn-light' onClick={handleShow}><HiOutlineMenu /></Button>
            <h2 className="mb-0 text-brand ">Admin console</h2>
        </div>


        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ul className="list-unstyled m-3 text-none ">
                    <Link to="/home" onClick={()=>handleClose()}><li className='w-100 p-2 text-start'>Home</li></Link>
                    <Link to="/home/users" onClick={()=>handleClose()}><li className='w-100 p-2 text-start'>Users</li></Link>
                    <Link to="/home/products" onClick={()=>handleClose()}><li className='w-100 p-2 text-start'>Products</li></Link>
                </ul>
            </Offcanvas.Body>
        </Offcanvas>
        <IconContext.Provider value={{ size: "2rem", color: "black", className: "global-className-name" }}>
            <div>

                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center m-0 p-0 bg-transparent border-0">
                        <div>
                            <FaUserCircle />
                            {creds?.name && <p className="mb-0 username">{creds.name}</p>}
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