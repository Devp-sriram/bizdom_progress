import { Table, Modal, Form, Button, Badge } from 'react-bootstrap'
import { BiSolidEdit } from "react-icons/bi";
import { FaPlusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";

import { useState, useEffect } from 'react'
import { useProduct } from '../context/context'
import { useNavigate } from 'react-router-dom';

import { reduceLength } from '../utils/len'

export default function TableProd() {

    const navigate = useNavigate()
    const { products, setProducts } = useProduct()
    const [category, setCategory] = useState([])

    const [showId, setShowId] = useState(0)
    const [edit, setEdit] = useState(0);
    const [delId, setDelId] = useState(0);

    const [show, setShow] = useState(false);
    const [showCreate, setShowCreate] = useState(0)
    const [showDel, setShowDel] = useState(false);
    const [showOpen, setShowOpen] = useState(false);


    const [count, setCount] = useState(Number(JSON.parse(localStorage.getItem('count'))) || 30);
    const [newProduct, setNewProduct] = useState({
        id: "",
        images: [],
        title: "",
        brand: "",
        category: "",
        stock: "",
        price: ""
    })


    const [product, setProduct] = useState({
        id: "",
        images: [],
        title: "",
        brand: "",
        category: "",
        stock: "",
        price: ""
    })

    const [error, setError] = useState({
        id: "",
        images: [],
        title: "",
        brand: "",
        category: "",
        stock: "",
        price: ""
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCreateClose = () => setShowCreate(false);
    const handleCreateOpen = () => setShowCreate(true);

    const handleDelClose = () => setShowDel(false);
    const handleDelShow = () => setShowDel(true);

    const handleOpenClose = () => {
        setShowOpen(false);
        setProduct({
            id: "",
            images: [],
            title: "",
            brand: "",
            category: "",
            stock: "",
            price: ""
        })
    }
    const handleOpenShow = () => setShowOpen(true);

    const openShowModel = (id) => {
        setShowId(id)
        handleOpenShow()
        const product = products.find(product => product.id === id);
        setProduct(product)
    }
    const openEditModel = (id) => {
        setEdit(id);
        handleShow();
        const product = products.find(product => product.id === id);
        setProduct(product)
    }

    const openDeleteModel = (id) => {
        setDelId(id);
        handleDelShow()
        const product = products.find(product => product.id === id);
        setProduct(product)
    }

    const handleDelete = () => {
        console.log(delId)
        setProducts(prev =>
            prev.filter(item => Number(item.id) != Number(delId))
        )

        setProduct({
            id: "",
            images: [],
            title: "",
            brand: "",
            category: "",
            stock: "",
            price: ""
        })
        setDelId(0);
        handleDelClose()
    }
    const handleChange = (e) => {
        setProduct(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleNewChange = (e) => {
        const { name, value } = e.target;

        if (name === 'images') {
            setNewProduct(prev => {
                return ({
                    ...prev,
                    images: [value]
                })
            }
            );
        } else {
            setNewProduct(prev => ({ ...prev, [name]: value }));
        }
    }
    const handleNewSubmit = (e) => {
        e.preventDefault()
        if (newValidate()) {
            console.log(newProduct)
            setProducts(prev => {
                return [newProduct, ...prev]
            })
            setCount(count + 1);
            setNewProduct({
                id: "",
                images: [],
                title: "",
                brand: "",
                category: "",
                stock: "",
                price: ""
            })
            handleCreateClose()
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(edit)
        console.log(product)
        if (validate()) {
            setProducts(prev =>
                prev.map(item =>
                    item.id === edit ? { ...item, ...product } : item
                )
            )

            setProduct({
                id: "",
                images: [],
                title: "",
                brand: "",
                category: "",
                stock: "",
                price: ""
            })
            handleClose()
        }
    }
    const newValidate = () => {
        const error = {};
        const isEmpty = (value) => !value || value.trim() === "";
        const isTooShort = (value, minLength = 2) => value && value.trim().length < minLength;

        if (isEmpty(newProduct.title)) {
            error.title = "title required";
        } else if (isTooShort(newProduct.title)) {
            error.title = "Name must be at least 2 characters";
        }
        if (isEmpty(newProduct.images[0])) {
            error.image = "image url required";
        }

        if (isEmpty(newProduct.brand)) {
            error.brand = "brand required";

        }
        if (isEmpty(newProduct.stock)) {
            error.stock = "stock required";

        }
        if (isEmpty(newProduct.price)) {
            error.price = "price required";

        }
        if (isEmpty(newProduct.category)) {
            error.category = "Category required";
        }
        setError(error);
        return Object.keys(error).length === 0;
    }

    const validate = () => {
        const error = {};
        const isEmpty = (value) => !value
        const isTooShort = (value, minLength = 2) => value && value.trim().length < minLength;

        if (isEmpty(product.title)) {
            error.title = "title required";
        } else if (isTooShort(product.title)) {
            error.title = "title required";
        }
        if (isEmpty(product.images[0])) {
            error.image = "image url required";
        }

        if (isEmpty(product.brand)) {
            error.brand = "brand required";

        }
        if (isEmpty(product.stock)) {
            error.stock = "stock required";

        }
        if (isEmpty(product.price)) {
            error.price = "price required";

        }
        if (isEmpty(product.category)) {
            error.category = "Category required";
        }
        setError(error);
        return Object.keys(error).length === 0;
    }
    useEffect(() => {
        fetch('https://dummyjson.com/products/category-list')
            .then(res => res.json())
            .then(res => setCategory(res));
    }, [])

    useEffect(() => {
        (count != 30) && localStorage.setItem('count', count.toString())
    }, [count]);

    useEffect(() => {
        setNewProduct(prev => ({ ...prev, id: (count + 1) }))
    }, [])

    useEffect(() => {
        console.log(newProduct)
    }, [newProduct])

    return (
        <div className='w-100 m-3 text-start'>
            <Button onClick={() => handleCreateOpen()} className='m-2'> Add New Product</Button>
            {/* show model */}
            <Modal size="xl" show={showOpen} onHide={handleOpenClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{product.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex gap-2'>
                    <div className='w-50 d-flex flex-wrap'>
                        {product?.images?.map(item => {
                            return < img src={item} className='w-50 border'
                                style={{
                                    height: "200px",
                                    width: "100%",
                                    objectFit: "contain",
                                    objectPosition: "center",
                                    backgroundColor: "#f8f9fa"
                                }}
                            />
                        })}
                    </div>
                    <div className='text-start'>
                        <h3>{product.title}</h3>
                        <p>Brand : {product.brand}</p>
                        <Badge>{product.category}</Badge>
                        <p>Left : {product.stock}</p>
                        <p>$ {product.price}</p>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Create model */}
            <Modal size="xl" show={showCreate} onHide={handleCreateClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="text-start" onSubmit={(e) => handleNewSubmit(e)}>
                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Product Id</label>
                                <input name='id' type="number" className="form-control rounded-pill w-100 p-2" value={newProduct.id} onChange={(e) => handleNewChange(e)} />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Product title</label>
                                <input type="title" name="title" className="form-control rounded-pill w-100 p-2" value={newProduct.title} onChange={(e) => handleNewChange(e)} />
                                {error.title && <p className="text-danger">{error.title}</p>}
                            </div>
                        </div>
                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Product Image</label>
                                <input type="text" name='images' className="form-control rounded-pill w-100 p-2" value={newProduct.images} onChange={(e) => handleNewChange(e)} />
                                {error.image && <p className="text-danger">{error.image}</p>}
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Product Brand</label>
                                <select name='category' className="form-select rounded-pill w-100 p-2" value={newProduct.category} onChange={(e) => handleNewChange(e)}>
                                    <option value="">Select Category</option>
                                    {category.map(cat => {
                                        return <option value={cat}>{cat}</option>
                                    })}
                                </select>
                                {error.category && <p className="text-danger">{error.category}</p>}
                            </div>
                        </div>
                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Brand</label>
                                <input type="text" name="brand" className="form-control rounded-pill w-100 p-2" value={newProduct.brand} onChange={(e) => handleNewChange(e)} />
                                {error.brand && <p className="text-danger">{error.brand}</p>}
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Price</label>
                                <input type="number" name='price' className="form-control rounded-pill w-100 p-2" value={newProduct.price} onChange={(e) => handleNewChange(e)} />
                                {error.price && <p className="text-danger">{error.price}</p>}
                            </div>
                        </div>
                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Stocks</label>
                                <input type="number" name='stock' className="form-control rounded-pill w-100 p-2" value={newProduct.stock} onChange={(e) => handleNewChange(e)} />
                                {error.stock && <p className="text-danger">{error.stock}</p>}
                            </div>
                        </div>
                        <div>
                            <button className="btn border rounded-pill px-5">Reset</button>
                            <button className="btn btn-primary rounded-pill px-5" type="submit">Save</button>
                        </div>
                    </Form>

                </Modal.Body>
            </Modal>

            {/* Edit model */}
            <Modal size="xl" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="text-start" onSubmit={(e) => handleSubmit(e)}>
                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Product Id</label>
                                <input name='id' type="number" className="form-control rounded-pill w-100 p-2" value={product.id} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Product title</label>
                                <input type="text" name="title" className="form-control rounded-pill w-100 p-2" value={product.title} onChange={(e) => handleChange(e)} />
                                {error.title && <p className="text-danger">{error.title}</p>}
                            </div>
                        </div>
                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Product Image</label>
                                <input type="text" name='images' className="form-control rounded-pill w-100 p-2" value={product.images[0]} onChange={(e) => handleChange(e)} />
                                {error.image && <p className="text-danger">{error.image}</p>}
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Product Brand</label>
                                <select name='category' className="form-select rounded-pill w-100 p-2" value={product.category} onChange={(e) => handleChange(e)}>
                                    <option value="">Select Category</option>
                                    {category.map(cat => {
                                        return <option value={cat}>{cat}</option>
                                    })}
                                </select>
                                {error.category && <p className="text-danger">{error.category}</p>}
                            </div>
                        </div>
                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Brand</label>
                                <input type="text" name="brand" className="form-control rounded-pill w-100 p-2" value={product.brand} onChange={(e) => handleChange(e)} />
                                {error.brand && <p className="text-danger">{error.brand}</p>}
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Price</label>
                                <input type="number" name='price' className="form-control rounded-pill w-100 p-2" value={product.price} onChange={(e) => handleChange(e)} />
                                {error.price && <p className="text-danger">{error.price}</p>}
                            </div>
                        </div>
                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Stocks</label>
                                <input type="number" name='stock' className="form-control rounded-pill w-100 p-2" value={product.stock} onChange={(e) => handleChange(e)} />
                                {error.stock && <p className="text-danger">{error.stock}</p>}
                            </div>
                        </div>
                        <div>
                            <button className="btn border rounded-pill px-5">Reset</button>
                            <button className="btn btn-primary rounded-pill px-5" type="submit">Save</button>
                        </div>
                    </Form>

                </Modal.Body>
            </Modal>
            {/* delete model */}
            <Modal size="xl" show={showDel} onHide={handleDelClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure , you wanna delete this</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex gap-2'>
                    <img src={product?.images[0]} className='w-50' style={{
                        height: "500px",
                        width: "100%",
                        objectFit: "contain",
                        objectPosition: "center",
                        backgroundColor: "#f8f9fa"
                    }} />
                    <div className='text-start'>
                        <h3>{product.title}</h3>
                        <p>Brand : {product.brand}</p>
                        <Badge>{product.category}</Badge>
                        <p>Left : {product.stock}</p>
                        <p>$ {product.price}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="danger" onClick={() => handleDelete()}>Delete</Button>
                </Modal.Footer>
            </Modal>

            <Table bordered hover >
                <thead className='bg-primary text-white'>
                    <tr>
                        {/* {id,images,title,brand,category,stock,price} */}
                        <th >id</th>
                        <th>images</th>
                        <th>title</th>
                        {/* <th>category</th>
                        <th>brand</th> */}
                        <th>stock</th>
                        <th>price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => {
                        return <tr key={product.id}>
                            <td>{product.id}</td>
                            <td style={{ width: "200px", height: "100px" }} ><img src={product?.images[0]} style={{
                                height: "200px",
                                width: "100%",
                                objectFit: "contain",
                                objectPosition: "center",
                                backgroundColor: "#f8f9fa"
                            }} /></td>
                            <td style={{ width: "300px" }}>{reduceLength(product.title, 34)}</td>
                            {/* <td>{product.category}</td>
                            <td style={{ width: "500px" }}>{product.brand}</td> */}
                            <td>{product.stock}</td>
                            <td>$ {product.price}</td>
                            <td>
                                <Button className='bg-success text-white m-2' onClick={() => openShowModel(product.id)}><FaEye /></Button>
                                <Button className='bg-warning text-white m-2' onClick={() => openEditModel(product.id)}><BiSolidEdit /></Button>
                                <Button className='btn-danger m-2' onClick={() => openDeleteModel(product.id)}><MdDelete /></Button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </div>
    )
}