import React from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../../redux/slices/cartSlice';

function CartContents({ cart, userId, guestId }) {
  const dispatch = useDispatch();

  // Handle adding/removing items from cart
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  const handleDecrement = (productId, quantity, size, color) => {
    // If quantity is 1 and user clicks "-", remove from cart.
    if (quantity === 1) {
      dispatch(removeFromCart({ productId, guestId, userId, size, color }));
    } else {
      handleAddToCart(productId, -1, quantity, size, color);
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, guestId, userId, size, color }));
  };

  if (!cart?.products?.length) {
    return <div className="text-gray-500 text-center py-10">Your cart is empty.</div>;
  }

  return (
    <div>
      {cart.products.map((product) => (
        <div
          key={product._id || product.productId}
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
                <button
                  onClick={() =>
                    handleDecrement(
                      product.productId,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className='border rounded px-2 py-1 text-l font-medium cursor-pointer'>
                  -
                </button>
                <span className='mx-4'>{product.quantity}</span>
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className='border rounded px-2 py-1 text-l font-medium cursor-pointer'>
                  +
                </button>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-start gap-1 justify-center'>
            <p>${product.price}</p>
            <button
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.size,
                  product.color
                )
              }
            >
              <MdDeleteOutline className="h-6 w-6 mt-2 text-red-600 cursor-pointer" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartContents;