import { useEffect, useState } from "react"
import { Badge } from "react-bootstrap"
import { IconContext } from 'react-icons'
import {BsBag} from 'react-icons/bs'
import { useNavigate } from "react-router-dom";

export default function Success() {
    const navigate = useNavigate()
    const [orderId, setOrderId] = useState(Number(localStorage.getItem('orderId')) || 1000);
    const [finalAmount , setFinalAmount] = useState('')

    useEffect(()=>{
        setFinalAmount(localStorage.getItem('finalAmount') || '')
    },[])

    useEffect(()=>{
        setTimeout(()=>{
            navigate('/redirect')
        },2000)
    },[])

    return (
        <div className='w-100 d-flex justify-content-center align-items-start' style={{ height: '100vh' }}>
            <div className='w-100 p-2 my-5 ' style={{ maxWidth: "500px" }}>
                <img src="tick.webp" alt="tick" width={200} height={200} />
                <h4 className="my-2 text-success" style={{fontSize:'24px'}}>Payment Successful</h4>
                <p className="my-4" style={{fontSize:'20px'}}>Thank you for shopping with SOS <br/>
                    Your Order has been places Successfully</p>
                <h3>order ID</h3>
                <span className="text-brand bg-light border rounded w-100 p-1 px-2" style={{ fontSize: '20px' }}>SOS{orderId}</span>
                {finalAmount && <p className="my-2">You paid ₹ {finalAmount}</p>}
                <div className="position-relative my-3 mx-auto" style={{width:'fit-content'}}>
                    <IconContext value={{ size: '120px',  color:'var(--brand)'}}>
                        <div className='d-flex flex-column align-items-center gap-5'>
                            <BsBag />
                        </div>
                    </IconContext>
                    <img src="tick.webp" alt="tick" className="position-absolute end-0 bottom-0" width={40} height={40} style={{}} />
                </div>
            </div>
        </div>
    )
}