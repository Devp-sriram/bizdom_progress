import './Redirect.css'
import { useState, useEffect } from "react"
import { Badge } from "react-bootstrap"
import { IconContext } from 'react-icons'
import { BsBag } from 'react-icons/bs'
import { useNavigate } from "react-router-dom"
import { useCart } from '../context/context'

export default function Success() {
    const navigate = useNavigate()
    let [count, setCount] = useState(5)
    const {setCart} = useCart()
    const [orderId, setOrderId] = useState(Number(localStorage.getItem('orderId')) || 1000);

    useEffect(() => {
        if (count === 0) {
            navigate('/');
            setCart([])
            localStorage.setItem('phone','')
            localStorage.setItem('finalAmount','')
            return;
        }
        const timer = setTimeout(() => {
            setCount((prevCount) => prevCount - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [count, navigate]);

    return (
        <div className='w-100 d-flex justify-content-center align-items-start' style={{ height: '100vh' }}>
            <div className='p-2 my-5 ' style={{ minWidth: "500px" }}>
                <img src="tick.webp" alt="tick" width={200} height={200} />
                <h4 className="my-2 text-success"  style={{fontSize:'24px'}} >Redirecting.. </h4>
                <p className="my-4"  style={{fontSize:'20px'}} >You will be redirect to home screen in </p>
                <h3 className='text-brand' style={{fontSize:"86px"}}>{count}</h3>
                <p className="my-4">seconds...</p>
                <div className="w-100 load-contianer rounded-pill">
                    <span className="load-line"></span>
                </div>
            </div>
        </div>
    )
}