import { useEffect, useState } from 'react';
import Hero from '../components/Layout/Hero';
import GenderCollectionSection from '../components/Products/GenderCollectionSection';
import NewArrivals from '../components/Products/NewArrivals';
import ProductDetails from '../components/Products/ProductDetails';
import ProductCarousel from '../components/Products/ProductCarousel';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productSlice';
import axios from 'axios';

function Home() {
  const dispatch = useDispatch();

  // Correctly select filteredProducts, loading and error from slice state
  const { filteredProducts, loading, error } = useSelector((state) => state.products);

  const [bestSellerProduct, setBestSellerProduct] = useState(null);
  const [bestSellerId, setBestSellerId] = useState(null);

  useEffect(() => {
    // Dispatch the fetchProductsByFilters thunk with filters
    dispatch(
      fetchProductsByFilters({
        gender: "Men",
        category: "Top Wear",
        limit: 8,
      })
    );

    // Fetch best seller product separately
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
        setBestSellerProduct(response.data);
        setBestSellerId(response.data?._id);
      } catch (error) {
        console.error('Error fetching best seller product:', error);
      }
    };

    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best Seller */}
      <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
      {/* You can use either method below, both will work with the new ProductDetails: */}
      {bestSellerProduct ? (
        // Option 1: pass the whole product object (fastest if you already have it)
        <ProductDetails product={bestSellerProduct} productId={bestSellerId} />
        // Option 2: pass just the ID (ProductDetails will fetch for you)
        // <ProductDetails productId={bestSellerId} />
      ) : (
        <p className='text-center'>Loading best seller product..</p>
      )}

      <div className='container mx-auto'>
        <h2 className='text-3xl text-center font-bold mb-4'>Top Wears for Men</h2>
        {/* Use filteredProducts here */}
        <ProductCarousel products={filteredProducts} loading={loading} error={error} />
      </div>
    </div>
  );
}

export default Home;