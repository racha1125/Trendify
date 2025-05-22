import React from 'react'
import { IoMdClose } from 'react-icons/io';
import CartContents from '../Cart/CartContents';
import { useNavigate } from 'react-router-dom';

function CartDrawer({ drawerOpen, toogleCartDrawer }) {
  const navigate = useNavigate();
  const handleCheckout = () => {
    toogleCartDrawer();
    navigate("/checkout");
  };

  return (
    <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
      {/* Close Button */}
      <div className='flex justify-end p-4'>
        <button onClick={toogleCartDrawer} cursor='pointer' className='p-2 rounded-full hover:bg-gray-200 transition duration-300'>
          <IoMdClose className='h-6 w-6'/>
        </button>
      </div>
      {/* Cart content can go here */}
      <div className='flex-grow p-4 overflow-y-auto'>
        <h2 className='text-lg font-semibold text-center'>Your Cart</h2>
        {/* <div className='flex flex-col items-center justify-center h-full'>
          <p className='text-gray-500'>Your cart is empty.</p>
          <button onClick={toogleCartDrawer} className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300'>Continue Shopping</button>
        </div> */}
        {/* Cart components */}
        <CartContents/>
      </div>
      {/* Check Out Button */}
      <div className='p-4 bg-white sticky bottom-0'>
        <button onClick={handleCheckout} className='w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 cursor-pointer' >Checkout</button>
        <p>
          Shipping, taxes, and discounts will be calculated at checkout.
        </p>
      </div>
    </div>
  );
}

export default CartDrawer;
