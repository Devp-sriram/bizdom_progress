import Header from './Header';
import Sidebar from './Sidebar'

const Contact = () => {
    return (
         <>
            <Header />
            <section className='d-flex'>
                <Sidebar />
                <h1>Contact</h1>
            </section>
        </>
    )
}

export default Contact