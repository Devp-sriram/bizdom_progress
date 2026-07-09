import { BiSolidEdit } from "react-icons/bi";
import { FaPlusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { GoStack } from "react-icons/go";


import { Table, Modal, Form, Button, Badge, Pagination } from 'react-bootstrap'

import { useState, useEffect } from 'react'
import { useUser } from '../context/context'

import { toast } from 'react-toastify'

export default function TableProd() {
    const { users, setUsers } = useUser()

    const [count, setCount] = useState(Number(JSON.parse(localStorage.getItem('count'))) || 30);
    const [showId, setShowId] = useState(0)
    const [edit, setEdit] = useState(0);
    const [delId, setDelId] = useState(0);

    const [showCreate, setShowCreate] = useState(0)
    const [show, setShow] = useState(false);
    const [showDel, setShowDel] = useState(false);
    const [showOpen, setShowOpen] = useState(false);

    const [active, setActive] = useState(0)
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(5);

    const [user, setUser] = useState({
        id: "",
        firstName: '',
        lastName: "",
        email: "",
        phone: "",
        address: {},
    })

    const [error, setError] = useState({
        id: "",
        firstName: '',
        lastName: "",
        email: "",
        phone: "",
        address: "",
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelClose = () => setShowDel(false);
    const handleDelShow = () => setShowDel(true);

    const handleCreateClose = () => setShowCreate(false);
    const handleCreateOpen = () => setShowCreate(true);

    const handleOpenClose = () => {
        setShowOpen(false);
        setUser({
            id: "",
            firstName: '',
            lastName: "",
            email: "",
            phone: "",
            address: {},
        })
    }
    const handleOpenShow = () => setShowOpen(true);

    const openShowModel = (id) => {
        setShowId(id)
        handleOpenShow()
        const user = users.find(user => user.id === id);
        setUser(user)
    }
    const openEditModel = (id) => {
        setEdit(id);
        handleShow();
        const user = users.find(user => user.id === id);
        setUser(user)
    }

    const openDeleteModel = (id) => {
        setDelId(id);
        handleDelShow()
        const user = users.find(user => user.id === id);
        setUser(user)
    }

    const handleDelete = () => {
        console.log(delId)
        setUsers(prev =>
            prev.filter(item => item.id != delId)
        )

        setUser({
            id: "",
            firstName: '',
            lastName: "",
            email: "",
            phone: "",
            address: {},
        })
        setDelId(0);
        handleDelClose();
        toast.success('User deleted successfully');
    }
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'address') {
            setUser(prev => ({
                ...prev,
                address: {
                    ...prev[name],
                    city: value,
                }
            }));
        } else {
            setUser(prev => ({ ...prev, [name]: value }));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            setUsers(prev =>
                prev.map(item =>
                    item.id === edit ? { ...item, ...user } : item
                )
            )

            setUser({
                id: "",
                firstName: '',
                lastName: "",
                email: "",
                phone: "",
                address: {},
            })
            handleClose()
            toast.success('User updated successfully');
        }
    }

    const handleNewSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            setUsers(prev => {
                return [user, ...prev]
            })
            setCount(count + 1);
            console.log(user)
            setUser({
                id: "",
                images: [],
                title: "",
                brand: "",
                category: "",
                stock: "",
                price: ""
            })
            handleCreateClose()
            toast.success('User created successfully');
        }
    }

    const validate = () => {
        const error = {};

        const isEmpty = (value) => !value || value.trim() === "";

        const isTooShort = (value, minLength = 2) => value && value.trim().length < minLength;

        if (isEmpty(user.email)) {
            error.email = "email required";
        } else if (isTooShort(user.email)) {
            error.email = "Name must be at least 2 characters";
        }
        if (isEmpty(user.firstName)) {
            error.firstName = "firstName required";
        }

        if (isEmpty(user.lastName)) {
            error.lastName = "lastName required";

        }
        if (isEmpty(user.phone)) {
            error.phone = "phone required";
        }
        if (isEmpty(user.address.city)) {
            error.address = "address required";
        }
        setError(error);
        return Object.keys(error).length === 0;
    }
    useEffect(() => {
        (count != 30) && localStorage.setItem('count', count.toString())
    }, [count]);

    useEffect(() => {
        setUser(prev => ({ ...prev, id: (count + 1) }))
    }, [])
    // useEffect(()=>{
    //     console.log(user)
    // },[user])

    return (
        <div className='w-100 m-3 text-start'>
            <Button onClick={() => handleCreateOpen()} className='m-2 d-flex gap-2'><FaPlusCircle className="m-1" /> Add New User</Button>

            {/* Open model */}
            <Modal show={showOpen} onHide={handleOpenClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{user.firstName} {user.lastName}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex gap-2'>
                    <div className='text-start'>
                        <h3>{user.firstName} {user.lastName}</h3>
                        <p>Email : {user.email}</p>
                        <Badge>{user.phone}</Badge>
                        <p>City : {user?.address?.city}</p>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Create model */}
            <Modal size="xl" show={showCreate} onHide={() => handleCreateClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Create User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*//id,firstName,lastName,email,phone,address */}
                    <Form className="text-start" onSubmit={(e) => handleNewSubmit(e)}>
                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">User Id</label>
                                <input name='id' type="number" className="form-control rounded-pill w-100 p-2" value={user.id} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">User Email</label>
                                <input type="text" name="email" className="form-control rounded-pill w-100 p-2" value={user.email} onChange={(e) => handleChange(e)} />
                                {error.email && <p className="text-danger">{error.email}</p>}
                            </div>
                        </div>

                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">FirstName</label>
                                <input type="text" name='firstName' className="form-control rounded-pill w-100 p-2" value={user.firstName} onChange={(e) => handleChange(e)} />
                                {error.firstName && <p className="text-danger">{error.firstName}</p>}
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">LastName</label>
                                <input type="text" name='lastName' className="form-control rounded-pill w-100 p-2" value={user.lastName} onChange={(e) => handleChange(e)} />
                                {error.lastName && <p className="text-danger">{error.lastName}</p>}
                            </div>
                        </div>

                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">phone</label>
                                <input type="text" name="phone" className="form-control rounded-pill w-100 p-2" value={user.phone} onChange={(e) => handleChange(e)} />
                                {error.phone && <p className="text-danger">{error.phone}</p>}
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Address</label>
                                <input type="text" name='address' className="form-control rounded-pill w-100 p-2" value={user?.address?.city} onChange={(e) => handleChange(e)} />
                                {error.address && <p className="text-danger">{error.address}</p>}
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
            <Modal size="xl" show={show} onHide={() => handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*//id,firstName,lastName,email,phone,address */}
                    <Form className="text-start" onSubmit={(e) => handleSubmit(e)}>
                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">User Id</label>
                                <input name='id' type="number" className="form-control rounded-pill w-100 p-2" value={user.id} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">User Email</label>
                                <input type="text" name="email" className="form-control rounded-pill w-100 p-2" value={user.email} onChange={(e) => handleChange(e)} />
                                {error.email && <p className="text-danger">{error.email}</p>}
                            </div>
                        </div>

                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">FirstName</label>
                                <input type="text" name='firstName' className="form-control rounded-pill w-100 p-2" value={user.firstName} onChange={(e) => handleChange(e)} />
                                {error.firstName && <p className="text-danger">{error.firstName}</p>}
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">LastName</label>
                                <input type="text" name='lastName' className="form-control rounded-pill w-100 p-2" value={user.lastName} onChange={(e) => handleChange(e)} />
                                {error.lastName && <p className="text-danger">{error.lastName}</p>}
                            </div>
                        </div>

                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">phone</label>
                                <input type="text" name="phone" className="form-control rounded-pill w-100 p-2" value={user.phone} onChange={(e) => handleChange(e)} />
                                {error.phone && <p className="text-danger">{error.phone}</p>}
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Address</label>
                                <input type="text" name='address' className="form-control rounded-pill w-100 p-2" value={user?.address?.city} onChange={(e) => handleChange(e)} />
                                {error.address && <p className="text-danger">{error.address}</p>}
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
                    <Modal.Title>{user.firstName} {user.lastName}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex gap-2'>
                    <div className='text-start'>
                        <h3>{user.firstName} {user.lastName}</h3>
                        <p>Email : {user.email}</p>
                        <Badge>{user.phone}</Badge>
                        <p>City : {user?.address?.city}</p>
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
                        {/* //id,firstName,lastName,email,phone,address */}
                        <th >id</th>
                        <th>firstName</th>
                        <th>lastName</th>
                        {/* <th>email</th>
                        <th>phone</th> */}
                        <th>city</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? users.map((user, i) => {
                        return (i > offset && i < limit) && <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            {/* <td>{user.email}</td>
                            <td>{user.phone}</td> */}
                            <td>{user?.address?.city}</td>
                            <td>
                                <Button className='bg-success text-white m-2' onClick={() => openShowModel(user.id)}><FaEye /></Button>
                                <Button className='bg-warning text-white m-2' onClick={() => openEditModel(user.id)}><BiSolidEdit /></Button>
                                <Button className='btn-danger m-2' onClick={() => openDeleteModel(user.id)}><MdDelete /></Button>
                            </td>
                        </tr>
                    }) : <tr><td colSpan={5}>No User Data</td></tr>}
                </tbody>
            </Table>
            <section className='w-100 d-flex justify-content-end gap-3'>
                {/* <Dropdown className='m-2'>
                    <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center m-0 p-0 bg-transparent border-0">
                        Items per page : {limit}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                         <Dropdown.Item onClick={() => setLimit(5)}>5</Dropdown.Item>
                         <Dropdown.Item onClick={() => setLimit(10)}>10</Dropdown.Item>
                         <Dropdown.Item onClick={() => setLimit(15)}>15</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
                <Pagination>
                    {Array.from({ length: Math.ceil(users?.length / 5) }).map((_, i) => {
                        const pageNumber = i;
                        return (
                            <Pagination.Item
                                key={pageNumber}
                                active={pageNumber === active}
                                onClick={() => {
                                    setOffset(pageNumber * 5)
                                    setLimit((pageNumber * 5) + 5)
                                    setActive(pageNumber)
                                }
                                }
                            >
                                {pageNumber + 1}
                            </Pagination.Item>
                        );
                    })}
                </Pagination>
            </section>
        </div>
    )
}