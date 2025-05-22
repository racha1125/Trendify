import {useEffect, useRef, useState} from 'react'
import { FaFilter } from 'react-icons/fa';
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';

function CollectionPage() {
    const [products, setProducts] = useState([]);
    const sidebarRef = useRef(null);
    const [isSidebarOpen, setisSiderbarOpen] = useState(false);
    const toggleSidebar = () => {
        setisSiderbarOpen(!isSidebarOpen);
    };
    const handleClickOutside = (e) => {
        // Close sidebar if clicked outside
        if(sidebarRef.current && !sidebarRef.current.contains(e.target)){
            setisSiderbarOpen(false);
        }
    };
    useEffect(() => {
        // Add Event Listener for Clicks
        document.addEventListener("mousedown", handleClickOutside);
        // Clean Event Listener
        return () =>{
        document.removeEventListener("mousedown", handleClickOutside);
        };
    })
    useEffect(() => {
        setTimeout(() => {
            const fetchedProducts = [
                {
                    _id: 1,
                    name: "Product 1",
                    price: 100,
                    originalPrice: 200,
                    discount: "50% OFF",
                    rating: 4.5,
                    fit: "OVERSIZED FIT",
                    images: [
                        { url: "https://picsum.photos/id/10/500/400", altText: "Product 1" },
                    ],
                },
                {
                    _id: 2,
                    name: "Product 2",
                    price: 120,
                    originalPrice: 240,
                    discount: "50% OFF",
                    rating: 4.2,
                    fit: "REGULAR FIT",
                    images: [
                    { url: "https://picsum.photos/id/1031/500/400", altText: "Product 2" },
                    ],
                },
                {
                    _id: 3,
                    name: "Product 3",
                    price: 150,
                    originalPrice: 300,
                    discount: "50% OFF",
                    rating: 4.8,
                    fit: "SLIM FIT",
                    images: [
                    { url: "https://picsum.photos/id/1032/500/400", altText: "Product 3" },
                    ],
                },
                {
                    _id: 4,
                    name: "Product 4",
                    price: 130,
                    originalPrice: 260,
                    discount: "50% OFF",
                    rating: 4.0,
                    fit: "LOOSE FIT",
                    images: [
                    { url: "https://picsum.photos/id/1050/500/400", altText: "Product 4" },
                    ],
                },
                {
                    _id: 5,
                    name: "Product 5",
                    price: 140,
                    originalPrice: 280,
                    discount: "50% OFF",
                    rating: 4.6,
                    fit: "OVERSIZED FIT",
                    images: [
                    { url: "https://picsum.photos/id/1000/500/400", altText: "Product 5" },
                    ],
                },
                {
                    _id: 6,
                    name: "Product 6",
                    price: 110,
                    originalPrice: 220,
                    discount: "50% OFF",
                    rating: 4.3,
                    fit: "REGULAR FIT",
                    images: [
                    { url: "https://picsum.photos/id/130/500/400", altText: "Product 6" },
                    ],
                },
                {
                    _id: 7,
                    name: "Product 7",
                    price: 125,
                    originalPrice: 250,
                    discount: "50% OFF",
                    rating: 4.7,
                    fit: "SLIM FIT",
                    images: [
                    { url: "https://picsum.photos/id/1080/500/400", altText: "Product 7" },
                    ],
                },
                {
                    _id: 8,
                    name: "Product 8",
                    price: 135,
                    originalPrice: 270,
                    discount: "50% OFF",
                    rating: 4.1,
                    fit: "LOOSE FIT",
                    images: [
                    { url: "https://picsum.photos/id/190/500/400", altText: "Product 8" },
                    ],
                },
                {
                    _id: 9,
                    name: "Product 9",
                    price: 145,
                    originalPrice: 290,
                    discount: "50% OFF",
                    rating: 4.4,
                    fit: "REGULAR FIT",
                    images: [
                    { url: "https://picsum.photos/id/200/500/400", altText: "Product 9" },
                    ],
                },
                {
                    _id: 10,
                    name: "Product 10",
                    price: 155,
                    originalPrice: 310,
                    discount: "50% OFF",
                    rating: 4.9,
                    fit: "OVERSIZED FIT",
                    images: [
                    { url: "https://picsum.photos/id/600/500/400", altText: "Product 10" },
                    ],
                },
            ];
            setProducts(fetchedProducts);
        }, 1000);
    },[]);
  return (
    <div className='flex flex-col lg:flex-row'>
        {/* Mobile Filter button */}
        <button 
            onClick={toggleSidebar}
            className='lg:hidden border p-2 flex justify-center items-center'>
            <FaFilter className='mr-2'/> Filters
        </button>
        {/* Filter Sidebar */}
        <div ref={sidebarRef} className={`${isSidebarOpen ? "translate-x-0":"-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64
        bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
            <FilterSidebar/>
        </div>
        <div className='flex-grow p-4'>
            <h2 className='text-2xl uppercase mb-4'>All Collection</h2>
            
            {/*Sort Options  */}
            <SortOptions/>

            {/* Product Grid */}
            <ProductGrid products={products}/>
        </div>
    </div>
  )
}
    
export default CollectionPage