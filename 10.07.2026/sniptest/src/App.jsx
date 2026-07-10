
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Dash from './pages/Dash';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />}>
            <Route index element={<Dash/>} />
            <Route path="/signin" element={<Signin />} />
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App