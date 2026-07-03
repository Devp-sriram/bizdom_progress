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
    const [showRec, setShowRec] = useState(false);
    const [cakes, setCakes] = useState([{
        id: 1,
        name: 'black current',
        url: 'https://bizdomfs.blob.core.windows.net/post-image/2b1d1d25-bc0f-467d-a4b7-77501c2b3132.webp'
    }, {
        id: 2,
        name: 'black current Blast',
        url: 'https://bizdomfs.blob.core.windows.net/post-image/5ee74136-75a8-4eef-a2a5-0809cd1ec819.webp'
    }, {
        id: 3,
        name: 'black current Delight',
        url: 'https://bizdomfs.blob.core.windows.net/post-image/7d2d55ca-9072-4687-a84c-377b8fbcbf97.webp'
    }, {
        id: 4,
        name: 'black Forest',
        url: 'https://bizdomfs.blob.core.windows.net/post-image/a5b060e1-222a-48d9-bbc6-ea99267f0205.webp'
    }, {
        id: 3,
        name: 'black Forest Blast',
        url: 'https://bizdomfs.blob.core.windows.net/post-image/8bc503b5-c23e-4b3f-b583-38c8eed50a6c.webp'
    }
    ]);

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
                    <input type='text' placeholder='search ...' onFocus={() => setShowRec(true)} onBlur={() => setShowRec(false)} className='form-control p-2 ps-4 m-1 border rounded-pill ' />
                    {showRec && <div className='position-absolute zed bg-white rounded w-100 p-2'>
                        {cakes.map(cake=>{
                           return  <div className='d-flex gap-2 my-1 zedh'>
                            <img src={cake.url} width={25} height={25} className='p-1'/>
                            <p className='m-0 '>{cake.name}</p>
                           </div>
                        })}
                    </div>}
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
