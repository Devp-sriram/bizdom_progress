
function Q9() {
    const fruits = ["Apple", "Orange", "Mango"];

    return <div className='border'>
        <h2>Q8</h2>
        {fruits.map((fruit,i)=> <span key={i}>{fruit}</span>)}
        </div>
}

export default Q9