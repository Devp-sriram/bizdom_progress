import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Dash from './pages/Dash';
import Login from './pages/Login';
import Signin from './pages/Signin';

import Employees from './pages/Employee'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />}>
            <Route index element={<Dash />} />
            <Route path="/home/employees" element={<Employees/>} />
          </Route>
         <Route path="/signin" element={<Signin />} />
         <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App