import { MdDelete, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaPlusCircle, FaEye } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { GoStack } from "react-icons/go";

import { Table, Modal, Form, Button, Badge, Pagination, Collapse, Dropdown } from 'react-bootstrap'

import { useState, useEffect } from 'react'
import { useUser } from '../context/context'

import { toast } from 'react-toastify'

export default function TableUser() {
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
    const [perPage, setPerPage] = useState(limit)

    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users)
    const [searchUser, setSearchUser] = useState({
        firstName: '',
        lastName: "",
        email: "",
    })
    const [advShow, setAdvShow] = useState(false);

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

    const handleAdvChange = (e) => {
        setSearchUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleAdvSearch = (e) => {
        e.preventDefault();
        setFilteredUsers(users)
        setFilteredUsers(prev =>
            prev.filter(item => {
                return Object.keys(searchUser).every(key => {
                    const query = searchUser[key].trim().toLowerCase();
                    if (!query) return true;

                    const value = item[key] ? item[key].toString().toLowerCase() : "";
                    return value.includes(query);
                });
            })
        );
    };

    const resetAdv = () => {
        setFilteredUsers(users);
        setSearchUser({
            title: "",
            brand: "",
            category: "",
            price: ""
        })
    }

    const handleSearch = () => {
        if (search.length == 0) {
            setFilteredUsers(users)
        } else {
            setFilteredUsers(users)
            const flatern = (item) => {
                console.log(Array.isArray(Object.values(item)) ? Object.values(item).join('') : item)
                return Array.isArray(Object.values(item)) ? Object.values(item).join('') : item
                // const jsonString = JSON.stringify(item);
                // console.log(jsonString)
                // if (!jsonString) return "";

                // const cleanText = jsonString
                //     .replace(/["{}[\],:]/g, '')
                //     .toLowerCase();
                // return cleanText
            };
            setFilteredUsers(prev => {
                return prev.filter(item => {
                    // console.log(Object.values(flatern(item)))
                    return Object.values(item).join('').toLowerCase().includes(search.toLowerCase())
                })

            }
            )
        }
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

    useEffect(() => {
        handleSearch()
    }, [search])

    useEffect(() => {
        // console.log(filteredUsers)
        setFilteredUsers(users)
    }, [users])

    useEffect(() => {
        setPerPage(limit)
    }, [limit])

    return (
        <div className='w-100 m-3 text-start'>

            <div className='d-flex justify-content-between mb-4'>
                <div className='d-flex gap-4'>
                    <div className='position-relative'>
                        <CiSearch className='position-absolute' style={{ left: "8px", top: '23px' }} />
                        <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} className='form-control rounded ps-4 my-2' placeholder='search' />
                    </div>
                    <Button variant="primary" className='m-2 cus-ani' onClick={() => setAdvShow(!advShow)}>
                        <div className='d-flex gap-2'>
                            <GoStack className='m-1' /> AdvanceSearch
                        </div>
                    </Button>
                </div>
            </div>
            <Collapse in={advShow}>
                <div className='border rounded-3 my-4 p-2 text-start '>
                    <Form onSubmit={(e) => handleAdvSearch(e)}>
                        <Form.Group className='row py-2'>
                            {/* <Form.Group className='form-group col-12 col-md-2'>
                                        <Form.Label className='mb-2'>user ID</Form.Label>
                                        <Form.Control type='number' name='id' value={searchUser.id} onChange={(e) => handleAdvChange(e)} />
                                    </Form.Group> */}
                            <Form.Group className='form-group col-12 col-md-2'>
                                <Form.Label className='mb-2'>Title</Form.Label>
                                <Form.Control type='text' name='title' value={searchUser.title} onChange={(e) => handleAdvChange(e)} />
                            </Form.Group>
                            <Form.Group className='form-group col-12 col-md-2'>
                                <Form.Label className='mb-2'>Category</Form.Label>
                                <Form.Control type='text' name='category' value={searchUser.category} onChange={(e) => handleAdvChange(e)} />
                            </Form.Group>
                            <Form.Group className='form-group col-12 col-md-2'>
                                <Form.Label className='mb-2'>Brand</Form.Label>
                                <Form.Control type='text' name='brand' value={searchUser.brand} onChange={(e) => handleAdvChange(e)} />
                            </Form.Group>
                            <Form.Group className='form-group col-12 col-md-2'>
                                <Form.Label className='mb-2'>Price</Form.Label>
                                <Form.Control type='number' name='price' value={searchUser.price} onChange={(e) => handleAdvChange(e)} />
                            </Form.Group>
                            <Form.Group className='form-group col-12 col-md-2'>
                                <div className='d-flex h-100 justify-content-center align-items-end'>
                                    <Button variant="secondary" className='mx-2' type='button' onClick={() => resetAdv()}>
                                        Reset
                                    </Button>
                                    <div className='position-relative'>
                                        <CiSearch className='position-absolute text-white' style={{ left: "16px", top: '12px' }} />
                                        <Button variant="success" className='mx-2 ps-4' type='submit'>Search</Button>
                                    </div>
                                </div>

                            </Form.Group>
                        </Form.Group>
                    </Form>
                </div>
            </Collapse>



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
                    {filteredUsers.length > 0 ? filteredUsers.map((user, i) => {
                        return (i >= offset && i < perPage) && <tr key={user.id}>
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
            <section className='w-100 d-flex justify-content-end gap-2 '>
                <Dropdown className='mx-2'>
                    <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center p-2 bg-primary text-white border-0">
                        {limit}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => {
                            setLimit(5)
                            setOffset(0)
                            setActive(0)
                        }}>5</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setLimit(10)
                            setOffset(0)
                            setActive(0)
                        }}>10</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setLimit(15)
                            setOffset(0)
                            setActive(0)
                        }}>15</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <div className='d-flex gap-2 mb-3'>
                    <Button className='btn-light text-primary'
                        onClick={() => {
                            //  setPerPage(offset - perPage - limit)
                            //  setOffset(offset - perPage)
                            //  setActive(active +limit)
                        }}
                    > <MdOutlineKeyboardArrowLeft /> </Button>
                </div>
                <Pagination>
                    {Array.from({ length: Math.ceil(filteredUsers?.length / limit) }).map((_, i) => {
                        const pageNumber = i;
                        return (
                            <Pagination.Item
                                key={pageNumber}
                                active={pageNumber === active}
                                onClick={() => {
                                    setOffset(pageNumber * limit)
                                    setPerPage((pageNumber * limit) + limit)
                                    setActive(pageNumber)
                                }
                                }
                            >
                                {pageNumber + 1}
                            </Pagination.Item>
                        );
                    })}
                </Pagination>
                <div className='d-flex gap-2 mb-3'>
                    <Button className='btn-light text-primary' onClick={() => {
                        //  setPerPage(offset + perPage + limit)
                        //  setOffset(offset + perPage)
                    }}> <MdOutlineKeyboardArrowRight /> </Button>
                </div>

            </section>
        </div>
    )
}