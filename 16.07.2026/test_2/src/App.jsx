// css
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// pages
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart'
import Phone from './pages/Phone';
import Success from './pages/Success';
import Redirect from './pages/Redirect'

function App() {
  // main routes
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/phone" element={<Phone />} />
        <Route path="/success" element={<Success />} />
        <Route path="redirect" element={<Redirect />} />
      </Routes>
    </Router>
  )
}

export default App
