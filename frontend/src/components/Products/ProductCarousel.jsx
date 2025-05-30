import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FaRegHeart } from 'react-icons/fa';

const FALLBACK_IMAGE = 'https://via.placeholder.com/250x300?text=No+Image';

function ProductCarousel({ products = [], loading = false, error = null }) {
  const ITEM_WIDTH = 250;
  const MARGIN_RIGHT = 20;
  const ITEMS_PER_PAGE_DESKTOP = 5;
  const ITEMS_PER_PAGE_MOBILE = 1;

  const [pageIndex, setPageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  const touchStartX = useRef(0);

  const ITEMS_PER_PAGE = isMobile ? ITEMS_PER_PAGE_MOBILE : ITEMS_PER_PAGE_DESKTOP;
  const totalPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE));

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setPageIndex(0);
  }, [products.length, isMobile]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX.current - touchEndX > 50) {
      handleScroll('right');
    } else if (touchEndX - touchStartX.current > 50) {
      handleScroll('left');
    }
  };

  const handleScroll = (direction) => {
    if (direction === 'left' && pageIndex > 0) {
      setPageIndex((prev) => prev - 1);
    } else if (direction === 'right' && pageIndex < totalPages - 1) {
      setPageIndex((prev) => prev + 1);
    }
  };

  const VIEWPORT_WIDTH =
    (ITEM_WIDTH + MARGIN_RIGHT) * ITEMS_PER_PAGE - MARGIN_RIGHT;
  const isLeftDisabled = pageIndex === 0;
  const isRightDisabled = pageIndex >= totalPages - 1;

  if (loading) {
    return (
      <div className="text-center py-8">
        <span className="text-gray-500">Loading products...</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {typeof error === 'string' ? error : 'An error occurred.'}
      </div>
    );
  }
  if (!products.length) {
    return (
      <div className="text-center py-8 text-gray-400">
        No products found.
      </div>
    );
  }

  const renderImage = (product) => {
    const src = product?.images?.[0]?.url || FALLBACK_IMAGE;
    const alt = product?.images?.[0]?.altText || product?.name || "Product";
    return <img src={src} alt={alt} className="w-full h-72 object-cover" />;
  };

  return (
    <div
      className="relative mx-auto mb-4"
      style={{ width: VIEWPORT_WIDTH, maxWidth: '100%' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {!isLeftDisabled && (
        <button
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleScroll('left')}
          aria-label="Scroll left"
        >
          <ChevronLeft />
        </button>
      )}

      {!isRightDisabled && (
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleScroll('right')}
          aria-label="Scroll right"
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
              key={product._id || index}
              to={`/product/${product._id || ''}`}
              style={{
                width: ITEM_WIDTH,
                marginRight:
                  (index + 1) % ITEMS_PER_PAGE === 0 ? 0 : MARGIN_RIGHT,
                flexShrink: 0,
                pointerEvents: product._id ? undefined : 'none',
                opacity: product._id ? 1 : 0.5,
              }}
              tabIndex={product._id ? 0 : -1}
            >
              <div className="relative group bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">

                {/* Wishlist Icon */}
                <div
                  className="absolute top-2 right-2 text-gray-600 hover:text-red-500 cursor-pointer p-1 bg-white rounded-full z-10 text-lg"
                  tabIndex={0}
                  role="button"
                  aria-label="Add to wishlist"
                  onClick={(e) => e.preventDefault()}
                >
                  <FaRegHeart />
                </div>

                {/* Product Image */}
                <div className="relative">
                  {renderImage(product)}
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
                    <span className="font-semibold text-gray-900">
                      ₹{product.price}
                    </span>{' '}
                    <span className="line-through text-gray-400 text-xs">
                      ₹{product.originalPrice || (product.price ? product.price * 2 : '')}
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