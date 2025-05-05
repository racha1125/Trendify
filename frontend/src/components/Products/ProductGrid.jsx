import React from 'react';
import {Link} from "react-router-dom";

function ProductGrid({products}) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10'>
        {products.map((product,index)=>(
            <Link key={index} to={`/product/${product._id}`} className="block">
                <div className='bg-white rounded-lg '>
                    <div className='w-full h-auto mb-4'>
                        <img 
                            src={product.images[0].url} 
                            alt={product.images[0].altText} 
                            className='w-full h-80 object-cover rounded-lg'
                        />
                    </div>
                    <h3 className='text-sm mb-2'>{product.name}</h3>
                    <p className='text-gray-500 font-medium text-sm tracking-tighter'>
                        $ {product.price}
                    </p>
                </div>
            </Link>
        ))}
    </div>
  )
}

export default ProductGrid