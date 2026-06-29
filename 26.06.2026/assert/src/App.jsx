import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Dash from './pages/Dash'
import Home from './pages/Home'
import Employee from './pages/Employee'
import Asserts from './pages/Asserts'
import NotFound from './pages/NotFound';
import Signin from './pages/Signin';
import Login from './pages/Login'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />}>
            <Route index element={<Dash />} />
            <Route path="/home/employee" element={<Employee />} />
            <Route path="/home/asserts" element={<Asserts />} />
            <Route path="/home/*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
