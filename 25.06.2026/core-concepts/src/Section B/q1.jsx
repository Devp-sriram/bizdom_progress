import { useState } from 'react'

function Q1() {
    const [count, setCount] = useState(0);
    return <div className='border'>
        <h2>Q1</h2>
        <p>{count}</p>
        <button onClick={() => setCount(count + 1)}>
            Click
        </button>
    </div>
}
export default Q1
