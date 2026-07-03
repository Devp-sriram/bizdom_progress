import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import { Container } from 'react-bootstrap';

import Header from './components/Header'
import Hero from './components/Hero'
import Show from './components/Show'
import Premium from './components/Premium'
import Transparent  from './components/transparent';
import Bake from './components/Bake'
import Footer from './components/Footer';

function App() {

  return (
    <Container>
      <Header/>
      <Hero/>
      <Show/>
      <Premium/>
      <Transparent/>
      <Footer/>
    </Container>
  )
}

export default App
