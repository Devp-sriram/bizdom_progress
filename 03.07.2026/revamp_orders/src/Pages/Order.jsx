import { useState, useEffect } from "react"
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'

export default function Order() {
    const navigate = useNavigate()
    const [order, setOrder] = useState({
        id: "",
        date: "",
        name: "",
        shop: "",
        total: "",
        status: ""
    })
    const [count, setCount] = useState(Number(localStorage.getItem('count')))
    const [orders, setOrders] = useState(JSON.parse(localStorage.getItem('orders')) || [])

    const [error, setError] = useState({
        date: "",
        name: "",
        shop: "",
        total: "",
        status: ""
    })
    const handleChange = (e) => {
        setOrder(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('hitting')
        if (validate()) {
            setOrders(prev => {
                console.log(prev)
                return [...prev , order]
            })
            setCount(count + 1);

            setOrder({
                id: "",
                date: "",
                name: "",
                shop: "",
                total: "",
                status: ""
            })
            // navigate('./users')
        }
    }
    const validate = () => {
        const error = {};

        const isEmpty = (value) => !value || value.trim() === "";

        const isTooShort = (value, minLength = 2) => value && value.trim().length < minLength;

        if (isEmpty(order.name)) {
            error.name = "Name required";
        } else if (isTooShort(order.name)) {
            error.name = "Name must be at least 2 characters";
        }
        if (isEmpty(order.total)) {
            error.total = "Total required";
        }

        if (isEmpty(order.date)) {
            error.date = "Phone required";

        }
        if (isEmpty(order.shop)) {
            error.shop = "Website required";
        }
        setError(error);
        return Object.keys(error).length === 0;
    }

    useEffect(() => {
        if (orders && orders.length > 0) {
            console.log(orders)
            localStorage.setItem('orders', JSON.stringify(orders));
        }else{
            setOrders(JSON.parse(localStorage.getItem('orders')) || [])
        }
    }, [orders]);

    useEffect(() => {
        (count != 0) && localStorage.setItem('count', count.toString());
    }, [count]);

    useEffect(() => {
        setOrder(prev => ({ ...prev, id: (count + 1) }))
    }, [orders])

    useEffect(()=>{
        console.log('mount')
        return ()=>console.log('unmount')
    },[])

    return (
        <div className='w-100 p-4 page'>
            <form className="form p-3 m-2 border rounded-5 text-start" onSubmit={(e) => handleSubmit(e)}>
                <h3 className="text-start mb-4"><FaPlusCircle />  Add Order</h3>
                <div className="row w-100 mb-3">
                    <div className="form-group col-12 col-md-6">
                        <label className="p-2">Order Id</label>
                        <input name='id' type="number" className="form-control rounded-pill w-100 p-2" value={order.id} onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="form-group col-12 col-md-6">
                        <label className="p-2">Order Date</label>
                        <input type="date" name="date" className="form-control rounded-pill w-100 p-2" value={order.date} onChange={(e) => handleChange(e)} />
                        {error.date && <p className="text-danger">{error.date}</p>}
                    </div>
                </div>
                <div className="row w-100 mb-3">
                    <div className="form-group col-12 col-md-6">
                        <label className="p-2">Customer name</label>
                        <input type="text" name='name' className="form-control rounded-pill w-100 p-2" value={order.name} onChange={(e) => handleChange(e)} />
                        {error.name && <p className="text-danger">{error.name}</p>}
                    </div>
                    <div className="form-group col-12 col-md-6">
                        <label className="p-2">Shop</label>
                        <select name='shop' className="form-select rounded-pill w-100 p-2" value={order.shop} onChange={(e) => handleChange(e)}>
                            <option value="">Select Shop</option>
                            <option>Karappakam</option>
                            <option>Shozhilganallur</option>
                            <option>pammal</option>
                        </select>
                        {error.shop && <p className="text-danger">{error.shop}</p>}
                    </div>
                </div>
                <div className="row w-100 mb-3">
                    <div className="form-group col-12 col-md-6">
                        <label className="p-2">Total</label>
                        <input type="text" name="total" className="form-control rounded-pill w-100 p-2" value={order.total} onChange={(e) => handleChange(e)} />
                        {error.total && <p className="text-danger">{error.total}</p>}
                    </div>
                    <div className="form-group col-12 col-md-6">
                        <label className="p-2">status</label>
                        <select name='status' className="form-select rounded-pill w-100 p-2" value={order.status} onChange={(e) => handleChange(e)}>
                            <option>pending</option>
                            <option>successful</option>
                            <option>rejected</option>
                        </select>
                        {error.status && <p className="text-danger">{error.status}</p>}
                    </div>
                </div>
                <div>
                    <button className="btn border rounded-pill px-5">Reset</button>
                    <button className="btn btn-brand rounded-pill px-5" type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}
