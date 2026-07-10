import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { HiOutlineMenu } from "react-icons/hi";
import { IconContext } from "react-icons";
import './Header.css'

import { useCart } from '../context/context'
import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { reduceLength } from '../utils/len'

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Dropdown from 'react-bootstrap/Dropdown';

function Header() {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [creds, setCreds] = useState({})
    const { cart, setCart } = useCart()
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
    const cartTotal = useMemo(() => {
        return cart.filter(item => item && Object.keys(item).length > 0).reduce((acc, item) => acc + item.price * item?.qty, 0).toFixed(2);
    }, [cart]);

    useEffect(() => {
        setCreds(JSON.parse(localStorage.getItem('loggedIn')) || {});
    }, [])

    console.log(cart)

    const logout = () => {
        localStorage.removeItem('loggedIn')
    }

    return <header className="d-flex px-4 p-3 justify-content-between border top">
        <div className="d-flex gap-2 align-items-center">
            <Button className='hamburger btn btn-light' onClick={handleShow}><HiOutlineMenu /></Button>
            <h2 className="mb-0 text-brand ">Z-com</h2>
            <ul className="list-unstyled m-3 text-none d-flex mb-0">
                <Link to="/" onClick={handleClose}><li className='w-100 p-2 text-start mb-0'>Home</li></Link>
                <Link to="/products" onClick={handleClose}><li className='w-100 p-2 text-start mb-0'>product</li></Link>
                <Link to="/cart" onClick={handleClose}><li className='w-100 p-2 text-start mb-0'>cart</li></Link>
            </ul>
        </div>


        <Offcanvas show={show} onHide={handleClose} className='bg-secondary'>
            <Offcanvas.Header closeButton>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ul className="list-unstyled m-3 text-none ">
                    <Link to="/" onClick={handleClose}><li className='w-100 p-2 text-start'>Home</li></Link>
                    <Link to="/products" onClick={handleClose}><li className='w-100 p-2 text-start mb-0'>product</li></Link>
                    <Link to="/cart" onClick={handleClose}><li className='w-100 p-2 text-start mb-0'>cart</li></Link>
                </ul>
            </Offcanvas.Body>
        </Offcanvas>
        <IconContext.Provider value={{ size: "2rem", color: "black", className: "global-className-name" }}>
            <div className="d-flex gap-3">
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center m-0 p-0 bg-transparent border-0">
                        <div>
                            <IoMdCart />
                            {creds?.name && <p className="mb-0 username">{creds.name}</p>}
                        </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ width: "18rem" }}>
                        <h4 className="text-start p-2">Cart</h4>
                        {cart
                            .filter(item => item && Object.keys(item).length > 0)
                            .map(item => {
                                return <Dropdown.Item className="d-flex gap-2">
                                    <img src={item.image} width={"50px"} height={'50px'} style={{
                                        height: "50px",
                                        width: "50px",
                                        objectFit: "contain",
                                        objectPosition: "center",
                                        backgroundColor: "#f8f9fa"
                                    }} />
                                    <div className="w-100">
                                        <h6>{reduceLength(item?.title, 16)}</h6>
                                        <div className="d-flex justify-content-between">
                                            <p className="mb-0">x {item?.qty || 1}</p>
                                            <p className="mb-0">$ {item.price * item?.qty}</p>
                                            <div className="d-flex align-items-cenetr justify-content-center">
                                                <Button onClick={(e) => SubQty(e, item.id)}>-</Button>
                                                <p className="m-1">{item?.qty}</p>
                                                <Button onClick={(e) => AddQty(e, item.id)}>+</Button>
                                            </div>
                                        </div>
                                    </div>

                                </Dropdown.Item>
                            })}
                        <div className="w-100 d-flex justify-content-between">
                            <p className="m-2" >Total {cartTotal}</p>
                            <Button variant="primary" className="m-2" onClick={() => navigate('./cart')}>checkout</Button>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
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
                                <Dropdown.Item href="/admin" >Admin Panel</Dropdown.Item>
                                <Dropdown.Item href="/login" onClick={() => logout()}>Logout</Dropdown.Item>
                            </>
                            : <>
                                <Dropdown.Item href="/signin">Signin</Dropdown.Item>
                                <Dropdown.Item href="/login">Login</Dropdown.Item>
                            </>
                        }
                    </Dropdown.Menu>
                </Dropdown>

            </div>
        </IconContext.Provider>
    </header >
}

export default Header