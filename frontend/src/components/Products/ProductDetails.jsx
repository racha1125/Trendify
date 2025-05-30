import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import ProductGrid from './ProductGrid'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSimilarProducts } from '../../redux/slices/productSlice'
import { addToCart } from '../../redux/slices/cartSlice'
import axios from 'axios'

const FALLBACK_IMAGE = 'https://via.placeholder.com/500x400?text=No+Image';

function ProductDetails({ product }) {
  // Get the productId from the route parameter
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const { similarProducts, loading: similarLoading, error: similarError } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);

  // State for the currently viewed product (handles prop or fetch)
  const [activeProduct, setActiveProduct] = useState(product || null);
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // Fetch product by ID if only productId is provided
  useEffect(() => {
    let ignore = false;
    if (!product && productId) {
      setFetching(true);
      setFetchError(null);
      setActiveProduct(null); // Clear previous product while loading!
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`)
        .then((res) => {
          if (!ignore) setActiveProduct(res.data);
        })
        .catch(() => {
          if (!ignore) setFetchError('Error fetching product by ID.');
        })
        .finally(() => {
          if (!ignore) setFetching(false);
        });
    } else if (product) {
      setActiveProduct(product);
    }
    return () => { ignore = true; }
  }, [product, productId]);

  // Memoize the selected product (with fallback)
  const SelectedProduct = useMemo(
    () =>
      activeProduct || {
        name: 'Stylish Jacket',
        price: 120,
        originalPrice: 150,
        description: 'A stylish jacket for all seasons.',
        brand: 'Fashion Brand',
        material: 'Leather',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Red', 'Blue', 'Black'],
        images: [
          {
            url: FALLBACK_IMAGE,
            altText: 'Stylish Jacket 1',
          },
        ],
      },
    [activeProduct]
  );

  const [mainImage, setMainImage] = useState(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  // Whenever SelectedProduct changes, update state & fetch similar products
  useEffect(() => {
    if (SelectedProduct?.images?.length > 0 && SelectedProduct.images[0]?.url) {
      setMainImage(SelectedProduct.images[0].url)
    } else {
      setMainImage(FALLBACK_IMAGE)
    }
    setSelectedSize(SelectedProduct?.sizes?.[0] || '')
    setSelectedColor(SelectedProduct?.colors?.[0] || '')

    if (SelectedProduct?._id) {
      dispatch(fetchSimilarProducts({ id: SelectedProduct._id }));
    }
    setQuantity(1);
  }, [SelectedProduct, dispatch])

  const handleQuantityChange = (action) => {
    if (action === 'plus') setQuantity((prev) => prev + 1)
    if (action === 'minus' && quantity > 1) setQuantity((prev) => prev - 1)
  }

  // FIXED: Actually add to cart using Redux
  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select a size and color before adding to cart.', { duration: 1000 })
      return
    }
    setIsButtonDisabled(true)
    try {
      await dispatch(
        addToCart({
          productId: SelectedProduct._id,
          quantity,
          size: selectedSize,
          color: selectedColor,
          guestId,
          userId: user ? user._id : null,
        })
      ).unwrap();
      toast.success('Product added to cart.', { duration: 1000 });
    } catch (err) {
      console.error('Failed to add product to cart:', err);
      toast.error('Failed to add product to cart.', { duration: 1000 });
    }
    setIsButtonDisabled(false)
  }

  const renderImage = (url, alt, className) =>
    url ? (
      <img src={url} alt={alt} className={className} />
    ) : (
      <div className={`${className} bg-gray-200 flex items-center justify-center text-gray-400`}>
        No image
      </div>
    )

  // Handler for clicking a similar product (switches local view)
  const handleProductClick = useCallback(
    (clickedProduct) => {
      setActiveProduct(clickedProduct);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  // Show loader or error if fetching by productId
  if (fetching) {
    return <div className="text-center py-10 text-lg text-gray-400">Loading product...</div>;
  }
  if (fetchError) {
    return <div className="text-center py-10 text-lg text-red-500">{fetchError}</div>;
  }

  return (
    <div className='p-6'>
      <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
        <div className='flex flex-col md:flex-row'>
          {/* Left Thumbnails */}
          <div className='hidden md:flex flex-col space-y-4 mr-6'>
            {(SelectedProduct.images || []).map((image, index) => (
              <button
                key={index}
                type="button"
                className="outline-none border-none bg-transparent p-0"
                onClick={() => setMainImage(image.url || FALLBACK_IMAGE)}
                tabIndex={0}
                aria-label={`Select thumbnail ${index + 1}`}
              >
                {renderImage(
                  image.url,
                  image.altText || `Thumbnail ${index + 1}`,
                  `w-24 h-24 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black" : "border-gray-300"}`
                )}
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className='md:w-1/2'>
            <div className='mb-4'>
              {renderImage(
                mainImage,
                SelectedProduct.name,
                'w-full h-auto object-cover rounded-lg border'
              )}
            </div>
          </div>

          {/* Mobile Thumbnail */}
          <div className='md:hidden flex overflow-x-auto space-x-4 mb-4'>
            {(SelectedProduct.images || []).map((image, index) => (
              <button
                key={index}
                type="button"
                className="outline-none border-none bg-transparent p-0"
                onClick={() => setMainImage(image.url || FALLBACK_IMAGE)}
                tabIndex={0}
                aria-label={`Select thumbnail ${index + 1}`}
              >
                {renderImage(
                  image.url,
                  image.altText || `Thumbnail ${index + 1}`,
                  `w-24 h-24 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black" : "border-gray-300"}`
                )}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className='md:w-1/2 md:ml-10'>
            <h1 className='text-2xl md:text-3xl font-semibold mb-2'>
              {SelectedProduct.name}
            </h1>
            <p className='text-lg text-gray-600 mb-1 line-through'>
              {SelectedProduct.originalPrice && `$${SelectedProduct.originalPrice}`}
            </p>
            <p className='text-xl text-gray-800 font-semibold mb-2'>
              ${SelectedProduct.price}
            </p>
            <p className='text-gray-600 mb-4'>{SelectedProduct.description}</p>

            <div className='mb-4'>
              <p className='text-gray-700 font-medium'>Color:</p>
              <div className='flex gap-3 mt-2'>
                {(SelectedProduct.colors || []).map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer ${selectedColor === color ? "border-amber-400" : "border-gray-300"}`}
                    style={{
                      backgroundColor: color.toLowerCase(),
                      filter: 'brightness(0.7)',
                    }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>

            <div className='mb-4'>
              <p className='text-gray-700 font-medium'>Size:</p>
              <div className='flex gap-2 mt-2'>
                {(SelectedProduct.sizes || []).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-black cursor-pointer ${selectedSize === size ? 'bg-black text-white' : 'bg-white text-black'}`}
                    aria-pressed={selectedSize === size}
                    aria-label={`Select size ${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className='mb-6'>
              <p className='text-gray-700 font-medium'>Quantity:</p>
              <div className='flex items-center space-x-3 mt-2'>
                <button
                  onClick={() => handleQuantityChange('minus')}
                  className='px-3 bg-gray-200 rounded text-lg font-bold'
                  aria-label='Decrease quantity'
                >
                  -
                </button>
                <span className='text-md font-semibold' aria-live='polite'>
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange('plus')}
                  className='px-3 bg-gray-200 rounded text-lg font-bold'
                  aria-label='Increase quantity'
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`bg-black text-white py-2 px-6 rounded w-full mb-4 transition-colors duration-200 ${
                isButtonDisabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-900'
              }`}
              aria-live='polite'
            >
              {isButtonDisabled ? 'Adding...' : 'ADD TO CART'}
            </button>

            <div className='mt-10 text-gray-700'>
              <h3 className='text-xl font-bold mb-4'>Characteristics:</h3>
              <table className='w-full text-left text-sm text-gray-600'>
                <tbody>
                  <tr>
                    <td className='py-1 font-medium'>Brand</td>
                    <td className='py-1'>{SelectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className='py-1 font-medium'>Material</td>
                    <td className='py-1'>{SelectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className='mt-20'>
          <h2 className='text-2xl text-center font-medium mb-4'>
            You May Also Like
          </h2>
          {similarLoading ? (
            <div className="text-center text-gray-400">Loading similar products...</div>
          ) : similarError ? (
            <div className="text-center text-red-400">Failed to load similar products.</div>
          ) : (
            <ProductGrid
              products={similarProducts || []}
              onProductClick={handleProductClick}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails