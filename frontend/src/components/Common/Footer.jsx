import { Link } from 'react-router-dom';
import React from 'react';
import { TbBrandMeta } from 'react-icons/tb';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineTruck } from "react-icons/hi2";
import { BsCashCoin } from "react-icons/bs";

function Footer() {
  return (
    <footer className='border-t py-12'>
      <div className='flex items-start flex-col lg:flex-row justify-around gap-5 px-4'>
        <div>
          <h3 className='text-lg mb-4 font-semibold'>KEEP UP TO DATE</h3>
          {/* Newsletter form */}
          <form className='flex'>
            <input type="email" placeholder='Enter Email Id:' 
            className='p-3 w-full text-sm border-t border-l border-b border-gray-300
            rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all' required/>
            <button type='submit' className='bg-black text-white
            px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all'>
              Subscribe
            </button>
          </form>
        </div>
        {/* Shop Links */}
        <div>
          <h3 className='text-lg  mb-4 font-semibold'>CUSTOMER SERVICE</h3>
          <ul className='space-y-2 text-gray-600'>
            <li>
              <Link to="#" className='hover:text-gray-600 transition-colors '>Contact Us</Link>
            </li>
            <li>
              <Link to="#" className='hover:text-gray-600 transition-colors '>Track Order</Link>
            </li>
            <li>
              <Link to="#" className='hover:text-gray-600 transition-colors '>Return Order</Link>
            </li>
            <li>
              <Link to="#" className='hover:text-gray-600 transition-colors '>Cancel Order</Link>
            </li>
            <li>
              <Link to="#" className='hover:text-gray-600 transition-colors flex gap-2'>
                <HiOutlineTruck class="h-5 w-5 text-gray-600" />
                <p>15 Days Return Policy*</p>
              </Link>
            </li>
            <li>
              <Link to="#" className='hover:text-gray-600 transition-colors flex gap-2'>
                <BsCashCoin class="h-5 w-5 text-gray-600" />
                <p>Cash On Delivery*</p>
              </Link>
            </li>
          </ul>
        </div>
        {/* Support Links */}
        <div>
          <h3 className='text-lg mb-4 font-semibold'>COMPANY</h3>
          <ul className='space-y-2 text-gray-600'>
            <li>
              <Link to="#" className='hover:text-gray-600 transition-colors '>
              About Us
              </Link>
            </li>
            <li>
              <Link to="#" className='hover:text-gray-600 transition-colors '>
              Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="#" className='hover:text-gray-600 transition-colors '>
              FAQ's
              </Link>
            </li>
            <li>
              <Link to="#" className='hover:text-gray-600 transition-colors '>
              Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        {/* Follow Us */}
        <div>
          <h3 className='text-lg mb-4 font-semibold'>CONNECT WITH US</h3>
          <div className='flex items-center space-x-4 mb-6'>
            <a href="https://www.facebook.com" target="_blank" rel="noopner noreferrer"
            className='hover:text-gray-300'>
              <TbBrandMeta className='h-5 w-5'/>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopner noreferrer"
            className='hover:text-gray-300'>
              <IoLogoInstagram  className='h-5 w-5'/>
            </a>
            <a href="https://www.x.com" target="_blank" rel="noopner noreferrer"
            className='hover:text-gray-300'>
              <RiTwitterXLine className='h-5 w-5'/>
            </a>
          </div>
          <p className='text-gray-500'>Call Us</p>
          <p>
            <FiPhoneCall className='h-5 w-5 inline-block mr-2'/>
            0123-456-789
          </p>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6'>
        <p className='text-gray-500 text-sm tracking-lighter text-center'>
          &copy; 2025, Trendify. All rights reserved.
        </p>
      </div>
    </footer>
  //   <div className="flex flex-col items-center justify-around w-full h-[200px] bg-[#f5f5f5] mt-10">
  //     <div>
  //       <div className=" text-gray-700 text-sm font-medium">
  //         &copy; 2023 Your Company. All rights reserved.
  //       </div>       
  //     </div>
  //     <div>
  //       <Link className="hover:text-black">Privacy Policy</Link>
  //       <Link className="hover:text-black">Terms of Service</Link> 
  //       <Link className="hover:text-black">Contact Us</Link>
  //     </div> 
  //   </div>
  )
}

export default Footer