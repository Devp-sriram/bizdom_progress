import { useState, useEffect } from 'react'
import { Button, Table, Modal, Form } from 'react-bootstrap'
import { BiSolidEdit } from "react-icons/bi";

function User() {

  const [search, setSearch] = useState('');
  const [advOpen, setadvOpen] = useState(false);
  const [edit, setEdit] = useState(0)
  const [orders, setOrders] = useState(JSON.parse(localStorage.getItem('orders')) || []);

  const [order, setOrder] = useState({
    id: "",
    date: "",
    name: "",
    shop: "",
    total: "",
    status: ""
  })

  const [error, setError] = useState({
    date: "",
    name: "",
    shop: "",
    total: "",
    status: ""
  })

  const [show, setShow] = useState(false);
  const [showDel, setShowDel] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const handleDelClose = () => setShowDel(false);
  const handleDelShow = () => setShowDel(true);

  const openEditModel = (id) => {
    setEdit(id);
    handleShow();
    const order = orders.find(order => order.id === id);
    setOrder(order)
  }

  const openDeleteModel = (id)=>{
   handleDelShow()
  }

  const handleChange = (e) => {
    setOrder(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      setOrders(prev => 
        prev.map(item =>
          item.id === edit ? { ...item, ...order } : item
        )
      )

      setOrder({
        id: "",
        date: "",
        name: "",
        shop: "",
        total: "",
        status: ""
      })
      handleClose()
    }
  }

  const validate = () => {
    const error = {};

    const isEmpty = (value) => !value || value.trim() === "";

    const isTooShort = (value, minLength = 2) => value && value.trim().length < minLength;

    if (isEmpty(order.name)) {
      error.name = "Name required";
    } else if (isTooShort(order.name)) {
      error.name = "Name must be at least 2 characters";
    }
    if (isEmpty(order.total)) {
      error.total = "Total required";
    }

    if (isEmpty(order.date)) {
      error.date = "Phone required";

    }
    if (isEmpty(order.shop)) {
      error.shop = "Website required";
    }
    setError(error);
    return Object.keys(error).length === 0;
  }

  useEffect(() => {
    // console.log(orders)
    if (orders && orders?.length > 0) {
      // console.log(orders)
      localStorage.setItem('orders', JSON.stringify(orders));
    }
  }, [orders])

  return (
    <div className='w-100 p-4 page '>

      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className=" p-3 m-2 border rounded-5 text-start" onSubmit={(e) => handleSubmit(e)}>
            <div className="row w-100 mb-3">
              <div className="form-group col-12 col-md-6">
                <label className="p-2">Order Id</label>
                <input name='id' type="number" className="form-control rounded-pill w-100 p-2" value={order.id} onChange={(e) => handleChange(e)} />
              </div>
              <div className="form-group col-12 col-md-6">
                <label className="p-2">Order Date</label>
                <input type="date" name="date" className="form-control rounded-pill w-100 p-2" value={order.date} onChange={(e) => handleChange(e)} />
                {error.date && <p className="text-danger">{error.date}</p>}
              </div>
            </div>
            <div className="row w-100 mb-3">
              <div className="form-group col-12 col-md-6">
                <label className="p-2">Customer name</label>
                <input type="text" name='name' className="form-control rounded-pill w-100 p-2" value={order.name} onChange={(e) => handleChange(e)} />
                {error.name && <p className="text-danger">{error.name}</p>}
              </div>
              <div className="form-group col-12 col-md-6">
                <label className="p-2">Shop</label>
                <select name='shop' className="form-select rounded-pill w-100 p-2" value={order.shop} onChange={(e) => handleChange(e)}>
                  <option value="">Select Shop</option>
                  <option>Karappakam</option>
                  <option>Shozhilganallur</option>
                  <option>pammal</option>
                </select>
                {error.shop && <p className="text-danger">{error.shop}</p>}
              </div>
            </div>
            <div className="row w-100 mb-3">
              <div className="form-group col-12 col-md-6">
                <label className="p-2">Total</label>
                <input type="text" name="total" className="form-control rounded-pill w-100 p-2" value={order.total} onChange={(e) => handleChange(e)} />
                {error.total && <p className="text-danger">{error.total}</p>}
              </div>
              <div className="form-group col-12 col-md-6">
                <label className="p-2">status</label>
                <select name='status' className="form-select rounded-pill w-100 p-2" value={order.status} onChange={(e) => handleChange(e)}>
                  <option>pending</option>
                  <option>successful</option>
                  <option>rejected</option>
                </select>
                {error.status && <p className="text-danger">{error.status}</p>}
              </div>
            </div>
            <div>
              <button className="btn border rounded-pill px-5">Reset</button>
              <button className="btn btn-brand rounded-pill px-5" type="submit">Save</button>
            </div>
          </Form>

        </Modal.Body>
      </Modal>

      <Modal size="xl" show={showDel} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className=" p-3 m-2 border rounded-5 text-start" onSubmit={(e) => handleSubmit(e)}>
            <div className="row w-100 mb-3">
              <div className="form-group col-12 col-md-6">
                <label className="p-2">Order Id</label>
                <input name='id' type="number" className="form-control rounded-pill w-100 p-2" value={order.id} onChange={(e) => handleChange(e)} />
              </div>
              <div className="form-group col-12 col-md-6">
                <label className="p-2">Order Date</label>
                <input type="date" name="date" className="form-control rounded-pill w-100 p-2" value={order.date} onChange={(e) => handleChange(e)} />
                {error.date && <p className="text-danger">{error.date}</p>}
              </div>
            </div>
            <div className="row w-100 mb-3">
              <div className="form-group col-12 col-md-6">
                <label className="p-2">Customer name</label>
                <input type="text" name='name' className="form-control rounded-pill w-100 p-2" value={order.name} onChange={(e) => handleChange(e)} />
                {error.name && <p className="text-danger">{error.name}</p>}
              </div>
              <div className="form-group col-12 col-md-6">
                <label className="p-2">Shop</label>
                <select name='shop' className="form-select rounded-pill w-100 p-2" value={order.shop} onChange={(e) => handleChange(e)}>
                  <option value="">Select Shop</option>
                  <option>Karappakam</option>
                  <option>Shozhilganallur</option>
                  <option>pammal</option>
                </select>
                {error.shop && <p className="text-danger">{error.shop}</p>}
              </div>
            </div>
            <div className="row w-100 mb-3">
              <div className="form-group col-12 col-md-6">
                <label className="p-2">Total</label>
                <input type="text" name="total" className="form-control rounded-pill w-100 p-2" value={order.total} onChange={(e) => handleChange(e)} />
                {error.total && <p className="text-danger">{error.total}</p>}
              </div>
              <div className="form-group col-12 col-md-6">
                <label className="p-2">status</label>
                <select name='status' className="form-select rounded-pill w-100 p-2" value={order.status} onChange={(e) => handleChange(e)}>
                  <option>pending</option>
                  <option>successful</option>
                  <option>rejected</option>
                </select>
                {error.status && <p className="text-danger">{error.status}</p>}
              </div>
            </div>
            <div>
              <button className="btn border rounded-pill px-5">Reset</button>
              <button className="btn btn-brand rounded-pill px-5" type="submit">Save</button>
            </div>
          </Form>

        </Modal.Body>
      </Modal>

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map(order => {
            return <tr>
              <td>ORD-{order.id}</td>
              <td>{order.date}</td>
              <td>{order.name}</td>
              <td>{order.shop}</td>
              <td>{order.total}</td>
              <td>{order.status}</td>
              <td>
                <Button className='btn-brand bg-light text-dark' onClick={() => openEditModel(order.id)}><BiSolidEdit /></Button>
                <Button className='btn-danger' onClick={() => openDeleteModel(order.id)}><BiSolidEdit /></Button>
              </td>
            </tr>
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default User