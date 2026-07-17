import ProductCard from '../components/ProductCard';
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { useCart, useProduct } from '../context/context';
import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';


export default function Products() {
    // getting products from global context
    const { products } = useProduct();
    const { cart } = useCart()

    const [filteredProducts, setFilteredProducts] = useState(products)

    // sort , filter
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('');



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
            setFilteredProducts(prev=> [...prev].sort((a, b) => a.price - b.price))
        } else if (sort == 'desc') {
            setFilteredProducts(prev=> [...prev].sort((a, b) => b.price - a.price))
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
            <Header search={search} setSearch={setSearch} />
            <div className='d-flex w-100'>
                <Sidebar filter={filter} setFilter={setFilter} />
                <div className='w-100 m-3'>
                    <div className='d-flex gap-3'>
                        <button onClick={() => setSort('asc')} className='bg-brand rounded-2 text-white p-2 mb-3 border-none'>
                            Sort asc
                        </button>
                        <button onClick={() => setSort('desc')} className='bg-brand rounded-2 text-white p-2 mb-3 border-none'  >
                            Sort desc
                        </button>
                    </div>
                    <div className='d-flex flex-wrap gap-3 m-3 '>
                        {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
                    </div>
                </div>
            </div>
        </>
    )
}