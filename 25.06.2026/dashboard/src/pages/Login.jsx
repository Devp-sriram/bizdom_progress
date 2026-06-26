import './Login.css'
import { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'

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
                navigate('/home')
            }else{
                setError(prev => ({...prev , auth:"Password doesn't match"}))
            }
        }
    }

    const validate = () => {
        const emailRegex = /^[a-z0-9_%+-]+(?:\.[a-z0-9_%+-]+)*@[a-z0-9.-]+\.[a-z]{2,}$/;
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
                <div className='m-2'>
                    {error.auth && <p className='text-danger'>{error.auth}</p>}
                    <button type='submit' className='w-100 btn btn-primary'>Submit</button>
                    <p>New user? signin here <Link to='/'>here</Link></p>
                </div>
            </form>
        </div>
    )
}
