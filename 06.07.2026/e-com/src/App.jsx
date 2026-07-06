import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Product from './pages/Product';
import Hero from './pages/Hero';
import Cart from './pages/Cart';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
             <Route index element={<Hero/>}/>
             <Route path='/products' element={<Product />} />
             <Route path='/cart' element={<Cart />} />
          </Route>
          {/* <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />}>
            <Route index element={<Dash />} />
          </Route> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
