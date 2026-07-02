import React from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import './Header.css'
import { Nav } from 'react-bootstrap';

function Header() {
    return (
        <header>
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
            <div className='container h-100 w-100 d-flex justify-content-between align-items-center py-3'>
                <img src='https://bizdomfs.blob.core.windows.net/post-image/64a9e886-3ebd-4647-b199-feb1ec6f2ce5.png' />
                <div className='position-relative'>
                    <CiSearch className='position-absolute' style={{left:"10px" , top:"20px"}}/>
                <input type='text' placeholder='search ...' className='form-control p-2 ps-4 m-1 border rounded-pill ' />
                </div>
                <Nav>
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
