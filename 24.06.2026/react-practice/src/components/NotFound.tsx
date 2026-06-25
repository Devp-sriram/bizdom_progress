import Header from './Header';
import Sidebar from './Sidebar';


const NotFound = () => {
    return (
        <>
            <Header />
            <section className='d-flex'>
                <Sidebar />
                <h1>Not Found</h1>
            </section>
        </>
    )
}

export default NotFound