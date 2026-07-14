import { MdDelete, MdOutlineEmail, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaPlusCircle, FaEye, FaPhoneAlt, FaUsers } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { GoStack } from "react-icons/go";

import { Table, Modal, Form, Button, Badge, Pagination, Collapse, Dropdown } from 'react-bootstrap'

import { useState, useEffect } from 'react'
import { useEmployee, useAssert } from '../context/context'

import { toast } from 'react-toastify'

export default function TableUser() {
    const { employees, setEmployees } = useEmployee();
    const { asserts } = useAssert()

    const [count, setCount] = useState(Number(JSON.parse(localStorage.getItem('count'))) || 0);
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
    const [filteredEmployees, setFilteredEmployees] = useState(employees)
    const [searchEmployees, setSearchEmployees] = useState({
        name: '',
        email: "",
        department: "",
    })
    const [advShow, setAdvShow] = useState(false);

    const [employee, setEmployee] = useState({
        id: "",
        name: '',
        email: "",
        department: "",
        phone: "",
    })

    const [error, setError] = useState({
        id: "",
        name: '',
        email: "",
        department: "",
        phone: "",
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelClose = () => setShowDel(false);
    const handleDelShow = () => setShowDel(true);

    const handleCreateClose = () => setShowCreate(false);
    const handleCreateOpen = () => setShowCreate(true);

    const handleOpenClose = () => {
        setShowOpen(false);
        setEmployee({
            id: "",
            name: '',
            email: "",
            department: "",
            phone: "",
        })
    }
    const handleOpenShow = () => setShowOpen(true);

    const openShowModel = (id) => {
        setShowId(id)
        handleOpenShow()
        const employee = employees.find(employee => employee.id === id);
        setEmployee(employee)
    }
    const openEditModel = (id) => {
        setEdit(id);
        handleShow();
        const employee = employees.find(employee => employee.id === id);
        setEmployee(employee)
    }

    const openDeleteModel = (id) => {
        setDelId(id);
        handleDelShow()
        const employee = employees.find(employee => employee.id === id);
        setEmployee(employee)
    }

    const handleAdvChange = (e) => {
        setSearchEmployees(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const assertMap = useMemo(() => {
        return asserts.reduce((acc, emp) => {
            acc[emp.id] = emp.name;
            return acc;
        }, {});
    }, [asserts]);

    const handleAdvSearch = (e) => {
        e.preventDefault();
        setFilteredEmployees(employees)
        setFilteredEmployees(prev =>
            prev.filter(item => {
                return Object.keys(searchEmployees).every(key => {
                    const query = searchEmployees[key].trim().toLowerCase();
                    if (!query) return true;

                    const value = item[key] ? item[key].toString().toLowerCase() : "";
                    return value.includes(query);
                });
            })
        );
    };

    const resetAdv = () => {
        setFilteredEmployees(employees);
        setSearchEmployees({
            name: '',
            email: "",
            department: "",
        })
    }

    const handleSearch = () => {
        if (search.length == 0) {
            setFilteredEmployees(employees)
        } else {
            setFilteredEmployees(employees)
            setFilteredEmployees(prev =>
                prev.filter(item => Object.values(item).join('').toLowerCase().includes(search.toLowerCase()))
            )
        }
    }

    const handleDelete = () => {
        console.log(delId)
        setEmployees(prev =>
            prev.filter(item => item.id != delId)
        )

        setEmployee({
            id: "",
            name: '',
            email: "",
            department: "",
            phone: "",
        })
        setDelId(0);
        handleDelClose();
        toast.success('Employee deleted successfully');
    }
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'address') {
            setEmployee(prev => ({
                ...prev,
                address: {
                    ...prev[name],
                    city: value,
                }
            }));
        } else {
            setEmployee(prev => ({ ...prev, [name]: value }));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            setEmployees(prev =>
                prev.map(item =>
                    item.id === edit ? { ...item, ...employee } : item
                )
            )

            setEmployee({
                id: "",
                name: '',
                email: "",
                department: "",
                phone: "",
            })
            handleClose()
            toast.success('Employee updated successfully');
        }
    }

    const handleNewSubmit = (e) => {
        e.preventDefault()
        console.log('submitting')
        if (validate()) {
            console.log('validate passed')
            setEmployees(prev => {
                return [employee, ...prev]
            })
            setCount(count + 1);
            console.log(employee)
            setEmployee({
                id: "",
                name: '',
                email: "",
                department: "",
                phone: "",
            })
            handleCreateClose()
            toast.success('Employee created successfully');
        }
    }

    const validate = () => {
        console.log('valildating')
        const emailRegex = /^[A-Za-z0-9_%+-]+(?:\.[A-Za-z0-9_%+-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;
        const phoneRegex = /^[6-9]\d{9}$/;
        const error = {};
        const isEmpty = (value) => !value || value.trim() === "";
        const isTooShort = (value, minLength = 2) => value && value.trim().length < minLength;

        if (!employee.email || !employee.email.trim()) {
            error.email = "Email required"
        } else if (!emailRegex.test(employee.email)) {
            error.email = "not a valid email";
        }
        if (isEmpty(employee.name)) {
            error.name = "name required";
        } else if (isTooShort(employee.name)) {
            error.name = "Name must be at least 2 characters";
        }
        if (isEmpty(employee.phone)) {
            error.phone = "phone required";
        } else if (phoneRegex.test(employee.phone)) {
            error.phone = "phone number not Valid";
        }
        if (isEmpty(employee.department)) {
            error.department = "department required";
        }
        setError(error);
        console.log(error)
        return Object.keys(error).length === 0;
    }
    useEffect(() => {
        (count != 0) && localStorage.setItem('count', count.toString())
    }, [count]);

    useEffect(() => {
        setEmployee(prev => ({ ...prev, id: (count + 1) }))
    }, [employees])

    useEffect(() => {
        handleSearch()
    }, [search])

    useEffect(() => {
        // console.log(filteredEmployees)
        setFilteredEmployees(employees)
    }, [employees])

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
                                <Form.Control type='text' name='name' value={searchEmployees.name} onChange={(e) => handleAdvChange(e)} />
                            </Form.Group>
                            <Form.Group className='form-group col-12 col-md-2'>
                                <Form.Label className='mb-2'>Email</Form.Label>
                                <Form.Control type='text' name='email' value={searchEmployees.email} onChange={(e) => handleAdvChange(e)} />
                            </Form.Group>
                            <Form.Group className='form-group col-12 col-md-2'>
                                <Form.Label className='mb-2'>Department</Form.Label>
                                <Form.Control type='text' name='department' value={searchEmployees.department} onChange={(e) => handleAdvChange(e)} />
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



            <Button onClick={() => handleCreateOpen()} className='m-2 d-flex gap-2'><FaPlusCircle className="m-1" /> Add New Employee</Button>

            {/* Open model */}
            <Modal show={showOpen} onHide={handleOpenClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{employee.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex gap-2'>
                    <div className='text-start'>
                        <Badge>{employee.department}</Badge>
                        <p><MdOutlineEmail /> : {employee.email}</p>
                        <p><FaPhoneAlt /> : {employee.phone}</p>

                    </div>
                </Modal.Body>
            </Modal>

            {/* Create model */}
            <Modal size="xl" show={showCreate} onHide={() => handleCreateClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*//id,firstName,lastName,email,phone,address */}
                    <Form className="text-start" onSubmit={(e) => handleNewSubmit(e)}>
                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Employee Id</label>
                                <input name='id' type="number" className="form-control rounded-pill w-100 p-2" value={employee.id} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Employee Email</label>
                                <input type="text" name="email" className="form-control rounded-pill w-100 p-2" value={employee.email} onChange={(e) => handleChange(e)} />
                                {error.email && <p className="text-danger">{error.email}</p>}
                            </div>
                        </div>

                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Name</label>
                                <input type="text" name='name' className="form-control rounded-pill w-100 p-2" value={employee.name} onChange={(e) => handleChange(e)} />
                                {error.name && <p className="text-danger">{error.name}</p>}
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Department</label>
                                <select type="text" name='department' className="form-select rounded-pill w-100 p-2" value={employee.department} onChange={(e) => handleChange(e)} >
                                    <option value=''>Select an Department</option>
                                    <option value='developer'>Developer</option>
                                    <option value='designer'>Designer</option>
                                    <option value='devops'>Devops</option>
                                </select>
                                {error.department && <p className="text-danger">{error.department}</p>}
                            </div>
                        </div>

                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">phone</label>
                                <input type="text" name="phone" className="form-control rounded-pill w-100 p-2" value={employee.phone} onChange={(e) => handleChange(e)} />
                                {error.phone && <p className="text-danger">{error.phone}</p>}
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
                    <Modal.Title>Edit Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*//id,firstName,lastName,email,phone,address */}
                    <Form className="text-start" onSubmit={(e) => handleSubmit(e)}>
                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Employee Id</label>
                                <input name='id' type="number" className="form-control rounded-pill w-100 p-2" value={employee.id} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Employee Email</label>
                                <input type="text" name="email" className="form-control rounded-pill w-100 p-2" value={employee.email} onChange={(e) => handleChange(e)} />
                                {error.email && <p className="text-danger">{error.email}</p>}
                            </div>
                        </div>

                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Name</label>
                                <input type="text" name='name' className="form-control rounded-pill w-100 p-2" value={employee.name} onChange={(e) => handleChange(e)} />
                                {error.name && <p className="text-danger">{error.name}</p>}
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Department</label>
                                <select type="text" name='department' className="form-select rounded-pill w-100 p-2" value={employee.department} onChange={(e) => handleChange(e)} >
                                    <option value=''>Select an Department</option>
                                    <option value='developer'>Developer</option>
                                    <option value='designer'>Designer</option>
                                    <option value='devops'>Devops</option>
                                </select>
                                {error.Department && <p className="text-danger">{error.Department}</p>}
                            </div>
                        </div>

                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">phone</label>
                                <input type="text" name="phone" className="form-control rounded-pill w-100 p-2" value={employee.phone} onChange={(e) => handleChange(e)} />
                                {error.phone && <p className="text-danger">{error.phone}</p>}
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
                    <Modal.Title>{employee.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex gap-2'>
                    <div className='text-start'>
                        <Badge>{employee.department}</Badge>
                        <p><MdOutlineEmail /> : {employee.email}</p>
                        <p><FaPhoneAlt /> : {employee.phone}</p>
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
                        <th>department</th>
                        <th>Asserts</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.length > 0 ? filteredEmployees.map((employee, i) => {
                        return (i >= offset && i < perPage) && <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.department}</td>
                            <td><ul className="list-unstyled">{employee.asserts.length > 0 ? employee.asserts.map(assert => {
                                return <li className="bg-primary-subtle p-2 m-1">{assert} - {assertMap[assert]}</li>
                            }) : <li> - </li>}</ul></td>
                            <td>
                                <Button className='bg-success text-white m-2' onClick={() => openShowModel(employee.id)}><FaEye /></Button>
                                <Button className='bg-warning text-white m-2' onClick={() => openEditModel(employee.id)}><BiSolidEdit /></Button>
                                <Button className='btn-danger m-2' onClick={() => openDeleteModel(employee.id)}><MdDelete /></Button>
                            </td>
                        </tr>
                    }) : <tr><td colSpan={5} className="text-center">No Employee Data</td></tr>}
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
                    {Array.from({ length: Math.ceil(filteredEmployees?.length / limit) }).map((_, i) => {
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