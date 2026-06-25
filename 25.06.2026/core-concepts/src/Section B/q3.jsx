function Q3() {

    const arr = [1, 2, 3];

    return (
        <div className='border'>
            <h2>Q3</h2>
            {arr.map((item) => (
                <p key={item}>{item}</p>
            ))}
        </div>
    );
}
export default Q3

