import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home';
import Order from './pages/Order'
import User from './pages/User';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Order />} />
            <Route path='/users' element={<User />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
