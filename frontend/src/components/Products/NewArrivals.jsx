import React, { useEffect } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useRef } from 'react'
import { useState } from 'react'
import stylishJacket from '../../assets/stylish_jacket.webp'
import casualSneakers from '../../assets/casual-sneakers.webp'
import elegantDress from '../../assets/elegant-dress.jpg'
import trendyBackpack from '../../assets/trendy-backpack.webp'
import { Link } from 'react-router-dom'
function NewArrivals() {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const newArrivals = [
        {
            _id: "1",
            name: "Stylish Jacket",
            price: 120,
            image: stylishJacket,
            altText: "Stylish Jacket"
        },
        {
            _id: "2",
            name: "Casual Sneakers",
            price: 800,
            image: casualSneakers,
            altText: "Casual Sneakers"
        },
        {
            _id: "3",
            name: "Elegant Dress",
            price: 150,
            image: elegantDress,
            altText: "Elegant Dress"
        },
        {
            _id: "4",
            name: "Trendy Backpack",
            price: 200,
            image: trendyBackpack,
            altText: "Trendy Backpack"
        },
    ]

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    }
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX;
        scrollRef.current.scrollLeft = scrollLeft - walk; // Scroll the container
    }
    const handleMouseUpOrLeave = () => {
        setIsDragging(false);
    }
    const scroll = (direction) => {
        const scrollAmount = direction === 'left' ? -300 : 300; // Adjust scroll amount as needed
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };


    const updateScrollButtons = () => { 
        const container = scrollRef.current;

        if(container) {
            const leftScroll = container.scrollLeft;
            const rightScrollable = container.scrollWidth >  leftScroll +container.clientWidth; 
            setCanScrollLeft(leftScroll > 0);
            setCanScrollRight(rightScrollable)
        }
        console.log({
            scrollLeft: container.scrollLeft,
            clientWidth: container.clientWidth,
            constainerWScrollWidth: container.scrollWidth,
            offsetLeft:  scrollRef.current.offsetLeft,
        });
    };
    useEffect(() => {
        const container = scrollRef.current;
        if (container) { 
            container.addEventListener('scroll', updateScrollButtons);
            updateScrollButtons(); // Initial check
            return () => container.removeEventListener('scroll', updateScrollButtons);
        } 
    },[])

    return (
        <section className='py-16 px-4 lg:px-0 m-10'>
            <div className='container mx-auto text-center mb-10 relative'>
                <h2 className='text-3xl font-bold mb-4'>Explore New Arrivals</h2>
                <p className='text-lg text-gray-600 mb-10'>
                    Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.
                </p>
                {/* Scroll Buttons */}
                <div className='absolute right-0 bottom-[-40px] flex space-x-2'>
                    <button 
                    onClick={() => scroll('left')}
                    disabled={!canScrollLeft}
                    className={`p-2 rounded-3xl border ${canScrollLeft ? "bg-white text-black " : "bg-gray-200 text-gray-400 cursor-not-allowed"}bg-white text-black`}>
                        <FiChevronLeft className="text-2xl" />
                    </button>
                    <button onClick={() => scroll('right')}
                    className={`p-2 rounded-3xl border 
                    ${canScrollRight 
                        ? "bg-white text-black "
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                        <FiChevronRight className="text-2xl" />
                    </button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div ref={scrollRef}
            className={`container mx-auto flex overflow-x-scroll space-x-6 relative ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}>
                {newArrivals.map((product) => (
                    <div key={product._id} 
                    className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
                        <img 
                        src={product.image} 
                        alt={product.altText} 
                        className='w-full h-[500px] object-cover rounded-lg'
                        draggable="false" />
                        <div className='absolute bottom-0 left-0 right-0 backdrop-blur-xs text-black p-4 rounded-b-lg'>
                            <Link to={`/product/${product._id}`} className="block">
                            <h4 className='font-medium'>{product.name}</h4>
                            <p className='mt-1'>${product.price}</p>
                            </Link>
                        </div>
                        
                        
                    </div>
                ))}
            </div>
        </section>
    )
}

export default NewArrivals
