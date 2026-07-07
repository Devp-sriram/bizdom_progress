import { Container, Button, Form, Collapse } from 'react-bootstrap'
import { CiSearch } from "react-icons/ci";

import { GoStack } from "react-icons/go";

import Card from '../components/Card'
import Sidebar from '../components/Sidebar';

import { useCart, useProduct } from '../context/context'
import { useState, useEffect } from 'react';


export default function Product() {
    const { products } = useProduct()
    const { cart, setCart } = useCart()
    const [search, setSearch] = useState('');
    const [advShow, setAdvShow] = useState(false);

    const [searchuser, setsearchUser] = useState({
        title: "",
        category: "",
    })

    const [error, setError] = useState({
        title: "",
        category: "",
    })

    const [filterProducts, setFilterProducts] = useState(products)
    const handleSearch = () => {
        if (search.length == 0) {
            setFilterProducts(products)
        } else {
            setFilterProducts(products)
            setFilterProducts(prev =>
                prev.filter(item => Object.values(item).join('').toLowerCase().includes(search.toLowerCase()))
            )
        }
    }
    const handleAdvChange = (e) => {
        setsearchUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleAdvSearch = (e) => {
        console.log(searchuser);
        e.preventDefault();
        setFilterProducts(products)
        setFilterProducts(prev =>
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

    useEffect(() => {
        handleSearch()
    }, [search])
    return (
        <div style={{ marginTop: "100px", backgroundColor: 'rgba(216, 192, 255, 0.65)' }}>
            <div className='d-flex gap-2 '>
                <Sidebar />
                <div className='w-100 mb-5' style={{ width: "500px" }}>
                    <div className='d-flex gap-4 m-3' >
                        <div className='position-relative'>
                            <CiSearch className='position-absolute' style={{ left: "8px", top: '23px' }} />
                            <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} className='form-control rounded ps-4 my-2' placeholder='search' style={{ width: "500px" }} />
                        </div>
                        <Button variant="primary" className='m-2 cus-ani' onClick={() => setAdvShow(!advShow)}>
                            <div className='d-flex gap-2'>
                                <GoStack className='m-1' /> AdvanceSearch
                            </div>
                        </Button>
                    </div>
                    <Collapse in={advShow}>
                        <div className='border rounded-3 my-4 p-2 text-start '>
                            <Form onSubmit={(e) => handleAdvSearch(e)}>
                                <Form.Group className='row py-2'>
                                    <Form.Group className='form-group col-12 col-md-2'>
                                        <Form.Label className='mb-2'>Title</Form.Label>
                                        <Form.Control type='text' name='title' value={searchuser.title} onChange={(e) => handleAdvChange(e)} />
                                        {error.title && <Form.Text className='text-danger'>{error.title}</Form.Text>}
                                    </Form.Group>
                                    <Form.Group className='form-group col-12 col-md-2'>
                                        <Form.Label className='mb-2'>Category </Form.Label>
                                        <Form.Control type='text' name='category' value={searchuser.category} onChange={(e) => handleAdvChange(e)} />
                                        {error.category && <Form.Text className='text-danger'>{error.category}</Form.Text>}
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
                        </div></Collapse>
                    <div className='w-100 d-flex flex-wrap gap-3 '>
                        {filterProducts.map(product => <Card product={product} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}
