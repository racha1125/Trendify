import React from 'react'
import { MdDeleteOutline } from "react-icons/md";
function CartContents() {
    const cartProducts = [
        {
            ProductId: 1, 
            name: 'T-shirt',
            size:"M",
            color:"Red",
            quantity: 1,
            price: 10,
            image:"https://media.istockphoto.com/id/471188329/photo/plain-red-tee-shirt-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=h1n990JR40ZFbPRDpxKppFziIWrisGcE_d9OqkLVAC4=",
        }, 
        {
          ProductId: 2, 
          name: 'Jeans',
          size:"L",
          color:"Blue",
          quantity: 1,
          price: 25,
          image:"https://www.rockstarjeans.com/cdn/shop/products/RDQ0003_1.jpg?v=1673620233",
        },

        ];
  return (
    <div>
      {cartProducts.map((product, index)=> (
          <div 
          key={index} 
          className='flex items-start justify-between border-b border-gray-300 py-4'
          >
            <div className='flex items-start'>
              <img 
              src={product.image} 
              alt={product.name} 
              className='w-20 h-24 object-cover mr-4 rounded' 
            />
              <div>
                <h3>{product.name}</h3>
                <p className='text-sm text-gray-500'>
                  size: {product.size} | color: {product.color}
                </p>
                <div className='flex items-center mt-1 gap-0'>
                  <button className='border rounded px-2 py-1 text-l font-medium cursor-pointer'>-</button>
                  <span className='mx-4'>{product.quantity}</span>
                  <button className='border rounded px-2 py-1 text-l font-medium cursor-pointer'>+</button>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-start
            gap-1 justify-center'>
              <p>${product.price}</p>
              <button>
                <MdDeleteOutline className="h-6 w-6 mt-2 text-red-600 cursor-pointer"/>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default CartContents