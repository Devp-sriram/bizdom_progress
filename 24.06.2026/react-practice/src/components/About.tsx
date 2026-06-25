import Header from './Header';
import Sidebar from './Sidebar'

const About = () => {
     return (
         <>
            <Header />
             <section className='d-flex'>
                <Sidebar />
                <h1>About</h1>
            </section>
        </>
    )
}

export default About