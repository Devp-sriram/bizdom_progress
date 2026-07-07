import React from 'react'
import { Table } from 'react-bootstrap'
import { useProduct } from '../context/context'
import { reduceLength } from '../utils/len'

export default function TableProd() {
    const { products } = useProduct()
    return (
        <div className='w-100 m-3'>
            <Table bordered hover >
                <thead>
                    <tr>
                        <th>id</th>
                        <th>image</th>
                        <th>title</th>
                        <th>category</th>
                        <th>price</th>
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
                            <td>{reduceLength(product.title, 24)}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </div>
    )
}
