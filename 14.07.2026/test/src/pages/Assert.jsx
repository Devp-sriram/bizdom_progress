import { MdDelete, MdOutlineEmail, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaPlusCircle, FaEye, FaPhoneAlt, FaUserCircle } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { GoStack } from "react-icons/go";

import { Table, Modal, Form, Button, Badge, Pagination, Collapse, Dropdown } from 'react-bootstrap'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useEmployee, useAssert } from '../context/context'

import { toast } from 'react-toastify'

export default function TableUser() {
    const { asserts, setAsserts } = useAssert();
    const { employees, setEmployees } = useEmployee();

    const [ascount, setAscount] = useState(Number(JSON.parse(localStorage.getItem('ascount'))) || 0);
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
    const [filteredAsserts, setFilteredAsserts] = useState(asserts)
    const [searchAsserts, setSearchAsserts] = useState({
        name: '',
        assignedTo: "",
        category: "",
    })
    const [advShow, setAdvShow] = useState(false);

    const [assert, setAssert] = useState({
        id: "",
        name: '',
        assignedTo: "",
        category: "",
    })

    const [error, setError] = useState({
        id: "",
        name: '',
        assignedTo: "",
        category: "",
    })

    const empMap = useMemo(() => {
        return employees.reduce((acc, emp) => {
            acc[emp.id] = emp.name;
            return acc;
        }, {});
    }, [employees]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelClose = () => setShowDel(false);
    const handleDelShow = () => setShowDel(true);

    const handleCreateClose = () => setShowCreate(false);
    const handleCreateOpen = () => setShowCreate(true);

    const handleOpenClose = () => {
        setShowOpen(false);
        setAssert({
            id: "",
            name: '',
            assignedTo: "",
            category: "",
        })
    }
    const handleOpenShow = () => setShowOpen(true);

    const openShowModel = (id) => {
        setShowId(id)
        handleOpenShow()
        const assert = asserts.find(assert => assert.id === id);
        setAssert(assert)
    }
    const openEditModel = (id) => {
        setEdit(id);
        handleShow();
        const assert = asserts.find(assert => assert.id === id);
        setAssert(assert)
    }

    const openDeleteModel = (id) => {
        setDelId(id);
        handleDelShow()
        const assert = asserts.find(assert => assert.id === id);
        setAssert(assert)
    }

    const handleAdvChange = (e) => {
        setSearchAsserts(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleAdvSearch = (e) => {
        e.preventDefault();
        setFilteredAsserts(asserts)
        setFilteredAsserts(prev =>
            prev.filter(item => {
                return Object.keys(searchAsserts).every(key => {
                    const query = searchAsserts[key].trim().toLowerCase();
                    if (!query) return true;

                    const value = item[key] ? item[key].toString().toLowerCase() : "";
                    return value.includes(query);
                });
            })
        );
    };

    const resetAdv = () => {
        setFilteredAsserts(asserts);
        setSearchAsserts({
            name: '',
            assignedTo: "",
            category: "",
        })
    }

    const handleSearch = () => {
        if (search.length == 0) {
            setFilteredAsserts(asserts)
        } else {
            setFilteredAsserts(asserts)
            setFilteredAsserts(prev =>
                prev.filter(item => Object.values(item).join('').toLowerCase().includes(search.toLowerCase()))
            )
        }
    }

    const handleDelete = () => {
        console.log(delId)
        setAsserts(prev =>
            prev.filter(item => item.id != delId)
        )

        setAssert({
            id: "",
            name: '',
            assignedTo: "",
            category: "",
        })
        setDelId(0);
        handleDelClose();
        toast.success('Assert deleted successfully');
    }
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'address') {
            setAssert(prev => ({
                ...prev,
                address: {
                    ...prev[name],
                    city: value,
                }
            }));
        } else {
            setAssert(prev => ({ ...prev, [name]: value }));
        }
    }
    const reassignAssert = (assert) => {
        const prevAssert = employees.find(emp => emp.id == assert.assignedTo)
        console.log(prevAssert)
        if (prevAssert.asserts.includes(assert.assignedTo)) {

            setEmployees(prev =>
                prev.map(emp => {
                    return emp.id == assert.assignedTo ? { ...emp, asserts: emp.asserts.filter(item => item != assert.id) } : emp
                })
            )
            if (assert.assignedTo != 0) {
                setEmployees(prev =>
                    prev.map(emp => {
                        return emp.id == assert.assignedTo ? emp.asserts.pop(assert.id) : emp
                    })
                )
            }
            // setEmployees(prev =>
            //     prev.map(emp => {
            //         return emp.id == assert.assignedTo ? emp.asserts.pop(assert.id) : emp
            //     })
            // )
            // employees.find(emp => emp.id === prev.assignedTo)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            reassignAssert(assert)
            setAsserts(prev =>
                prev.map(item =>
                    item.id === edit ? { ...item, ...assert } : item
                )
            )

            setAssert({
                id: "",
                name: '',
                assignedTo: "",
                category: "",
            })
            handleClose()
            toast.success('Assert updated successfully');
        }
    }

    const assignAssert = (assert) => {
        setEmployees(prev =>
            prev.map(item =>
                item.id == assert.assignedTo ?
                    item.asserts ? { ...item, asserts: [...item.asserts, assert.id] } : { ...item, asserts: [assert.id] }
                    : item
            )
        )
    }

    const handleNewSubmit = (e) => {
        e.preventDefault()
        if (validate()) {

            if (assert.assignedTo != 'available') {
                assignAssert(assert);
            }

            setAsserts(prev => {
                return [assert, ...prev]
            })
            setAscount(ascount + 1);
            setAssert({
                id: "",
                name: '',
                assignedTo: "",
                category: "",
            })
            handleCreateClose()
            toast.success('Assert created successfully');
        }
    }

    const validate = () => {
        console.log('valildating')
        const error = {};
        const isEmpty = (value) => !value || value.trim() === "";
        const isTooShort = (value, minLength = 2) => value && value.trim().length < minLength;

        if (isEmpty(assert.name)) {
            error.name = "name required";
        } else if (isTooShort(assert.name)) {
            error.name = "Name must be at least 2 characters";
        }
        if (isEmpty(assert.category)) {
            error.category = "category required";
        }
        if (isEmpty(assert.assignedTo)) {
            error.assignedTo = "Assigned To required";
        }
        setError(error);
        console.log(error)
        return Object.keys(error).length === 0;
    }
    useEffect(() => {
        (ascount != 0) && localStorage.setItem('ascount', ascount.toString())
    }, [ascount]);

    useEffect(() => {
        setAssert(prev => ({ ...prev, id: (ascount + 1) }))
    }, [asserts])

    useEffect(() => {
        handleSearch()
    }, [search])

    useEffect(() => {
        // console.log(filteredAsserts)
        setFilteredAsserts(asserts)
    }, [asserts])

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
                            <Form.Group className='form-group col-12 col-md-2'>
                                <Form.Label className='mb-2'>Name</Form.Label>
                                <Form.Control type='text' name='name' value={searchAsserts.name} onChange={(e) => handleAdvChange(e)} />
                            </Form.Group>
                            <Form.Group className='form-group col-12 col-md-2'>
                                <Form.Label className='mb-2'>Assigned to</Form.Label>
                                <Form.Control type='text' name='assignedTo' value={searchAsserts.assignedTo} onChange={(e) => handleAdvChange(e)} />
                            </Form.Group>
                            <Form.Group className='form-group col-12 col-md-2'>
                                <Form.Label className='mb-2'>Category</Form.Label>
                                <Form.Control type='text' name='category' value={searchAsserts.category} onChange={(e) => handleAdvChange(e)} />
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



            <Button onClick={() => handleCreateOpen()} className='m-2 d-flex gap-2'><FaPlusCircle className="m-1" /> Add New Assert</Button>

            {/* Open model */}
            <Modal show={showOpen} onHide={handleOpenClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{assert.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex gap-2'>
                    <div className='text-start'>
                        <Badge>{assert.category}</Badge>
                        <p><FaUserCircle /> : {assert.assignedTo} - {empMap[assert.assignedTo]}</p>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Create model */}
            <Modal size="xl" show={showCreate} onHide={() => handleCreateClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Assert</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*//id,firstName,lastName,name,phone,address */}
                    <Form className="text-start" onSubmit={(e) => handleNewSubmit(e)}>
                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Assert Id</label>
                                <input name='id' type="number" className="form-control rounded-pill w-100 p-2" value={assert.id} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Assert Name</label>
                                <input type="text" name="name" className="form-control rounded-pill w-100 p-2" value={assert.name} onChange={(e) => handleChange(e)} />
                                {error.name && <p className="text-danger">{error.name}</p>}
                            </div>
                        </div>

                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Category</label>
                                <select type="text" name='category' className="form-select rounded-pill w-100 p-2" value={assert.category} onChange={(e) => handleChange(e)} >
                                    <option value=''>Select an Department</option>
                                    <option value='computer'>Computer</option>
                                    <option value='laptop'>Laptop</option>
                                    <option value='car'>Car</option>
                                </select>
                                {error.category && <p className="text-danger">{error.category}</p>}
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Assigned to</label>
                                <select type="text" name='assignedTo' className="form-control rounded-pill w-100 p-2" value={assert.assignedTo} onChange={(e) => handleChange(e)} >
                                    <option value={0}>Keep Available</option>
                                    {employees.map(emp => {
                                        return <option value={emp.id}>{emp.name}</option>
                                    })}
                                </select>
                                {error.assignedTo && <p className="text-danger">{error.assignedTo}</p>}
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
                    <Modal.Title>Edit Assert</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*//id,firstName,lastName,name,phone,address */}
                    <Form className="text-start" onSubmit={(e) => handleSubmit(e)}>
                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Assert Id</label>
                                <input name='id' type="number" className="form-control rounded-pill w-100 p-2" value={assert.id} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Assert Name</label>
                                <input type="text" name="name" className="form-control rounded-pill w-100 p-2" value={assert.name} onChange={(e) => handleChange(e)} />
                                {error.name && <p className="text-danger">{error.name}</p>}
                            </div>
                        </div>

                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Category</label>
                                <select type="text" name='category' className="form-select rounded-pill w-100 p-2" value={assert.category} onChange={(e) => handleChange(e)} >
                                    <option value=''>Select an category</option>
                                    <option value='computer'>Computer</option>
                                    <option value='laptop'>Laptop</option>
                                    <option value='car'>Car</option>
                                </select>
                                {error.category && <p className="text-danger">{error.category}</p>}
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Assigned to</label>
                                <select type="text" name='assignedTo' className="form-control rounded-pill w-100 p-2" value={assert.assignedTo} onChange={(e) => handleChange(e)} >
                                    <option value={0}>Keep Available</option>
                                    {employees.map(emp => {
                                        return <option value={emp.id}>{emp.name}</option>
                                    })}
                                </select>
                                {error.assignedTo && <p className="text-danger">{error.assignedTo}</p>}
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
                    <Modal.Title>{assert.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex gap-2'>
                    <div className='text-start'>
                        <Badge>{assert.category}</Badge>
                        <p><FaUserCircle /> : {assert.assignedTo}</p>
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
                        <th >id</th>
                        <th>name</th>
                        <th>category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAsserts.length > 0 ? filteredAsserts.map((assert, i) => {
                        return (i >= offset && i < perPage) && <tr key={assert.id}>
                            <td>{assert.id}</td>
                            <td>{assert.name}</td>
                            <td>{assert.category}</td>
                            <td>
                                <Button className='bg-success text-white m-2' onClick={() => openShowModel(assert.id)}><FaEye /></Button>
                                <Button className='bg-warning text-white m-2' onClick={() => openEditModel(assert.id)}><BiSolidEdit /></Button>
                                <Button className='btn-danger m-2' onClick={() => openDeleteModel(assert.id)}><MdDelete /></Button>
                            </td>
                        </tr>
                    }) : <tr><td colSpan={5} className="text-center">No Assert Data</td></tr>}
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
                    {Array.from({ length: Math.ceil(filteredAsserts?.length / limit) }).map((_, i) => {
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