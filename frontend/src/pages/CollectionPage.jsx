import {useEffect, useRef, useState, useMemo} from 'react'
import { FaFilter } from 'react-icons/fa';
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchProductsByFilters } from '../redux/slices/productSlice';

function CollectionPage() {
    const {collection} = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {filteredProducts, loading, error} = useSelector((state) => state.products);

    // Memoize queryParams to avoid unnecessary rerenders/fetches
    const queryParams = useMemo(() => Object.fromEntries([...searchParams]), [searchParams]);

    useEffect(() => {
        dispatch(fetchProductsByFilters({ collection, ...queryParams }));
    }, [dispatch, collection, queryParams]);

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
    }, []);

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
                <ProductGrid products={filteredProducts} loading={loading} error={error}/>
            </div>
        </div>
    )
}
    
export default CollectionPage