import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FaRegHeart } from 'react-icons/fa';

function ProductCarousel({ products }) {
  const ITEM_WIDTH = 250;
  const MARGIN_RIGHT = 20;
  const ITEMS_PER_PAGE_DESKTOP = 5;
  const ITEMS_PER_PAGE_MOBILE = 1;
  const [pageIndex, setPageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const ITEMS_PER_PAGE = isMobile ? ITEMS_PER_PAGE_MOBILE : ITEMS_PER_PAGE_DESKTOP;
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const handleScroll = (direction) => {
    if (direction === 'left' && pageIndex > 0) {
      setPageIndex((prev) => prev - 1);
    } else if (direction === 'right' && pageIndex < totalPages - 1) {
      setPageIndex((prev) => prev + 1);
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    if (touchStartX.current - touchEndX.current > 50) {
      handleScroll('right');
    } else if (touchEndX.current - touchStartX.current > 50) {
      handleScroll('left');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const VIEWPORT_WIDTH = (ITEM_WIDTH + MARGIN_RIGHT) * ITEMS_PER_PAGE - MARGIN_RIGHT;
  const isLeftDisabled = pageIndex === 0;
  const isRightDisabled = pageIndex >= totalPages - 1;

  return (
    <div
      className="relative mx-auto mb-4"
      style={{ width: VIEWPORT_WIDTH }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {!isLeftDisabled && (
        <button
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleScroll('left')}
        >
          <ChevronLeft />
        </button>
      )}

      {!isRightDisabled && (
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleScroll('right')}
        >
          <ChevronRight />
        </button>
      )}

      <div className="overflow-hidden" style={{ width: VIEWPORT_WIDTH }}>
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${pageIndex * VIEWPORT_WIDTH}px)`,
          }}
        >
          {products.map((product, index) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              style={{
                width: ITEM_WIDTH,
                marginRight: (index + 1) % ITEMS_PER_PAGE === 0 ? 0 : MARGIN_RIGHT,
                flexShrink: 0,
              }}
            >
              <div className="relative group bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
                {/* Fit Label */}
                <div className="absolute top-2 left-2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded font-semibold z-10 uppercase">
                  {product.fit || 'OVERSIZED FIT'}
                </div>

                {/* Wishlist Icon */}
                <div className="absolute top-2 right-2 text-gray-600 hover:text-red-500 cursor-pointer p-1 bg-white rounded-full z-10 text-lg">
                  <FaRegHeart />
                </div>

                {/* Product Image */}
                <div className="relative">
                  <img
                    src={product.images[0].url}
                    alt={product.images[0].altText}
                    className="w-full h-72 object-cover"
                  />
                  {/* Rating Badge */}
                  <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 text-yellow-500 text-xs font-semibold px-2 py-1 rounded flex items-center space-x-1 shadow">
                    <span>⭐</span>
                    <span className="text-gray-700">{product.rating || '4.5'}</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <h4 className="text-gray-800 font-semibold text-sm truncate">
                    {product.name}
                  </h4>
                  <div className="text-sm mt-1">
                    <span className="font-semibold text-gray-900">₹{product.price}</span>{' '}
                    <span className="line-through text-gray-400 text-xs">
                      ₹{product.originalPrice || product.price * 2}
                    </span>{' '}
                    <span className="text-green-600 text-xs font-semibold">
                      {product.discount || '50% OFF'}
                    </span>
                  </div>
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
