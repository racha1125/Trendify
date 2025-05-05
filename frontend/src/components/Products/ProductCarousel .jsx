import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function ProductCarousel({ products }) {
  const ITEMS_PER_PAGE = 5;
  const ITEM_WIDTH = 250;
  const MARGIN_RIGHT = 20;
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const [pageIndex, setPageIndex] = useState(0);

  const handleScroll = (direction) => {
    if (direction === 'left' && pageIndex > 0) {
      setPageIndex((prev) => prev - 1);
    } else if (direction === 'right' && pageIndex < totalPages - 1) {
      setPageIndex((prev) => prev + 1);
    }
  };

  const VIEWPORT_WIDTH = (ITEM_WIDTH + MARGIN_RIGHT) * ITEMS_PER_PAGE - MARGIN_RIGHT;
  const isLeftDisabled = pageIndex === 0;
  const isRightDisabled = pageIndex >= totalPages - 1;

  return (
    <div className="relative mx-auto" style={{ width: VIEWPORT_WIDTH }}>
      {/* Left Arrow */}
      <button
        className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 cursor-pointer transition-opacity ${
          isLeftDisabled ? 'opacity-50' : 'hover:bg-gray-100'
        }`}
        onClick={() => handleScroll('left')}
        disabled={isLeftDisabled}
      >
        <ChevronLeft />
      </button>

      {/* Right Arrow */}
      <button
        className={`absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 cursor-pointer transition-opacity ${
          isRightDisabled ? 'opacity-50' : 'hover:bg-gray-100'
        }`}
        onClick={() => handleScroll('right')}
        disabled={isRightDisabled}
      >
        <ChevronRight />
      </button>

      {/* Carousel */}
      <div className="overflow-hidden" style={{ width: VIEWPORT_WIDTH }}>
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${pageIndex * VIEWPORT_WIDTH}px)`,
          }}
        >
          {products.map((product, index) => (
            <Link
              key={index}
              to={`/product/${product._id}`}
              style={{
                width: ITEM_WIDTH,
                marginRight: (index + 1) % ITEMS_PER_PAGE === 0 ? 0 : MARGIN_RIGHT,
                flexShrink: 0,
              }}
            >
              <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <img
                  src={product.images[0].url}
                  alt={product.images[0].altText}
                  className="w-full h-80 object-cover rounded-t-lg"
                />
                <div className="p-3">
                  <h3 className="text-sm font-medium mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-sm font-semibold">₹ {product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCarousel;
