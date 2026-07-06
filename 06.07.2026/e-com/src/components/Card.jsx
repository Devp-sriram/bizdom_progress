import { Badge, Card, Button } from 'react-bootstrap'


import { useCart } from '../context/context'
import { reduceLength } from '../utils/len'


export default function ProductCard({ product }) {
    const { cart, setCart } = useCart()

    function AddCart(product) {
        setCart(prev => [{...product,qty:1}, ...prev,])
    }
    return (
        <Card key={product.id} style={{ width: '14rem' }} className='text-start'>
            <Card.Img
                variant="top"
                src={product.image}
                style={{
                    height: "200px",
                    width: "100%",
                    objectFit: "contain",
                    objectPosition: "center",
                    backgroundColor: "#f8f9fa"
                }}
            />

            <Card.Body className='d-flex flex-column justify-content-between'>
                <div>
                    <Card.Title style={{fontSize: "20px"}}>{reduceLength(product.title , 24)}</Card.Title>
                    <Badge bg="success">{product.category}</Badge>
                </div>
                <div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <Card.Text className='mb-0'>
                            $ {product.price}
                        </Card.Text>
                        <Button variant="primary" onClick={() => AddCart(product)}>Add to Cart</Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
