import React from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import { Outlet } from 'react-router-dom'

function UserLayout() {
  return (
    <>
      {/* Header Section */}
      <Header/>
      <main>
        <Outlet/>
      </main>
      {/* Footer Section */}
      <Footer/>
    </>
    
  )
}

export default UserLayout