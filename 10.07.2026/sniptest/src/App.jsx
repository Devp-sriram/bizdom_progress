
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Dash from './pages/Dash';
import Users from './pages/Users';
import Products from './pages/Products'
import Signin from './pages/Signin'
import Login from './pages/Login'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/home" element={<Home />}>
            <Route index element={<Dash />} />
            <Route path="/home/users" element={<Users />} />
            <Route path="/home/products" element={<Products />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App