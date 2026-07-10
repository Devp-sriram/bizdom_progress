import { useState } from 'react'
import { Table, Modal, Form, Button, Badge } from 'react-bootstrap'
import { useProduct } from '../context/context'
import { reduceLength } from '../utils/len'
import { BiSolidEdit } from "react-icons/bi";
import { FaPlusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './TableProd'

export default function TableProd() {
    const { products, setProducts } = useProduct()
    const [edit, setEdit] = useState(0);
    const [delId, setDelId] = useState(0);
    const [show, setShow] = useState(false);
    const [showDel, setShowDel] = useState(false);

    const [product, setProduct] = useState({
        id: "",
        title: "",
        image: "",
        description: "",
        category: "",
        price: ""
    })

    const [error, setError] = useState({
        id: "",
        title: "",
        image: "",
        description: "",
        category: "",
        price: ""
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleDelClose = () => setShowDel(false);
    const handleDelShow = () => setShowDel(true);
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
            prev.filter(item => item.id != delId)
        )
        setProduct({
            id: "",
            title: "",
            image: "",
            description: "",
            category: "",
            price: ""
        })
        setDelId(0);
        handleDelClose()
    }
    const handleChange = (e) => {
        setProduct(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            setProducts(prev =>
                prev.map(item =>
                    item.id === edit ? { ...item, ...product } : item
                )
            )

            setProduct({
                id: "",
                date: "",
                name: "",
                shop: "",
                total: "",
                status: ""
            })
            handleClose()
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



    return (
        <div className='w-100 m-3'>
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

                </Modal.Body>
            </Modal>

            <Modal size="xl" show={showDel} onHide={handleDelClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure , you wanna delete this</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex gap-2'>
                    <img src={product?.image} className='w-50' style={{
                        height: "500px",
                        width: "100%",
                        objectFit: "contain",
                        objectPosition: "center",
                        backgroundColor: "#f8f9fa"
                    }} />
                    <div className='text-start'>
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <Badge>{product.category}</Badge>
                        <p>$ {product.price}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="danger" onClick={()=>handleDelete()}>Delete</Button>
                </Modal.Footer>
            </Modal>

            <Table bordered hover >
                <thead className='bg-primary text-white'>
                    <tr>
                        <th >id</th>
                        <th>image</th>
                        <th>title</th>
                        <th>category</th>
                        <th>Description</th>
                        <th>price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => {
                        return <tr key={product.id}>
                            <td>{product.id}</td>
                            <td style={{ width: "200px", height: "100px" }} ><img src={product.image} style={{
                                height: "200px",
                                width: "100%",
                                objectFit: "contain",
                                objectPosition: "center",
                                backgroundColor: "#f8f9fa"
                            }} /></td>
                            <td style={{ width: "300px" }}>{reduceLength(product.title, 24)}</td>
                            <td>{product.category}</td>
                            <td style={{ width: "500px" }}>{product.description}</td>
                            <td>{product.price}</td>
                            <td>
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
