import { useState , useEffect} from 'react'
import { Button, Table } from 'react-bootstrap'

function User() {

  const [search, setSearch] = useState('');
  const [advOpen, setadvOpen] = useState(false);

  const [orders , setOrders] = useState([])

  useEffect(()=>{
    setOrders(JSON.parse(localStorage.getItem('orders')))
  },[])

  return (
    <div className='w-100 p-4 page '>
      <div className='d-flex gap-3 mb-3'>
        <input type='text' className='w-25 p-2 ps-4 rounded-pill form-control' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search ...' />
        <Button className='btn-brand rounded-pill' onClick={() => setadvOpen(!advOpen)}>Advancd_Search</Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>date</th>
            <th>name</th>
            <th>shop</th>
            <th>total</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
            {orders?.map(order =>{
              return <tr>
                <td>ORD-{order.id}</td>
                <td>{order.date}</td>
                <td>{order.name}</td>
                <td>{order.shop}</td>
                <td>{order.total}</td>
                <td>{order.status}</td>
              </tr>
            })}
        </tbody>
      </Table>
    </div>
  )
}

export default User