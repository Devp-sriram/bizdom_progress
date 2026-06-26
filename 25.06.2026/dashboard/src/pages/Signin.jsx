import './Signin.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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
            let users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(data)
            localStorage.setItem('users',JSON.stringify(users))
            setData({
                name: "",
                email: "",
                password: ""
            })
            navigate.to('/login')
        }
    }
    const validate = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const newErrors = {};
        if (!data.name) error.name = "Name required";
        if (!data.email) error.email = "email required";
        if (!emailRegex.test(data.email)) error.email = "not a valid email";
        if (!data.password.length < 8) error.password = "Password should be 8 or above characters";

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    return (
        <div className='outbox d-flex justify-content-center align-items-center'>
            <form onSubmit={(e) => handleSubmit(e)} className='box border form rounded m-2'>
                <h3 className='my-3'>Signin</h3>
                <div className='form-group m-2 text-start'>
                    <label className='p-2'>Name</label>
                    <input type='text' name='name' className='form-control' value={data.name} onChange={(e) => handleChange(e)} />
                    {error.name && <p className='text-danger'>{error.name}</p>}
                </div>
                <div className='form-group m-2 text-start'>
                    <label className='p-2'>Email</label>
                    <input type='email' name='email' className='form-control' value={data.email} onChange={(e) => handleChange(e)} />
                    {error.email && <p className='text-danger'>{error.email}</p>}
                </div>
                <div className='form-group m-2 text-start'>
                    <label className='p-2'>Password</label>
                    <input type='password' name='password' className='form-control' value={data.password} onChange={(e) => handleChange(e)} />
                    {error.password && <p className='text-danger'>{error.password}</p>}
                </div>
                <div className='m-2'>
                    <button type='submit' className='w-100 btn btn-primary'>Submit</button>
                </div>
            </form>
        </div>
    )
}
