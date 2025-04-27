import React, { useEffect, useRef, useState } from 'react';
import icon from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import CartDrawer from '../Layout/CartDrawer';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const navDrawerRef = useRef(null);
  const cartDrawerRef = useRef(null);

  const toogleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toogleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navDrawerOpen && navDrawerRef.current && !navDrawerRef.current.contains(event.target)) {
        setNavDrawerOpen(false);
      }
      if (drawerOpen && cartDrawerRef.current && !cartDrawerRef.current.contains(event.target)) {
        setDrawerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [navDrawerOpen, drawerOpen]);

  return (
    <>
      <nav className="px-3 py-3 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-around gap-x-4 w-full">
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/">
              <img src={icon} alt="Logo" className="h-7 w-auto" />
            </Link>
          </div>

          {/* Center Links (hidden on mobile) */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-black text-sm font-medium">MEN</Link>
            <Link to="/" className="text-gray-700 hover:text-black text-sm font-medium">WOMEN</Link>
            <Link to="/" className="text-gray-700 hover:text-black text-sm font-medium">KIDS</Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="flex items-center bg-[#eaeaea] rounded-md h-[40px] px-3 py-2 w-full sm:max-w-[300px] md:w-[400px] lg:max-w-[400px]">
              <label htmlFor="search">
                <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </label>
              <input type="text" placeholder="Search..." id="search" className="w-full p-1 text-sm bg-transparent outline-none" />
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-black text-sm font-medium">LOGIN</Link>
              <Link to="/" className="relative text-gray-700 hover:text-black text-sm font-medium" id='cart'>
                <svg id="cart" onClick={toogleCartDrawer} xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2" className="lucide-shopping-cart">
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 002 1.58h9.78a2 2 0 001.95-1.57l1.65-7.43H5.12" />
                </svg>
                <span onClick={toogleCartDrawer} className="absolute -top-2 left-3 bg-amber-500 text-white rounded-full px-2 py-0.5 text-[0.6rem] font-bold">0</span>
              </Link>
            </div>
          </div>

          {/* Hamburger Menu */}
          <button onClick={toogleNavDrawer} className="md:hidden cursor-pointer">
            {navDrawerOpen ? (
              <IoMdClose className="h-6 w-6 text-gray-700" />
            ) : (
              <GiHamburgerMenu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <div ref={cartDrawerRef}>
        <CartDrawer drawerOpen={drawerOpen} toogleCartDrawer={toogleCartDrawer} />
      </div>

      {/* Mobile Navigation */}
      <div ref={navDrawerRef} className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-3/4 h-full 
        bg-white shadow-lg transform transition-transform duration-300 
        z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`} style={{ width: '250px' }}>
        
        <div className='flex justify-between items-center p-4 border-b'>
          <div className="flex flex-col">
            <span className='text-gray-800 font-semibold'>Hey There!</span>
            <div className="flex space-x-2 text-blue-500 text-sm hover:text-blue-700 hover:underline font-semibold">
              <Link to="/login">LOGIN</Link>
              <span>/</span>
              <Link to="/signup">SIGN UP</Link>
            </div>
          </div>
          <button onClick={toogleNavDrawer} className='hover:rounded-full hover:bg-gray-300 p-2 transform transition-all duration-300 '>
            <IoMdClose className="h-6 w-6 text-gray-700 " />
          </button>
        </div>

        <div className='p-4 flex flex-col'>
          <p className="text-xs font-semibold text-gray-500 mb-4">SHOP IN</p>
          <nav className="space-y-4">
            {[
              "MEN",
              "WOMEN",
              "KIDS",
              "Trendify Turns 13",
              "City Tees",
              "Customize with Google Ai",
              "Winterwear Store",
              "Shop by Fandom",
              "Specials",
            ].map((item, index) => (
              <Link
                key={index}
                to="#"
                className="flex items-center space-x-3 text-gray-700 hover:text-black text-sm font-medium"
              >{item}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
