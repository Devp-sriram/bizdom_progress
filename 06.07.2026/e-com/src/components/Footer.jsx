import React from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";


function Footer() {
    return (
        <div className='brand-muted m-3'>
            <div className='d-flex flex-column flex-md-row w-100 justify-content-evenly'>
                <div>
                    <h3 className='text-black'>KNOW IT ALL FIRST!</h3>
                    <p>Same Day Delivery is Available Across Chennai.</p>
                </div>
                <div className='vr d-none d-md-block'></div>
                <div>
                    <input type="text" placeholder='Enter your Email' className='bg-light p-2 border-none me-1' />
                    <button className='brand-btn p-2'>Subscrile</button>
                </div>
            </div>
            <hr className='text-danger' />
            <div className='d-flex flex-column flex-md-row justify-content-evenly'>
                <div className='text-start'>
                    <p>
                        Order Fresh Cream Cake online and get them <br />Delivered Free. Serving in Bangalore,<br /> Chennai, Tiruvallur, Kancheepuram,<br /> Coimbatore, Madurai and Hyderabad and so<br /> on....
                    </p>
                </div>
                <div className='text-start'>
                    <h3 className='text-black'>Quick Links</h3>
                    <div className='row'>

                        <ul className='list-unstyled col-6'>
                            <li>Home</li>
                            <li> FAQ</li>
                            <li>Terms & Conditions</li>
                            <li>Refund Policy</li>
                            <li>Gallery</li>
                        </ul>
                        <ul className='list-unstyled col-6'>
                            <li> About</li>
                            <li> Store List</li>
                            <li> Privacy Policy</li>
                            <li> Delivery Policy</li>
                        </ul>
                    </div>
                </div>
                <div className='text-start'>
                    <h3 className='text-black'>store information</h3>
                    <div className='d-flex gap-2'>
                       <IoLocationOutline  className='m-1'/> <p>FB CAKES PRODUCTIONS,<br /> NO:22,SUDHARSAN NAGAR,<br />THIRUMULLAIVOYAL,<br />CHENNAI-600062,<br />TAMILNADU</p>
                    </div>
                     <div className='d-flex gap-2'>
                        <FaPhoneAlt className='m-1'/> <p>9003432888</p>
                    </div>
                     <div className='d-flex gap-2'>
                        <CiMail className='m-1' /> <p>Email Us:Support@fbcakes.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
