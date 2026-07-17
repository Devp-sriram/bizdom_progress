import { useMemo, useEffect, useState } from "react";
import { useCart } from "../context/context"
import { FaPlus, FaShoppingCart } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { TiMinus } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { Button } from "react-bootstrap";
import { IconContext } from 'react-icons'
import { useNavigate } from "react-router-dom";


export default function Cart() {
    const { cart, setCart } = useCart();
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const subtotal = useMemo(() => {
        return cart?.reduce((acc, item) => {
            acc += (item.price * (item.qty || 1))
            return acc
        }, 0)
    }, [cart])

    const tax = useMemo(() => {
        return (subtotal * 5 / 100)
    }, [subtotal])

    const orderitem = () => {
        if (cart.length == 0) {
            setError('please add items to cart')
        } else {
            navigate('/phone')
        }
    }
    const cartitem = useMemo(() => {
        return cart?.length
    }, [cart])

    // increase Quantity
    const increaseQty = (id) => {
        setCart(prev =>
            prev.map(item => item.id === id ? (item.qty ? { ...item, qty: item.qty++ } : { ...item, qty: 2 }) : item)
        )
    }

    // descrease Quantity
    const descreaseQty = (id) => {
        // checking quantity
        setCart(prev =>
            prev.map(item => item.id === id ? (item.qty > 1 ? { ...item, qty: item.qty-- } : {}) : item)
        )
        // cleaning up empty objects after relacing 1 qty items to {}
        setCart(prev => prev.filter(item => item && Object.keys(item).length > 0))
    }

    const removeItem = (id) => {
        setCart(prev =>
            prev.filter(item => item.id !== id)
        )
    }

    function reduceLength(value, max = 34) {
        if (!value || value.length <= max) return value
        return `${value.slice(0, max).trim()}...`
    }

    useEffect(() => {
        localStorage.setItem('finalAmount', (subtotal + tax).toFixed(2))
    }, [subtotal, tax])

    return (
        <div style={{ fontWeight: '600' }}>
            <header className='w-100 d-flex justify-content-between p-3 border-bottom ' style={{ height: "80px" }}>
                <div className="d-flex gap-3 align-items-center">
                    <IconContext value={{ size: '44px' , color:'var(--brand)'}}>
                        <GoArrowLeft onClick={() => navigate('/products')} />
                    </IconContext>
                    <h1 className="m-0 text-brand">SOS</h1>
                </div>

                <div className="d-flex gap-3">
                    <div className='m-2 position-relative'>
                        <IconContext value={{ size: '24px' , style: { fontWeight: "500" }}}>
                            <FaShoppingCart />
                        </IconContext>
                        {cartitem != 0 &&
                            <div className='position-absolute rounded-pill text-light' style={{ backgroundColor: "red", fontSize: '12px', width: '18px', right: '-10px', top: '-5px' }}>
                                {cartitem}
                            </div>
                        }
                    </div>
                </div>
            </header>

            <div className='w-50 mx-auto'>

                <div className="m-3">
                    <div className="d-flex gap-3">
                        <h2>My Cart</h2>
                        <p>{`(${cartitem} items)`}</p>
                    </div>
                    {cart?.map(product =>
                        <div key={product.id} className="d-flex border-bottom py-2 text-start" style={{ width: '100%', }}>
                            <img
                                src={product.images[0]}
                                className="m-auto"
                                style={{
                                    width: '50%',
                                    height: '150px',
                                    objectFit: 'contain',
                                    objectPosition: "center",
                                    backgroundColor: "white"
                                }}
                            />
                            <div className="m-2 d-flex flex-column justify-content-between w-100 ">
                                <div className="d-flex h-100 justify-content-between p-2">
                                    <div className="d-flex h-100 flex-column justify-content-evenly">
                                        <h6 className="text-wrap m-0">{reduceLength(product.title, 24)}</h6>
                                        {/* <p className="m-0">{product.category}</p> */}
                                        <p className='m-0'>₹ {product.price.toFixed(2) * (product.qty || 1)}</p>
                                    </div>

                                    <div className="d-flex gap-2 h-100 align-items-center">
                                        <div className='d-flex align-items-center rounded-3 py-1 px-2 border' style={{ height: 'fit-content' }}>
                                            <TiMinus className="p-1 border-end" onClick={() => descreaseQty(product.id)} />
                                            <p className="m-0 px-1">
                                                {product.qty ? product.qty : 1}
                                            </p>
                                            <FaPlus className="p-1 border-start" onClick={() => increaseQty(product.id)} />
                                        </div>
                                        <button onClick={() => removeItem(product.id)} className='btn rounded-1 p-0' style={{ height: 'fit-content' }}>
                                            <IconContext value={{ size: '20px' }}>
                                                <MdDelete />
                                            </IconContext>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="m-3 text-start">

                    <div className="d-flex justify-content-between mt-5">
                        <p> Sub Total </p>
                        <p> ₹ {subtotal.toFixed(2)} </p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p> Tax </p>
                        <p> ₹ {tax.toFixed(2)} </p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p> Grand Total </p>
                        <p className="text-brand"> ₹ {(subtotal + tax).toFixed(2)} </p>
                    </div>
                </div>
                {error && <p className="text-danger m-0">{error}</p>}
                <button className='bg-brand rounded-2 text-white w-100 p-2 mb-3 border-none' onClick={() => orderitem()}>
                    PROCEED TO CHECKOUT
                </button>
            </div>
        </div>
    )
}

