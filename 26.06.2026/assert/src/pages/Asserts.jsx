import { useState, useEffect } from 'react'
import { TiPlus } from "react-icons/ti";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';


function Assert() {
  const [assert, setAssert] = useState({
    id: "",
    name: "",
    category: "",
    assignedto: ""
  });
  const [error, setError] = useState({
    id: "",
    name: "",
    category: "",
    assignedto: ""
  })

  const [employees, setEmployees] = useState([]);
  const [employeeMap, setEmployeeMap] = useState({})
  const [ascount, setAsCount] = useState(0)
  const [asserts, setAsserts] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(0)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const handleEdit = (id) => {
    setEditId(id);
    const as = asserts.find(emp => emp.id == id);
    setAssert(as);
    handleShow()
  }

  const handleDelete = (id) => {
    setAsserts(prev =>
      prev.filter(item => item.id != id)
    )
  }
  const update = () => {
    const as = asserts.find(emp => emp.id === editId);
    if (as.assignedto != assert.assignedto) {
      console.log('diff')
      const oldAssertEmp = employees.find(emp => emp.id == as.assignedto);
      console.log(oldAssertEmp.asserts)
      oldAssertEmp.asserts = oldAssertEmp.asserts.filter(assert => String(assert) !== String(as.assignedto))
      console.log(oldAssertEmp)
      setEmployees(prev =>
        prev.map(item => item.id ==  as.assignedto ? oldAssertEmp : item)
      )

      const newAssertEmp = employees.find(emp => emp.id == assert.assignedto);
      newAssertEmp?.asserts ?  newAssertEmp.asserts.push(assert.assignedto) : newAssertEmp.asserts = [assert.id]
      setEmployees(prev =>
        prev.map(item => item.id == assert.assignedto ? newAssertEmp : item)
      )
    }
    setAsserts(prev =>
      prev.map(item => item.id == editId ? { ...item, ...assert } : item)
    )
    handleClose()
    setAssert({
      id: "",
      name: "",
      category: "",
      assignedto: ""
    });
  }

  const handleChange = (e) => {
    setAssert(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (assert.assignedto !== 'avilable') {
        const employee = employees.find(employee => employee.id == assert.assignedto);
        employee?.asserts ? employee.asserts.push(assert.id) : employee.asserts = [assert.assignedto]
        let updated = employees.map(emp => emp.id === assert.assignedto ? { ...emp, ...employee } : emp)
        setEmployees(updated);

        localStorage.setItem('employees', JSON.stringify(employees))
      }
      setAsserts(prev => [...prev, assert])

      setAsCount(ascount + 1)

      setAssert({
        id: "",
        name: "",
        category: "",
        assignedto: ""
      })

      handleClose()
    }
  }

  const validate = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
    const error = {};
    if (!assert.name) error.name = "Name required";
    if (!assert.assignedto) error.assignedto = "assignedto required";
    if (!assert.category) error.category = "category required"

    setError(error);
    return Object.keys(error).length === 0;
  };

  const style = {
    background: 'radial-gradient(circle at 20% 80%, #e4c4ff 0%, transparent 20%), radial-gradient(circle at 80% 20%, #dfb8ff 0%, transparent 20%)'
  };

  useEffect(() => {
    setAsserts(JSON.parse(localStorage.getItem('asserts')) || [])
    setAsCount(JSON.parse(localStorage.getItem('ascount')) || 0)
    setEmployees(JSON.parse(localStorage.getItem('employees')) || [])

  }, [])

  useEffect(() => {
    const map = {}
    employees.forEach(employee => map[employee.id] = employee.name)
    setEmployeeMap(map)

    employees.length > 0 && localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees])


  // useEffect(()=>{
  //   console.log(employeeMap)
  // },[employeeMap])

  useEffect(() => {
    asserts.length > 0 && localStorage.setItem('asserts', JSON.stringify(asserts));
    setAssert(prev => ({ ...prev, id: (ascount + 1) }))
  }, [asserts])

  useEffect(() => {
    ascount && localStorage.setItem('ascount', JSON.stringify(ascount))
  }, [ascount])


  return (
    <div className='w-100 m-2' style={style}>
      <div className='text-start'>
        <Button variant="primary" onClick={handleShow}>
          <TiPlus /> Add assert
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
          <Modal.Title>Add new assert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className='row py-2'>
              <Form.Group className='form-group col-12 col-md-6'>
                <Form.Label className='mb-2'>assert ID</Form.Label>
                <Form.Control type='number' name='id' value={assert.id} onChange={(e) => handleChange(e)} disabled />
              </Form.Group>
              <Form.Group className='form-group col-12 col-md-6'>
                <Form.Label className='mb-2'>assert Name</Form.Label>
                <Form.Control type='text' name='name' value={assert.name} onChange={(e) => handleChange(e)} />
                {error.name && <Form.Text className='text-danger'>{error.name}</Form.Text>}
              </Form.Group>
            </Form.Group>
            <Form.Group className='row py-2'>
              <Form.Group className='form-group col-12 col-md-6'>
                <Form.Label className='mb-2'>category</Form.Label>
                <Form.Select type='text' name='category' value={assert.category} onChange={(e) => handleChange(e)} >
                  <option value=''>Select a category</option>
                  <option value='computer'>computer</option>
                  <option value='laptop'>laptop</option>
                </Form.Select>
                {error.category && <Form.Text className='text-danger'>{error.category}</Form.Text>}
              </Form.Group>
              <Form.Group className='form-group col-12 col-md-6'>
                <Form.Label className='mb-2'>assignedto</Form.Label>
                <Form.Select type='text' name='assignedto' value={assert.assignedto} onChange={(e) => handleChange(e)} >
                  <option value=''>Select a person</option>
                  {employees.map(employee => {
                    return <option key={employee.id} value={employee.id}>{employee.name}</option>
                  })}
                </Form.Select>
                {error.assignedto && <Form.Text className='text-danger'>{error.assignedto}</Form.Text>}
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
            <th>Category</th>
            <th>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {asserts.length > 0 ? asserts.map(assert => {
            let id = assert.assignedto;
            let assigned = id + '-' + employeeMap[id]
            return <tr key={assert.id}>
              <td>{assert.id}</td>
              <td>{assert.name}</td>
              <td>{assert.category}</td>
              <td>{assigned}</td>
              <td>
                <Button variant='warning' onClick={() => handleEdit(assert.id)}>Edit</Button>
                <Button variant='danger' onClick={() => handleDelete(assert.id)} >Delete</Button>
              </td>
            </tr>
          }) : <tr><td colSpan={5}>No Data</td></tr>}
        </tbody>
      </Table>
    </div>
  )
}

export default Assert











// import { useState, useEffect } from 'react'
// import axios from 'axios'
// function Contact() {
//   const [data, setDate] = useState([]);
//   const [ascount, setAsCount] = useState(0)

//   async function fetcher() {
//     await console.log(`---------fecth response----------`)
//     // https://phosphorous-nonfatally-celena.ngrok-free.dev/api/users
//     const axiosget = await axios.get(`https://jsonplaceholder.typicode.com/users`);
//     const skimed = axiosget.data.map(item => ({ ...item, address: item.address.street, company: item.company.name }))
//     setDate(skimed)
//   }

//   useEffect(() => {
//     fetcher()
//   }, [])


//   return (
//     <div className='d-block'>
//       <input type="number" value={ascount} onChange={(e) => setAsCount(e.target.value)} />
//       <table className='table striped'>
//         <thead>
//           <tr>
//             <td>id</td>
//             <td>name</td>
//             <td>username</td>
//             <td>assignedto</td>
//             <td>address</td>
//             <td>company</td>
//             <td>Phone</td>
//             <td>website</td>
//           </tr>
//         </thead>
//         <tbody>
//           {data.length > ascount ?  data.map((item, i) => {
//             return (ascount === 0 || i < ascount ) ? <tr>
//               <td>{item.id}</td>
//               <td>{item.name}</td>
//               <td>{item.username}</td>
//               <td>{item.assignedto}</td>
//               <td>{item.address}</td>
//               <td>{item.company}</td>
//               <td>{item.phone}</td>
//               <td>{item.website}</td>
//             </tr> : ""
//           }) : <h1>out of range</h1>}
//         </tbody>

//       </table>
//     </div>
//   )
// }

// export default Contact
