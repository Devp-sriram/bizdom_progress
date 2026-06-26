import './Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signin() {
    const navigate = useNavigate();
    const [users , setUsers] = useState(JSON.parse(localStorage.getItem('users')) || [])
    const [error , setError] = useState('')
    const [data, setData] = useState({
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
        let user = users.find(user=> user.email === data.email);
        if(!user)  setError('User not found')
        if(user.password === data.password){
            navigate('/home')
        }else{
            setError("Password doesn't match")
        }
    }
    return (
        <div className='outbox d-flex justify-content-center align-items-center'>
            <form onSubmit={(e) => handleSubmit(e)} className='box border form rounded m-2'>
                <h3 className='my-3'>Login</h3>
                <div className='form-group m-2 text-start'>
                    <label className='p-2'>Email</label>
                    <input type='text' name='email' className='form-control' value={data.email} onChange={(e) => handleChange(e)} />
                    {error.email && <p className='text-danger'>{error.email}</p>}
                </div>
                <div className='form-group m-2 text-start'>
                    <label className='p-2'>Password</label>
                    <input type='password' name='password' className='form-control' value={data.password} onChange={(e) => handleChange(e)} />
                    {error.password && <p className='text-danger'>{error.password}</p>}
                </div>
                <div className='m-2 text-start'>
                    {error && <p className='text-danger'>{error}</p>}
                    <button type='submit' className='w-100 btn btn-primary'>Submit</button>
                </div>
            </form>
        </div>
    )
}
