import { useCart } from '../context/context';
import { Card, Button, Container, Badge } from 'react-bootstrap';
import { reduceLength } from '../utils/len';

export default function Cart() {
  const { cart, setCart } = useCart()

  const SubQty = (e, id) => {
    e.stopPropagation()
    setCart(prev =>
      prev.map(item => item.id == id ? item.qty > 1 ? { ...item, qty: item.qty -= 1 } : {} : item)
    )

  }

  const AddQty = (e, id) => {
    e.stopPropagation()
    setCart(prev =>
      prev.map(item => item.id == id ? { ...item, qty: item.qty += 1 } : item)
    )
  }

  return (
    <Container className='d-flex flex-wrap gap-4' style={{ marginTop: '120px' }}>
      {cart.filter(item => item && Object.keys(item).length > 0)
        .map(item => {
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
                <Card.Title style={{ fontSize: "20px" }}>{reduceLength(item.title, 24)}</Card.Title>
                <Badge bg="success">{item.category}</Badge>
              </div>
              <div>
                <div className='d-flex justify-content-between align-items-center'>
                  <Card.Text className='mb-0'>
                    $ {item.price}
                  </Card.Text>
                  <div className="d-flex align-items-cenetr justify-content-center">
                    <Button onClick={(e) => SubQty(e, item.id)}>-</Button>
                    <p className="m-1">{item?.qty}</p>
                    <Button onClick={(e) => AddQty(e, item.id)}>+</Button>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        })}
    </Container>
  )
}