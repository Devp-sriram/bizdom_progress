import { useState } from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import './Header.css'
import { Nav } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { MdHeight } from 'react-icons/md';

function Header() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <header>
            <Offcanvas show={show} onHide={handleClose} style={{ height: "100vh" }}>
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul className='list-unstyled'>
                        <li className='p-2'>
                            <Nav.Link>HOME</Nav.Link>
                        </li>
                        <li className='p-2'>
                            <Nav.Link>ABOUT US</Nav.Link>
                        </li>
                        <li className='p-2'>
                            <Nav.Link>REWARDS</Nav.Link>
                        </li>
                        <li className='p-2'>
                            <Nav.Link >
                                <img src="https://fbcakes.com/assets/images/icon/cart.png" alt="" />
                            </Nav.Link>
                        </li>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>

            <section className='fullwidth overhead'>
                <div className='container h-100 w-100 d-flex justify-content-between align-items-center'>
                    <div className='w-50 d-flex gap-5'>
                        <p className='m-0'>Welcome to Our Fbcakes</p>
                        <p className='m-0 d-flex gap-2'><FaPhoneAlt style={{ color: "red", margin: "4px" }} />Call Us: 90034 32888</p>
                    </div>
                    <div>
                        <p className='m-0'>
                            My Account
                        </p>
                    </div>
                </div>

            </section>
            <div className='navbar container h-100 w-100 d-flex justify-content-between align-items-center py-3 gap-3 position-relative'>
                <img src='https://bizdomfs.blob.core.windows.net/post-image/64a9e886-3ebd-4647-b199-feb1ec6f2ce5.png' />

                <div variant="light" onClick={handleShow} className='ham position-absolute' style={{ right: "10px" }}>
                    <RxHamburgerMenu />
                </div>
                <div className='inpDiv position-relative'>
                    <CiSearch className='position-absolute' style={{ left: "10px", top: "20px" }} />
                    <input type='text' placeholder='search ...' className='form-control p-2 ps-4 m-1 border rounded-pill ' />
                </div>
                <Nav className='deskNav'>
                    <Nav.Item>
                        <Nav.Link>HOME</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>ABOUT US</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>REWARDS</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link >
                            <img src="https://fbcakes.com/assets/images/icon/cart.png" alt="" />
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        </header>
    )
}

export default Header
