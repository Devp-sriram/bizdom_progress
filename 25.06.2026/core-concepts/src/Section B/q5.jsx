import { useState } from 'react'

function Q5() {
    const [name, setName] = useState("");
    return <div className='border'>
        <h2>Q5</h2>
        <input
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
    </div>
}

export default Q5

