import './Login.css'
import { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Signin() {
    const navigate = useNavigate();
    const [users , setUsers] = useState(JSON.parse(localStorage.getItem('users')) || [])
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState({
        email: "",
        password: "",
        auth : ""
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
        let user = users.find(user=> user.email === data.email);
        if(!user) {
            setError(prev => ({...prev , auth:'User not found'}))
            console.log(error)
            return
        }
        if(validate(user)){ 
            if(user.password === data.password){
                localStorage.setItem('loggedIn', JSON.stringify(user))
                navigate('/')
            }else{
                setError(prev => ({...prev , auth:"Password doesn't match"}))
            }
        }
    }

    const validate = () => {
        const emailRegex = /^[A-Za-z0-9_%+-]+(?:\.[A-Za-z0-9_%+-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;;
        const error = {};
        if (!data?.email) error.email = "email required";
        if(data.email){
            if (!emailRegex.test(data?.email)) error.email = "not a valid email";
        }
        if (data.password.length < 8) error.password = "Password should be 8 or above characters";
        if(!data.password) error.password = 'Password Required'

        setError(error);
        return Object.keys(error).length === 0;
    };
    return (
        <section className='outbox d-flex justify-content-center align-items-center'>
            <Form onSubmit={(e) => handleSubmit(e)} className='box border form rounded m-2'>
                <h3 className='my-3'>Login</h3>
                <Form.Group className='form-group m-2 text-start'>
                    <Form.Label className='p-2'>Email</Form.Label>
                    <Form.Control  type='text' name='email' value={data.email} onChange={(e) => handleChange(e)} />
                    {error.email && <p className='text-danger'>{error.email}</p>}
                </Form.Group>
                <Form.Group className='form-group m-2 text-start'>
                    <Form.Label className='p-2'>Password</Form.Label>
                    <Form.Control type='password' name='password' value={data.password} onChange={(e) => handleChange(e)} />
                    {error.password && <p className='text-danger'>{error.password}</p>}
                </Form.Group>
                <Form.Group className='m-2'>
                    {error.auth && <p className='text-danger'>{error.auth}</p>}
                    <Button type='submit' className='w-100 btn btn-primary'>Submit</Button>
                    <Form.Text>New user? signin here <Link to='/signin'>here</Link></Form.Text>
                </Form.Group>
            </Form>
        </section>
    )
}
