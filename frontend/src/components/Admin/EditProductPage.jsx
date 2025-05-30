import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductDetails } from '../../redux/slices/productSlice';
import { updateProduct } from '../../redux/slices/adminProductSlice';
import axios from 'axios';

function EditProductPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { selectedProduct, loading, error } = useSelector((state) => state.products);

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        countInStock: 0,
        sku: "",
        category: "",
        brand: "",
        sizes: [],
        colors: [],
        collections: [],
        material: "",
        gender: "",
        images: [],
    });

    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductDetails(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (selectedProduct) {
            setProductData({
                ...selectedProduct,
                sizes: Array.isArray(selectedProduct.sizes) ? selectedProduct.sizes : [],
                colors: Array.isArray(selectedProduct.colors) ? selectedProduct.colors : [],
                collections: Array.isArray(selectedProduct.collections) ? selectedProduct.collections : [],
                images: Array.isArray(selectedProduct.images) ? selectedProduct.images : [],
            });
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
            setUploading(true);
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            setProductData((prevData) => ({
                ...prevData,
                images: [
                  ...prevData.images,
                  { url: data.url || data.imageUrl, altText: data.altText || "Product Image" }
                ],
            }));
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setUploading(false);
        }
    };

    // Remove image by index
    const handleRemoveImage = (removeIdx) => {
        setProductData((prevData) => ({
            ...prevData,
            images: prevData.images.filter((_, idx) => idx !== removeIdx),
        }));
    };

    // Normalize images before sending to backend
    const normalizeImages = (images) =>
        images.map(img =>
            typeof img === "string"
                ? { url: img, altText: "Product Image" }
                : { url: img.url, altText: img.altText || "Product Image" }
        );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submitData = {
            ...productData,
            images: normalizeImages(productData.images),
        };
        await dispatch(updateProduct({ id, productData: submitData }));
        navigate("/admin/products");
    };

    if (loading) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
            <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
            <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2">Product Name</label>
                    <input 
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                {/* Description */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2">Description</label>
                    <textarea 
                        name="description" 
                        value={productData.description}
                        onChange={handleChange}
                        className='w-full border border-gray-300 rounded-md p-2'
                        rows={3}
                        required
                    />
                </div>
                {/* Price */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Price</label>
                    <input 
                        type="number"
                        name='price'
                        value={productData.price} 
                        onChange={handleChange}
                        className='w-full border border-gray-300 rounded-md p-2'
                        required
                    />
                </div>
                {/* Count In Stock */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Count In Stock</label>
                    <input 
                        type="number"
                        name='countInStock'
                        value={productData.countInStock}
                        onChange={handleChange}
                        className='w-full border border-gray-300 rounded-md p-2'
                        required
                    />
                </div>
                {/* SKU */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>SKU</label>
                    <input 
                        type="text"
                        name='sku'
                        value={productData.sku}
                        onChange={handleChange}
                        className='w-full border border-gray-300 rounded-md p-2'
                    />
                </div>
                {/* Sizes */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Sizes (comma-separated)</label>
                    <input 
                        type="text"
                        name='sizes'
                        value={Array.isArray(productData.sizes) ? productData.sizes.join(",") : ""}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                sizes: e.target.value.split(",").map(size => size.trim()).filter(Boolean),
                            })
                        }
                        className='w-full border border-gray-300 rounded-md p-2'
                    />
                </div>
                {/* Colors */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Colors (comma-separated)</label>
                    <input 
                        type="text"
                        name='colors'
                        value={Array.isArray(productData.colors) ? productData.colors.join(",") : ""}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                colors: e.target.value.split(",").map(color => color.trim()).filter(Boolean),
                            })
                        }
                        className='w-full border border-gray-300 rounded-md p-2'
                    />
                </div>
                {/* Collections */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Collections (comma-separated)</label>
                    <input 
                        type="text"
                        name='collections'
                        value={Array.isArray(productData.collections) ? productData.collections.join(",") : ""}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                collections: e.target.value.split(",").map(col => col.trim()).filter(Boolean),
                            })
                        }
                        className='w-full border border-gray-300 rounded-md p-2'
                    />
                </div>
                {/* Image Upload */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Upload Images</label>
                    <input
                        type="file"
                        className="file:mr-4 file:py-1 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:bg-white file:text-gray-700 hover:file:bg-gray-100"
                        onChange={handleImageChange}
                        disabled={uploading}
                    />
                    {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
                    <div className='flex gap-4 mt-4 flex-wrap'>
                        {productData.images.map((image, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={image.url || image.imageUrl}
                                    alt={image.altText || "Product Image"}
                                    className='w-20 h-20 object-cover rounded-md shadow-md'
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-80 group-hover:opacity-100 transition-opacity"
                                    title="Remove Image"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    type='submit'
                    className='w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-700 transition-colors'
                    disabled={uploading}
                >
                    Update Product
                </button>
            </form>
        </div>
    );
}

export default EditProductPage;