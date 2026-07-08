import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Signin from './pages/Signin';
import Login from './pages/Login'
import Dash from './pages/Dash'
import Users from './pages/Users'
import Products from './pages/Products'
import Orders from './pages/Orders'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />}>
            <Route index element={<Dash />} />
            <Route path="/home/users" element={<Users />} />
            <Route path="/home/products" element={<Products />} />
            <Route path="/home/orders" element={<Orders />} />
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App