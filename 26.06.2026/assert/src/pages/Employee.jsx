import { useState, useEffect } from 'react'
import { TiPlus } from "react-icons/ti";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';


function Employee() {
  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    department: "",
    email: ""
  });
  const [error, setError] = useState({
    id: "",
    name: "",
    department: "",
    email: ""
  })
  const [count, setCount] = useState(0)
  const [employees, setEmployees] = useState([]);

  const [asserts, setAsserts] = useState([])
  const [assertMap, setAssertMap] = useState({})
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(0)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setEmployee(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleEdit = (id) => {
    setEditId(id);
    const emp = employees.find(emp => emp.id == id);
    setEmployee(emp);
    handleShow()
  }

  const handleDelete = (id) => {
    setEmployees(prev =>
      prev.filter(item => item.id != id)
    )
  }

  const update = () => {
    // const emp = employees.find(emp => emp.id === editId);
    setEmployees(prev =>
      prev.map(item => item.id == editId ? { ...item, ...employee } : item)
    )
    handleClose()
    setEmployee({
      id: "",
      name: "",
      department: "",
      email: ""
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(employee);
    if (validate()) {
      setEmployees(prev => [...prev, employee])

      setCount(count+1)

      setEmployee({
        id: "",
        name: "",
        department: "",
        email: ""
      })

      handleClose()

    }
  }

  const validate = () => {
    const emailRegex =
      /^[A-Za-z0-9_%+-]+(?:\.[A-Za-z0-9_%+-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/; const error = {};
    if (!employee.name) error.name = "Name required";
    if (!employee.email) error.email = "email required";
    if (!employee.department) error.department = "department required"

    setError(error);
    return Object.keys(error).length === 0;
  };

  useEffect(() => {
    setEmployees(JSON.parse(localStorage.getItem('employees')) || []);
    setAsserts(JSON.parse(localStorage.getItem('asserts')) || [])
    setCount(JSON.parse(localStorage.getItem('count')) || 0)
  }, [])

  useEffect(() => {
    employees.length > 0 && localStorage.setItem('employees', JSON.stringify(employees));
    setEmployee(prev => ({ ...prev, id: (count + 1) }))
  }, [employees])

  useEffect(() => {
    const map = {}
    asserts.forEach(assert => map[assert.id] = assert.name)
    setAssertMap(map)
  }, [asserts])

  useEffect(() => {
    count && localStorage.setItem('count', JSON.stringify(count))
  }, [count])

  const style = {
    background: 'radial-gradient(circle at 20% 80%, #e4c4ff 0%, transparent 20%), radial-gradient(circle at 80% 20%, #dfb8ff 0%, transparent 20%)'
  };
  return (
    <div className='w-100 p-2 ' style={style}>
      <div className='text-end'>
        <Button variant="primary" onClick={handleShow}>
          <TiPlus /> Add Employee
        </Button>
      </div>

      <Modal
        size="xl"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className='row py-2'>
              <Form.Group className='form-group col-12 col-md-6'>
                <Form.Label className='mb-2'>Employee ID</Form.Label>
                <Form.Control type='number' name='id' value={employee.id} onChange={(e) => handleChange(e)} disabled />
              </Form.Group>
              <Form.Group className='form-group col-12 col-md-6'>
                <Form.Label className='mb-2'>Employee Name</Form.Label>
                <Form.Control type='text' name='name' value={employee.name} onChange={(e) => handleChange(e)} />
                {error.name && <Form.Text className='text-danger'>{error.name}</Form.Text>}
              </Form.Group>
            </Form.Group>
            <Form.Group className='row py-2'>
              <Form.Group className='form-group col-12 col-md-6'>
                <Form.Label className='mb-2'>Department</Form.Label>
                <Form.Select type='text' name='department' value={employee.department} onChange={(e) => handleChange(e)} >
                  <option value=''>Select a Department</option>
                  <option value='engineering'>Engineering</option>
                  <option value='sales'>Sales</option>
                  <option value='content creation'>Content Creation</option>
                </Form.Select>
                {error.department && <Form.Text className='text-danger'>{error.department}</Form.Text>}
              </Form.Group>
              <Form.Group className='form-group col-12 col-md-6'>
                <Form.Label className='mb-2'>Email</Form.Label>
                <Form.Control type='email' name='email' value={employee.email} onChange={(e) => handleChange(e)} />
                {error.email && <Form.Text className='text-danger'>{error.email}</Form.Text>}
              </Form.Group>
            </Form.Group>
            <Form.Group className='d-flex justify-content-end py-2'>
              {editId ?
                <>
                  <Button variant="secondary" className='m-2'>
                    Reset
                  </Button>
                  <Button variant="success" className='m-2' onClick={() => update()}>update</Button>
                </>
                :
                <>
                  <Button variant="secondary" className='m-2'>
                    Reset
                  </Button>
                  <Button variant="success" className='m-2' type='submit'>Save</Button>
                </>
              }
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>


      <Table bordered hover className='mt-4'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Department</th>
            <th>Asserts</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? employees.map(employee => {
            return <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td><ul className='list-unstyled'>
                {employee?.asserts?.length > 0 ? employee.asserts.map(assert => {
                  let text = String(assert) + '-' + assertMap[String(assert)]
                  return <li key={assert} className='bg-primary text-white m-2'>{text}</li>
                }) : '-'}
              </ul></td>
              <td>{employee.email}</td>
              <td className=''>
                <Button variant='warning' className='mx-2' onClick={() => handleEdit(employee.id)}>Edit</Button>
                <Button variant='danger' className='mx-2' onClick={() => handleDelete(employee.id)} >Delete</Button>
              </td>
            </tr>
          }) : <tr><td colSpan={6}>No Data</td></tr>}
        </tbody>
      </Table>
    </div>
  )
}

export default Employee
