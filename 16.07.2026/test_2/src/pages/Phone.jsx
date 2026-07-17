import { useState } from 'react'
import { IconContext } from 'react-icons'
import { GoArrowLeft } from "react-icons/go";
import { FaLock } from "react-icons/fa";
import { TbDeviceMobileMessage } from "react-icons/tb";
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function Phone() {
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const [orderId, setOrderId] = useState(Number(localStorage.getItem('orderId')) || 1000)

    const handleSubmit = () => {
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phone) {
            setError('Phone Number Required')
        } else if (phone.length < 10) {
            setError('Phone Number needs to be 10 number')
        } else if (!phoneRegex.test(phone)) {
            console.log('error hittin')
            setError('Not a Valid Number')
        } else {
            localStorage.setItem('phone', phone)
            localStorage.setItem('orderId', orderId + 1)
            navigate('/success')
        }

    }
    return (
        <>
            <header className='w-100 d-flex justify-content-between p-3 border-bottom ' style={{ height: "80px" }}>
                <div className="d-flex gap-3 align-items-center">
                    <IconContext value={{ size: '44px', color: 'var(--brand)' }}>
                        <GoArrowLeft onClick={() => navigate('/cart')} />
                    </IconContext>
                    <h1 className="m-0 text-brand">SOS</h1>
                </div>

                <div className="d-flex gap-3">
                </div>
            </header>
            <div className='w-100 d-flex justify-content-center align-items-start' style={{ height: '100vh' }}>
                <div className='w-100 p-2 my-5' style={{ maxWidth: '500px' }}>
                    <h4 className='text-start m-2'>Enter Mobile Number</h4>
                    <div className='my-3'>
                        <IconContext value={{ size: '220px', color: 'var(--brand)' }}>
                            <div className='d-flex flex-column align-items-center gap-5'>
                                <TbDeviceMobileMessage />
                            </div>
                        </IconContext>
                        <p>Enter Mobile number to continue</p>
                        <input type='number' value={phone} onChange={(e) => setPhone(e.target.value)} className='form-control' />
                        {error && <p className='text-danger m-0'>{error}</p>}
                        <button className='bg-brand rounded-2 text-white p-2 mb-3 border-none mt-3 w-100' onClick={() => handleSubmit()}>
                            Submit
                        </button>
                        <p style={{ fontSize: '14px' }}><FaLock /> we dont't share your imformation with any third party</p>
                    </div>
                </div>
            </div>
        </>
    )
}
