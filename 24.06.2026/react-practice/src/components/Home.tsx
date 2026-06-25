import {useState} from 'react'
const Home = () => {
    let [count , setCount] = useState(1)

    return (
        <>
        <p>{count}</p>
        <button onClick={()=>setCount(count+1)}>add</button>
            {/* <Header />
            <section className='d-flex'>
                <Sidebar />
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </section> */}
        </>
    )
}

export default Home