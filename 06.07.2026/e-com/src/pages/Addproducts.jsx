import { useState, useEffect } from "react"
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'

import { useProduct } from '../context/context'

export default function Product() {
    const navigate = useNavigate();
    const { products, setProducts } = useProduct()
    const [count, setCount] = useState(Number(JSON.parse(localStorage.getItem('count'))) || 30);
    const [product, setProduct] = useState({
        id: "",
        title: "",
        image: "",
        description: "",
        category: "",
        price: 0
    })

    const [error, setError] = useState({
        id: "",
        title: "",
        image: "",
        description: "",
        category: "",
        price: ""
    })
    const handleChange = (e) => {
        setProduct(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            setProducts(prev => {
                return [product, ...prev]
            })
            setCount(count + 1);

            setProduct({
                id: "",
                title: "",
                image: "",
                description: "",
                category: "",
                price: 0
            })
            navigate('/admin')
        }
    }
    const validate = () => {
        const error = {};

        const isEmpty = (value) => !value || value.trim() === "";

        const isTooShort = (value, minLength = 2) => value && value.trim().length < minLength;

        if (isEmpty(product.title)) {
            error.title = "title required";
        } else if (isTooShort(product.title)) {
            error.title = "Name must be at least 2 characters";
        }
        if (isEmpty(product.image)) {
            error.image = "image url required";
        }

        if (isEmpty(product.description)) {
            error.description = "description required";

        }
        if (isEmpty(product.category)) {
            error.category = "Category required";
        }
        setError(error);
        return Object.keys(error).length === 0;
    }

    useEffect(() => {
        console.log(count);
        (count != 30) && localStorage.setItem('count', count.toString())
    }, [count]);

    useEffect(() => {
        setProduct(prev => ({ ...prev, id: (count + 1) }))
    }, [])

    useEffect(() => {
        console.log('mount')
        return () => console.log('unmount')
    }, [])

    return (
        <div className='w-100 p-4 page'>
            <Form className=" p-3 m-2 border rounded-5 text-start" onSubmit={(e) => handleSubmit(e)}>
                <h3 className="text-start mb-4"><FaPlusCircle />  Add Product</h3>
                <div className="row w-100 mb-3">
                    <div className="form-group col-12 col-md-6">
                        <label className="p-2">Product Id</label>
                        <input name='id' type="number" className="form-control rounded-pill w-100 p-2" value={product.id} onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="form-group col-12 col-md-6">
                        <label className="p-2">Product title</label>
                        <input type="title" name="title" className="form-control rounded-pill w-100 p-2" value={product.title} onChange={(e) => handleChange(e)} />
                        {error.title && <p className="text-danger">{error.title}</p>}
                    </div>
                </div>
                <div className="row w-100 mb-3">
                    <div className="form-group col-12 col-md-6">
                        <label className="p-2">Product Image</label>
                        <input type="text" name='image' className="form-control rounded-pill w-100 p-2" value={product.image} onChange={(e) => handleChange(e)} />
                        {error.image && <p className="text-danger">{error.image}</p>}
                    </div>
                    <div className="form-group col-12 col-md-6">
                        <label className="p-2">Product category</label>
                        <select name='category' className="form-select rounded-pill w-100 p-2" value={product.category} onChange={(e) => handleChange(e)}>
                            <option value="">Select Category</option>
                            <option>Mens Clothes</option>
                            <option>Womens Fashions</option>
                            <option>Electronics</option>
                        </select>
                        {error.category && <p className="text-danger">{error.category}</p>}
                    </div>
                </div>
                <div className="row w-100 mb-3">
                    <div className="form-group col-12 col-md-6">
                        <label className="p-2">Description</label>
                        <input type="text" name="description" className="form-control rounded-pill w-100 p-2" value={product.description} onChange={(e) => handleChange(e)} />
                        {error.description && <p className="text-danger">{error.description}</p>}
                    </div>
                    <div className="form-group col-12 col-md-6">
                        <label className="p-2">Price</label>
                        <input type="number" name='price' className="form-control rounded-pill w-100 p-2" value={product.price} onChange={(e) => handleChange(e)} />
                        {error.price && <p className="text-danger">{error.impriceage}</p>}
                    </div>
                </div>
                <div>
                    <button className="btn border rounded-pill px-5">Reset</button>
                    <button className="btn btn-primary rounded-pill px-5" type="submit">Save</button>
                </div>
            </Form>
        </div>
    )
}
