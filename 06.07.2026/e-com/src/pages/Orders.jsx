import { useEffect } from "react"
import { useOrder } from "../context/context"
import { Container, Card, Badge } from 'react-bootstrap'
import { reduceLength } from '../utils/len'
export default function Orders() {
    const { orders, setOrders } = useOrder()

    useEffect(() => {
        console.log(orders)
    }, [orders])

    return (
        <Container className='text-start w-100' style={{ marginTop: '120px', marginBottom: '120px' }}>
            <h3>orders</h3>
            <div className='d-flex flex-wrap gap-4'>
                {orders.map(item => {
                    return <div className="h-100 border rounded-3 p-3 bg-secondary-subtle text-center">
                        <div className="d-flex flex-wrap gap-3 ">
                        {item.cart.map(item => {
                            return <Card key={item.id} style={{ width: '14rem' }} className='text-start'>
                                <Card.Img
                                    variant="top"
                                    src={item.image}
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
                                        <Card.Title style={{ fontSize: "20px" }}>{(item.title)}</Card.Title>
                                        <Badge bg="success">{item.category}</Badge>
                                    </div>
                                    <div>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <Card.Text className='mb-0'>
                                                $ {item.price}
                                            </Card.Text>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        })}
                        </div>
                        <p className="m-2">Total : {item.total}</p>
                    </div>


                })}
            </div>
        </Container>
    )
}
