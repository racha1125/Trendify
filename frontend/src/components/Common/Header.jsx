import React from 'react'
import Topbar from '../Layout/Topbar'
import Navbar from './Navbar'

function Header() {
  return (
    <div className="header">
      <Topbar />
      <Navbar />
    </div>
  );
}

export default Header