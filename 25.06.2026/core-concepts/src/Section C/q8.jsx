import {useState} from 'react'

function Q8(){
    const [text , setText] = useState('')

    return <div className='border'>
        <h2>Q8</h2>
       <input type='text' value={text} onChange={(e)=>setText(e.target.value)}/>
       <br/>
       <p>{text}</p>
    </div>
}

export default Q8