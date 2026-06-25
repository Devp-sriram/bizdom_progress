import {useState} from 'react'

function Q6(){
    const [count , setCount] = useState(0);

    return <div className='border'>
        <h2>Q6</h2>
        <p>{count}</p>
        <button onClick={()=>setCount(count +1)}>increment</button>
        <button onClick={()=>setCount(count -1)}>decrement</button>
        <button onClick={()=>setCount(0)}>reset</button>
    </div>
}

export default Q6