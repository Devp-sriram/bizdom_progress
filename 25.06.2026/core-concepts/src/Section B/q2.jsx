import { useEffect } from "react";

function Q2() {
    useEffect(() => {
        console.log("Hello");
    }, []);

    return <div className='border'>
        <h2>Q2</h2>
    </div>
}

export default Q2

