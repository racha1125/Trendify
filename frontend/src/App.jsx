import React from 'react'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home/>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App