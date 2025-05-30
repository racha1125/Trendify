import React, { useEffect, useState, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';

function NewArrivals() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const [newArrivals, setNewArrivals] = useState([]);
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try{
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
        console.log("New arrivals fetched:", response.data);
      }catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };
    fetchNewArrivals();
  }, []);

  const ITEM_WIDTH = isMobile ? 300 : 300;
  const ITEMS_PER_SCROLL = isMobile ? 1 : 3;

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const scrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < maxScrollLeft - 5); // buffer for precision
    }
  };

  const scroll = (direction) => {
    const scrollAmount = direction === 'left' ? -(ITEM_WIDTH * ITEMS_PER_SCROLL) : ITEM_WIDTH * ITEMS_PER_SCROLL;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons(); // Initial check
      return () => container.removeEventListener('scroll', updateScrollButtons);
    }
  }, [newArrivals]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="py-16 px-4 lg:px-0 m-10">
      <div className="container mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-10">
          Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.
        </p>
      </div>

      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => scroll('left')}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
        )}

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="container mx-auto flex overflow-hidden space-x-6"
          style={{
            display: 'flex',
            transition: 'transform 0.5s ease',
            width: '100%',
          }}
        >
          {newArrivals.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="flex-none w-full sm:w-[calc(100%-2rem)] md:w-[calc(33.33%-1.5rem)] relative group focus:outline-none"
              tabIndex={0}
              aria-label={`View details for ${product.name}`}
            >
              <img
                src={product.images[0].url}
                alt={product.altText}
                className="w-full h-[500px] object-cover rounded-lg group-hover:opacity-90 transition"
                draggable="false"
              />
              <div className="absolute bottom-0 left-0 right-0 backdrop-blur-3xl text-black p-4 rounded-b-lg bg-white/70 group-hover:bg-white/90 transition">
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => scroll('right')}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        )}
      </div>
    </section>
  );
}

export default NewArrivals;