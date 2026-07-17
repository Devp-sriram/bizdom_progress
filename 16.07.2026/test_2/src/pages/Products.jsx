import ProductCard from '../components/ProductCard';
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import MobileSidebar from '../components/MobileSideBar';

import { useCart, useProduct } from '../context/context';
import { useState, useEffect } from 'react'
import { Button, Dropdown, Offcanvas } from 'react-bootstrap';


export default function Products() {
    // getting products from global context
    const { products } = useProduct();
    const { cart } = useCart()

    const [filteredProducts, setFilteredProducts] = useState(products);

    // mobile sidebar open close
    const [showSideBar, setShowSideBar] = useState(false)

    // sort , filter
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('')

    // mobile sideBar handles

    const handleClose = () => setShowSideBar(false)


    const handleSearch = () => {
        setFilteredProducts(products);
        if (search.length > 0) {
            setFilteredProducts(
                [...products].filter(product => {
                    return `${product.title} ${product.category}`.toLowerCase().includes(search.toLowerCase().trim())
                })
            )
        }
    }

    const handleFilter = () => {
        setFilteredProducts(products);
        if (filter != '') {
            setFilteredProducts(prev =>
                prev.filter(item => item.category == filter)
            )
        }
    }

    const handleSort = () => {
        if (sort == 'asc') {
            setFilteredProducts(prev => [...prev].sort((a, b) => a.price - b.price))
        } else if (sort == 'desc') {
            setFilteredProducts(prev => [...prev].sort((a, b) => b.price - a.price))
        }
    }

    useEffect(() => {
        handleFilter()
    }, [filter])

    useEffect(() => {
        handleSearch()
    }, [search])

    useEffect(() => {
        handleSort()
    }, [sort])

    return (
        <>
            <Header search={search} setSearch={setSearch} showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
            <div className='d-flex w-100' style={{marginTop:'80px'}}>
                {/* desktop sidebar*/}

                <Sidebar filter={filter} setFilter={setFilter} />

                {/*mobile sidebar*/}

                <Offcanvas show={showSideBar} onHide={handleClose}>
                    <Offcanvas.Body>
                        <MobileSidebar filter={filter} setFilter={setFilter} handleClose={handleClose} />
                    </Offcanvas.Body>
                </Offcanvas>

                <div className='w-100 m-1 m-md-3'>
                    <div className='d-flex gap-4 align-items-center my-2'>
                        <h4 className='m-0'>Sort By : </h4>
                        <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                {sort === '' ? "price sort" : sort === 'asc' ? "Low to High" : "High to Low"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>

                                <Dropdown.Item onClick={() => setSort('asc')} className='bg-brand rounded-2 p-2'>
                                    Low to High
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setSort('desc')} className='bg-brand rounded-2 p-2' >
                                    High to Low
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='d-flex flex-wrap gap-3 m-md-3 '>
                        {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
                    </div>
                </div>
            </div>
        </>
    )
}