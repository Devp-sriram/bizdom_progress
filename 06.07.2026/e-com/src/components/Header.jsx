import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { HiOutlineMenu } from "react-icons/hi";
import { IconContext } from "react-icons";
import './Header.css'

import { useCart } from '../context/context'
import { useState } from 'react';
import { Link } from "react-router-dom";
import { reduceLength } from '../utils/len'

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Dropdown from 'react-bootstrap/Dropdown';

function Header({ username }) {

    const [show, setShow] = useState(false);
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
                            {username && <p className="mb-0 username">{username}</p>}
                        </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ width: "16rem" }}>
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
                                            <p className="mb-0">$ {item.price}</p>
                                            <div className="d-flex align-items-cenetr justify-content-center">
                                                <Button onClick={(e) => SubQty(e, item.id)}>-</Button>
                                                <p className="m-1">{item?.qty}</p>
                                                <Button onClick={(e) => AddQty(e, item.id)}>+</Button>
                                            </div>
                                        </div>
                                    </div>

                                </Dropdown.Item>
                            })}

                    </Dropdown.Menu>
                </Dropdown>
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