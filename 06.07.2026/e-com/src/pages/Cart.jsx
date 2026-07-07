import { useCart , useOrder} from '../context/context';
import { Card, Button, Container, Badge } from 'react-bootstrap';
import { reduceLength } from '../utils/len';

export default function Cart() {
  const { cart, setCart } = useCart()
  const { orders, setOrders } = useOrder()
  const cartTotal = useMemo(() => {
    return cart.filter(item => item && Object.keys(item).length > 0).reduce((acc, item) => acc + item.price * item?.qty, 0).toFixed(2);
  }, [cart]);

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

  const addOrders = (cart) => {
    let order = {
      cart : cart.filter(item => item && Object.keys(item).length > 0),
      total : cartTotal,
      paymemnt : "cod"
    }
    setOrders(prev => [...prev, order])
    setCart([]);
  }

  return (
    <Container className='d-flex' style={{ marginTop: '120px', marginBottom: '120px' }}>
      <div className='w-50 d-flex flex-wrap gap-4'>
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
      </div>
      <div className='w-50 h-100 border p-3'>
        <h1>Z - com</h1>
        <p>Summa deatils</p>
        <p>Summa address  : Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi aspernatur ut rem beatae placeat sunt dolorum voluptates dolores sint atque?</p>
        <div>
          {cart.filter(item => item && Object.keys(item).length > 0).map(item =>
            <div className='d-flex justify-content-between mx-5'>
              <p>{reduceLength(item.title, 16)}</p>
              <p>x {item?.qty || 1}</p>
              <p>$ {item.price * item?.qty}</p>
            </div>
          )}
          <div className='d-flex justify-content-between mx-5' style={{ borderLeft: '0px', borderRight: '0px', borderTop: "1px", borderBottom: "1px", borderStyle: "dashed" }}>
            <p>Total</p>
            <p>$ {cartTotal}</p>
          </div>
          <Button className='w-100 mt-5'onClick={()=>addOrders(cart)}>Pay on Delivery</Button>
        </div>
      </div>
    </Container>
  )
}