import React, { use } from 'react'
import { IconContext } from 'react-icons'
import { BsBag } from "react-icons/bs";
import { MdOutlineTouchApp } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate()

    function redirect() {
        navigate('/products')
    }
    return (
        <div onClick={() => redirect()} className='w-100 d-flex justify-content-center align-items-center text-white' style={{ backgroundColor: "var(--brand)", height: '100vh' }}>
            <div className='my-auto'>
                <h1 style={{ fontSize: '180px', fontWeight: '700' }}>SOS</h1>
                <p className='mb-5' style={{ fontSize: '40px', fontWeight: '600' }}>Shop Our Selection</p>
                <IconContext value={{ size: '120px' }}>
                    <div className='d-flex flex-column align-items-center gap-5'>
                        <BsBag />
                        <MdOutlineTouchApp />
                    </div>
                </IconContext>

            </div>
        </div>
    )
}
