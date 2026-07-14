import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Dash from './pages/Dash';
import Login from './pages/Login';
import Signin from './pages/Signin';

import Employees from './pages/Employee';
import Asserts from './pages/Assert'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} >
            <Route index element={<Dash />} />
            <Route path="/home/employees" element={<Employees/>} />
            <Route path="/home/asserts" element={<Asserts/>} />
          </Route>
         <Route path="/signin" element={<Signin />} />
         <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App