import './Login.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaEyeSlash , FaEye} from "react-icons/fa";

export default function Login() {
    const navigate = useNavigate();
    const [showPw, setShowPw] = useState(false)
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('auth')) || [])
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState({
        email: "",
        password: "",
        auth: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value.trim()
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let user = users.find(user => user.email === data.email);
        if (validate()) {
            if (!user) {
                setError(prev => ({ ...prev, auth: 'User not found' }))
                console.log(error)
                return
            }

            if (user.password === data.password) {
                localStorage.setItem('loggedIn', JSON.stringify(user))
                navigate('/home')
            } else {
                setError(prev => ({ ...prev, auth: "Password doesn't match" }))
            }
        }
    }

    const validate = () => {
        const emailRegex = /^[A-Za-z0-9_%+-]+(?:\.[A-Za-z0-9_%+-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;;
        const error = {};
        if (!data.email || !data.email.trim()) {
            error.email = "Email required"
        } else if (!emailRegex.test(data.email)) {
            error.email = "not a valid email";
        }
        if (!data.password || !data.password.trim()) {
            error.password = 'Password required'
        } else if (data.password.length < 8) {
            error.password = "Password should be 8 or above characters";
        }

        setError(error);
        return Object.keys(error).length === 0;
    };
    return (
        <section className='outbox d-flex justify-content-center align-items-center'>
            <Form onSubmit={(e) => handleSubmit(e)} className='box border form rounded m-2 text-start'>
                <h3 className='my-3 text-center'>Login</h3>
                <Form.Group className='form-group m-2 text-start'>
                    <Form.Label className='p-2'>Email</Form.Label>
                    <Form.Control type='text' name='email' value={data.email} onChange={(e) => handleChange(e)} />
                </Form.Group>
                    {error.email && <p className='text-danger ms-2'>{error.email}</p>}
                <Form.Group className='form-group m-2 text-start position-relative'>
                    <Form.Label className='p-2'>Password</Form.Label>
                    <Form.Control type={showPw ? 'text' : 'password'} name='password' value={data.password} onChange={(e) => handleChange(e)} />
                    {showPw ? <FaEyeSlash onClick={() => setShowPw(!showPw)} className='position-absolute' style={{ right: "10px", bottom: '10px' }} />
                        : <FaEye onClick={() => setShowPw(!showPw)} className='position-absolute' style={{ right: "10px", bottom: '10px' }} />
                    }
                </Form.Group>
                    {error.password && <p className='text-danger ms-2'>{error.password}</p>}
                <Form.Group className='m-2 text-center'>
                    {error.auth && <p className='text-danger'>{error.auth}</p>}
                    <Button type='submit' className='w-100 btn btn-primary'>Submit</Button>
                    <Form.Text >New user? signin <Link to='/signin'>here</Link></Form.Text>
                </Form.Group>
            </Form>
        </section>
    )
}