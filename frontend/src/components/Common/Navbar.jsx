import React, { useEffect, useRef, useState } from 'react';
import icon from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import CartDrawer from '../Layout/CartDrawer';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsByFilters } from '../../redux/slices/productSlice';

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

  const navDrawerRef = useRef(null);
  const cartDrawerRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  // Handles closing mobile nav when a link is clicked
  const handleMobileNavLink = (to) => {
    setNavDrawerOpen(false);
    navigate(to);
  };

  // Search: On enter or click, fetch filtered products and navigate to collections page
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Optionally, you can clear other filters or preserve them using Redux/global state
      dispatch(fetchProductsByFilters({ search: searchTerm.trim() }));
      navigate(`/collections/all?search=${searchTerm}`);
    }
  };

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
            <Link to="/collections/all?gender=Men" className="text-gray-700 hover:text-black text-sm font-medium">MEN</Link>
            <Link to="/collections/all?gender=Women" className="text-gray-700 hover:text-black text-sm font-medium">WOMEN</Link>
            <Link to="/collections/all?category=Top Wear" className="text-gray-700 hover:text-black text-sm font-medium">TOP WEAR</Link>
            <Link to="/collections/all?category=Bottom Wear" className="text-gray-700 hover:text-black text-sm font-medium">BOTTOM WEAR</Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <form
              className="flex items-center bg-[#eaeaea] rounded-md h-[40px] px-3 py-2 w-full sm:max-w-[300px] md:w-[400px] lg:max-w-[400px]"
              onSubmit={handleSearch}
            >
              <label htmlFor="search">
                <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </label>
              <input
                type="text"
                placeholder="Search..."
                id="search"
                className="w-full p-1 text-sm bg-transparent outline-none"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSearch(e); }}
                autoComplete="off"
              />
              <button type="submit" className="ml-2 text-gray-500 hover:text-black focus:outline-none">Go</button>
            </form>
            <div className="flex items-center space-x-4">
              {user && user.role === 'admin' && (
                <Link to="/admin" className='block bg-black px-2 rounded text-sm text-white'>Admin</Link>
              )}
              
              <Link to="/profile" className="text-gray-700 hover:text-black text-sm font-medium">
                <HiOutlineUser className="h-6 w-6 text-gray-700" />
              </Link>
              <button 
                onClick={toogleCartDrawer}
                className="relative hover:text-black text-sm font-medium cursor-pointer"
              >
                <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
                {cartItemCount > 0 && (
                  <span onClick={toogleCartDrawer} className="absolute -top-2 left-3 bg-amber-500 text-white rounded-full px-2 py-0.5 text-[0.6rem] font-bold">{cartItemCount}</span>
                )}
              </button>
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
              <button onClick={() => handleMobileNavLink('/login')} className="focus:outline-none">LOGIN</button>
              <span>/</span>
              <button onClick={() => handleMobileNavLink('/signup')} className="focus:outline-none">SIGN UP</button>
            </div>
          </div>
          <button onClick={toogleNavDrawer} className='hover:rounded-full hover:bg-gray-300 p-2 transform transition-all duration-300 '>
            <IoMdClose className="h-6 w-6 text-gray-700 " />
          </button>
        </div>

        <div className='p-4 flex flex-col'>
          <p className="text-xs font-semibold text-gray-500 mb-4">SHOP IN</p>
          <nav className="space-y-4">
            <button
              onClick={() => handleMobileNavLink('/collections/all?gender=Men')}
              className="flex items-center space-x-3 text-gray-700 hover:text-black text-sm font-medium text-left w-full"
            >MEN</button>
            <button
              onClick={() => handleMobileNavLink('/collections/all?gender=Women')}
              className="flex items-center space-x-3 text-gray-700 hover:text-black text-sm font-medium text-left w-full"
            >WOMEN</button>
            <button
              onClick={() => handleMobileNavLink('/collections/all?category=Top Wear')}
              className="flex items-center space-x-3 text-gray-700 hover:text-black text-sm font-medium text-left w-full"
            >TOP WEAR</button>
            <button
              onClick={() => handleMobileNavLink('/collections/all?category=Bottom Wear')}
              className="flex items-center space-x-3 text-gray-700 hover:text-black text-sm font-medium text-left w-full"
            >BOTTOM WEAR</button>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;