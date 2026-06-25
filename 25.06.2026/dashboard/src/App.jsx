import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Dash from './pages/Dash'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound';

function App() {

  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<Home/>} >
              <Route index element={<Dash/>}/>
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/*" element={<NotFound />} />
            </Route>
          </Routes>
      </Router>
    </>
  )
}

export default App
