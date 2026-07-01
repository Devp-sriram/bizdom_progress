import { useState, useEffect } from 'react'
import { TiPlus } from "react-icons/ti";
import Card from '../components/Card'
import { Table, Button, Modal, Form, Pagination ,Collapse } from 'react-bootstrap'
import './Dash.css'

export default function Dash() {
    const [userData, setUserData] = useState([]);
    const [user, setUser] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        website: ""
    })

    const [searchuser, setsearchUser] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        website: ""
    })

    const [error, setError] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        website: ""
    })
    const [active, setActive] = useState(0)
    const [search, setSearch] = useState('');
    const [count, setCount] = useState(10);


    const [offset, setOffset] = useState(0);
    const [pageCount, setPageCount] = useState(5)
    const [show, setShow] = useState(false);
    const [delShow, setDelShow] = useState(false);
    const [advShow, setAdvShow] = useState(false);

    const [isEdit, setIsEdit] = useState(0);
    const [isDelete, setIsDelete] = useState(0)
    const handleClose = () => setShow(false);
    const handleCloseUp = () =>{
           setIsEdit(0);
        setUser({
            id: "",
            name: "",
            email: "",
            phone: "",
            website: ""
        })
        handleClose()
    }
    const handleShow = () => setShow(true);

    const handleDelHide = () => setDelShow(false);
    const handleDelShow = () => setDelShow(true);



    const handleSearch = () => {
        if (search.length == 0) {
            setUserData(JSON.parse(localStorage.getItem('userData')))
        } else {
            setUserData(JSON.parse(localStorage.getItem('userData')))
            setUserData(prev =>
                prev.filter(item => Object.values(item).join('').includes(search))
            )
        }
    }
    const handleChange = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleAdvChange = (e) => {
        setsearchUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleAdvSearch = (e) => {
        e.preventDefault();
        setUserData(JSON.parse(localStorage.getItem('userData')))
        setUserData(prev =>
            prev.filter(item => {
                return Object.keys(searchuser).every(key => {
                    const query = searchuser[key].trim().toLowerCase();
                    if (!query) return true;

                    const value = item[key] ? item[key].toString().toLowerCase() : "";
                    return value.includes(query);
                });
            })
        );
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setUserData(prev => [...prev, user])
            setCount(count + 1);

            setUser({
                id: "",
                name: "",
                department: "",
                email: ""
            })
            handleClose()
        }
    }
    const validate = () => {
        //  const emailRegex = /^[A-Za-z0-9_%+-]+(?:\.[A-Za-z0-9_%+-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/; 
        const error = {};
        if (!user.name) error.name = "Name required";
        if (!user.email) error.email = "email required";
        if (!user.phone) error.phone = "phone required"
        if (!user.website) error.website = "website required"


        setError(error);
        return Object.keys(error).length === 0;
    };

    const handleEdit = (id) => {
        handleShow()
        setIsEdit(id)
        const user = userData.find(user => user.id === id);
        setUser(user);
    }
    const reset = () => {
        const user = userData.find(user => user.id === isEdit);
        setUser(user);
    }
    const resetAdv = () => {
        setUserData(JSON.parse(localStorage.getItem('userData')));
        setsearchUser({
            id: "",
            name: "",
            email: "",
            phone: "",
            website: ""
        })
    }

    const update = () => {
        setUserData(prev =>
            prev.map(item => item.id === isEdit ? user : item)
        )
        console.log(userData)
        setIsEdit(0);
        setUser({
            id: "",
            name: "",
            email: "",
            phone: "",
            website: ""
        })
        handleClose()
    }

    const handleDelete = (id) => {
        setIsDelete(id)
        handleDelShow()
    }
    const deleteitem = () => {
        setUserData(prev =>
            prev.filter(item => item.id != isDelete)
        )
        handleDelHide()
    }

    useEffect(() => {
        handleSearch()
    }, [search])

    useEffect(() => {
        if (userData && userData.length > 0 && !search && !advShow) {
            localStorage.setItem('userData', JSON.stringify(userData));
        }
    }, [userData]);

    useEffect(() => {
        (count != 10 & !isEdit) && localStorage.setItem('count', count.toString());
    }, [count]);

    useEffect(() => {
        !isEdit && setUser(prev => ({ ...prev, id: (count + 1) }))
    }, [userData]);

    useEffect(() => {
        let local = JSON.parse(localStorage.getItem('userData'));
        if (local) {
            setUserData(local)
        } else {
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(res => res.json())
                .then(res => {
                    localStorage.setItem('userData', JSON.stringify(res))
                    console.log(res)
                    setUserData(res)
                }).catch(err => console.log('fetch err', err))
        }
        setCount(Number(localStorage.getItem('count')) || 10)
    }, [])

    return (
        <section className='w-100 m-4'>
            <div className='d-flex justify-content-between mb-4'>
                <div className='d-flex gap-4'>
                    <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} className='form-control rounded ps-4 my-2' placeholder='search' />
                    <Button variant="primary" className='m-2 cus-ani' onClick={() => setAdvShow(!advShow)}>
                        AdvanceSearch
                    </Button>
                </div>
                <Button variant="primary" onClick={handleShow} className='m-2 cus-ani'>
                    <TiPlus /> Add user
                </Button>
            </div>
            <Collapse in={advShow}>
            <div className='border rounded-3 my-4 p-2 text-start '>
                <Form onSubmit={(e) => handleAdvSearch(e)}>
                    <Form.Group className='row py-2'>
                        {/* <Form.Group className='form-group col-12 col-md-2'>
                            <Form.Label className='mb-2'>user ID</Form.Label>
                            <Form.Control type='number' name='id' value={searchuser.id} onChange={(e) => handleAdvChange(e)} />
                        </Form.Group> */}
                        <Form.Group className='form-group col-12 col-md-2'>
                            <Form.Label className='mb-2'>Name</Form.Label>
                            <Form.Control type='text' name='name' value={searchuser.name} onChange={(e) => handleAdvChange(e)} />
                            {error.name && <Form.Text className='text-danger'>{error.name}</Form.Text>}
                        </Form.Group>
                        <Form.Group className='form-group col-12 col-md-2'>
                            <Form.Label className='mb-2'>Email</Form.Label>
                            <Form.Control type='text' name='email' value={searchuser.email} onChange={(e) => handleAdvChange(e)} />
                            {error.email && <Form.Text className='text-danger'>{error.email}</Form.Text>}
                        </Form.Group>
                        <Form.Group className='form-group col-12 col-md-2'>
                            <Form.Label className='mb-2'>Phone</Form.Label>
                            <Form.Control type='text' name='phone' value={searchuser.phone} onChange={(e) => handleAdvChange(e)} />
                            {error.phone && <Form.Text className='text-danger'>{error.phone}</Form.Text>}
                        </Form.Group>
                        <Form.Group className='form-group col-12 col-md-2'>
                            <Form.Label className='mb-2'>Website</Form.Label>
                            <Form.Control type='text' name='website' value={searchuser.website} onChange={(e) => handleAdvChange(e)} />
                            {error.website && <Form.Text className='text-danger'>{error.website}</Form.Text>}
                        </Form.Group>
                        <Form.Group className='form-group col-12 col-md-2'>
                            {!isEdit &&
                                <div className='d-flex h-100 justify-content-center align-items-end'>
                                    <Button variant="secondary" className='mx-2' type='button' onClick={() => resetAdv()}>
                                        Reset
                                    </Button>
                                    <Button variant="success" className='mx-2' type='submit'>Search</Button>
                                </div>
                            }
                        </Form.Group>
                    </Form.Group>
                </Form>
            </div></Collapse>


            <Modal
                size="xl"
                show={show}
                onHide={isEdit ? handleCloseUp : handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group className='row py-2'>
                            <Form.Group className='form-group col-12 col-md-6'>
                                <Form.Label className='mb-2'>user ID</Form.Label>
                                <Form.Control type='number' name='id' value={user.id} onChange={(e) => handleChange(e)} disabled />
                            </Form.Group>
                            <Form.Group className='form-group col-12 col-md-6'>
                                <Form.Label className='mb-2'>user Name</Form.Label>
                                <Form.Control type='text' name='name' value={user.name} onChange={(e) => handleChange(e)} />
                                {error.name && <Form.Text className='text-danger'>{error.name}</Form.Text>}
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className='row py-2'>
                            <Form.Group className='form-group col-12 col-md-6'>
                                <Form.Label className='mb-2'>Email</Form.Label>
                                <Form.Control type='text' name='email' value={user.email} onChange={(e) => handleChange(e)} />
                                {error.email && <Form.Text className='text-danger'>{error.email}</Form.Text>}
                            </Form.Group>
                            <Form.Group className='form-group col-12 col-md-6'>
                                <Form.Label className='mb-2'>Phone</Form.Label>
                                <Form.Control type='text' name='phone' value={user.phone} onChange={(e) => handleChange(e)} />
                                {error.phone && <Form.Text className='text-danger'>{error.phone}</Form.Text>}
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className='row py-2'>
                            <Form.Group className='form-group col-12 col-md-6'>
                                <Form.Label className='mb-2'>Website</Form.Label>
                                <Form.Control type='text' name='website' value={user.website} onChange={(e) => handleChange(e)} />
                                {error.website && <Form.Text className='text-danger'>{error.website}</Form.Text>}
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className='d-flex justify-content-end py-2'>
                            {!isEdit &&
                                <>
                                    <Button variant="secondary" className='m-2' type='button' type='reset'>
                                        Reset
                                    </Button>
                                    <Button variant="success" className='m-2' type='submit'>Save</Button>
                                </>
                            }
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {isEdit && <>
                        <Button variant="secondary" className='m-2' type='button' onClick={()=>reset()}>
                            Reset
                        </Button>
                        <Button variant="warning" className='m-2' type='button' onClick={() => update()}>update</Button>
                    </>
                    }
                </Modal.Footer>
            </Modal>

            <Modal
                size="xl"
                show={delShow}
                onHide={handleDelHide}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Are you sure want to delete this user</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='m-2' type='button' onClick={() => handleDelHide()}>
                        Cancel
                    </Button>
                    <Button variant="danger" className='m-2' type='button' onClick={() => deleteitem()}>Delete</Button>
                </Modal.Footer>
            </Modal>

            <Table bordered hover >
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Website</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userData?.length > 0 ? userData?.map((user, i) => {
                        return i >= offset && i < pageCount ? <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.website}</td>
                            <td>
                                <Button variant="warning" className='m-2' onClick={() => handleEdit(user.id)}>Edit</Button>
                                <Button variant="danger" className='m-2' onClick={() => handleDelete(user.id)}>Delete</Button></td>
                        </tr> : ""
                    }
                    ) : <tr><td colSpan={6}>No Data Found</td></tr>}
                </tbody>
            </Table>
            <section className='w-100 d-flex justify-content-end'>
                <Pagination>
                    {Array.from({ length: Math.ceil(userData?.length / 5) }).map((_, i) => {
                        const pageNumber = i;
                        return (
                            <Pagination.Item
                                key={pageNumber}
                                active={pageNumber === active}
                                onClick={() => {
                                    setOffset(pageNumber * 5)
                                    setPageCount((pageNumber * 5) + 5)
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
        </section>
    )
}
