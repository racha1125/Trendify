import { Link } from "react-router-dom";
import { FaRegHeart } from 'react-icons/fa';
const FALLBACK_IMAGE = 'https://via.placeholder.com/250x300?text=No+Image';

function ProductGrid({ products }) {
  const ITEM_WIDTH = 250; // Matching the item width from ProductCarousel
  const MARGIN_RIGHT = 20;

  const renderImage = (product) => {
    const src = product?.images?.[0]?.url || FALLBACK_IMAGE;
    const alt = product?.images?.[0]?.altText || product?.name || "Product";
    return <img src={src} alt={alt} className="w-full h-72 object-cover" />;
  };

  return (
    <div className="relative mx-auto mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mx-auto justify-items-center items-center">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="block"
            style={{
              width: ITEM_WIDTH,
              marginRight: MARGIN_RIGHT,
              flexShrink: 0,
            }}
          >
            <div className="relative group bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
              {/* Wishlist Icon */}
              <div className="absolute top-2 right-2 text-gray-600 hover:text-red-500 cursor-pointer p-1 bg-white rounded-full z-10 text-lg">
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
                <h3 className="text-gray-800 font-semibold text-sm truncate">{product.name}</h3>
                <div className="text-sm mt-1">
                  <span className="font-semibold text-gray-900">₹{product.price}</span>{' '}
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
  );
};
export default ProductGrid;