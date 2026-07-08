import './Signin.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';

export default function Signin() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [error, setError] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            let users = JSON.parse(localStorage.getItem('auth')) || [];
            console.log(users)
            users.push(data)
            localStorage.setItem('auth', JSON.stringify(users))
            setData({
                name: "",
                email: "",
                password: ""
            })
            navigate('/')
        }
    }
    const validate = () => {
       const emailRegex = /^[A-Za-z0-9_%+-]+(?:\.[A-Za-z0-9_%+-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;;
         const error = {};
        if (!data.name) error.name = "Name required";
        if (!data.email) error.email = "email required";
        if (!emailRegex.test(data.email)) error.email = "not a valid email";
        if (data.password.length < 8) error.password = "Password should be 8 or above characters";

        setError(error);
        console.log(error);
        return Object.keys(error).length === 0;
    };
    return (
        <section className='outbox d-flex justify-content-center align-items-center'>
            <Form onSubmit={(e) => handleSubmit(e)} className='box border form rounded m-2'>
                <h3 className='my-3'>Signin</h3>
                <Form.Group className='form-group m-2 text-start'>
                    <Form.Label className='p-2'>Name</Form.Label>
                    <Form.Control type='text' name='name' value={data.name} onChange={(e) => handleChange(e)} />
                    {error.name && <p className='text-danger'>{error.name}</p>}
                </Form.Group>
                <Form.Group className='form-group m-2 text-start'>
                    <Form.Label className='p-2'>Email</Form.Label>
                    <Form.Control type='text' name='email' value={data.email} onChange={(e) => handleChange(e)} />
                    {error.email && <p className='text-danger'>{error.email}</p>}
                </Form.Group>
                <Form.Group className='form-group m-2 text-start'>
                    <Form.Label className='p-2'>Password</Form.Label>
                    <Form.Control type='password' name='password' value={data.password} onChange={(e) => handleChange(e)} />
                    {error.password && <p className='text-danger'>{error.password}</p>}
                </Form.Group>
                <Form.Group className='m-2'>
                    <button type='submit' className='w-100 btn btn-primary'>Submit</button>
                    <Form.Text>Already signed up login here <Link to='/'>here</Link></Form.Text>
                </Form.Group>
            </Form>
        </section>
    )
}