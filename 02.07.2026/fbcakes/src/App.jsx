import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import { Container } from 'react-bootstrap';

import Header from './components/Header'
import Hero from './components/Hero'
import Show from './components/Show'
import Premium from './components/Premium'

function App() {

  return (
    <Container>
      <Header/>
      <Hero/>
      <Show/>
      <Premium/>
    </Container>
  )
}

export default App
