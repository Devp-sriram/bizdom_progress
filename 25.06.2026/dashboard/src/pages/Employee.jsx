import { useState, useEffect } from 'react'
import { TiPlus } from "react-icons/ti";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Employee() {
  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    department: "",
    email: ""
  });

  const [employees, setEmployees] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setEmployee(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    setEmployees(JSON.parse(localStorage.getItem('employees')) || [])
  }, [])


  return (
    <div className='w-100 m-2'>
      <div className='text-start'>
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
          <form className='form' onSubmit={(e) => handleSubmit(e)}>
            <div className='row py-2'>
              <div className='form-group col-12 col-md-6'>
                <label className='mb-2'>Employee ID</label>
                <input type='number' name='id' className='form-control' value={employee.id} onChange={(e) => handleChange(e)} />
              </div>
              <div className='form-group col-12 col-md-6'>
                <label className='mb-2'>Employee Name</label>
                <input type='text' name='name' className='form-control' value={employee.name} onChange={(e) => handleChange(e)} />
              </div>
            </div>
            <div className='row py-2'>
              <div className='form-group col-12 col-md-6'>
                <label className='mb-2'>Department</label>
                <select type='text' name='department' className='form-select' value={employee.department} onChange={(e) => handleChange(e)} >
                    <option value='engineering'>Engineering</option>
                    <option value='sales'>Sales</option>
                    <option value='content creation'>Content Creation</option>
                </select>
              </div>
              <div className='form-group col-12 col-md-6'>
                <label className='mb-2'>Email</label>
                <input type='email' name='email' className='form-control' value={employee.email} onChange={(e) => handleChange(e)} />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" >
            Reset
          </Button>
          <Button variant="success" type='submit'>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Employee
