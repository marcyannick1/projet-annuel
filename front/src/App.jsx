import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import UsersJSX from './components/users/UsersJSX'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <div className="content">
      <Routes>
        <Route path='/UsersJSX' element={<UsersJSX />} />



      </Routes>
    </div>
  </Router>
  )
}

export default App