import {useState} from 'react'

function Q7(){
    const [show , setShow] = useState(true)

    return <div className='border'>
        <h2>Q7</h2>
        {show && <p>Text</p> }
        
        <button onClick={()=>setShow(false)}>hide</button>
        <button onClick={()=>setShow(true)}>show</button>
    </div>
}

export default Q7