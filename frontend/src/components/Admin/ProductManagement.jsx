import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    deleteProduct,
    fetchAdminProducts,
    createProduct,
} from "../../redux/slices/adminProductSlice";
import axios from "axios";

function ProductManagement() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.adminProducts);

    // Modal state & form state
    const [showAddModal, setShowAddModal] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        discountedPrice: "",
        countInStock: "",
        category: "",
        brand: "",
        sizes: "",
        colors: "",
        collections: "",
        material: "",
        gender: "",
        images: [],
        isFeatured: false,
        isPublished: false,
        tags: "",
        dimensions: { length: "", width: "", height: "" },
        weight: "",
        sku: ""
    });

    useEffect(() => {
        dispatch(fetchAdminProducts());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteProduct(id));
        }
    };

    // Handle form changes
    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith("dimensions.")) {
            const dimField = name.split(".")[1];
            setForm((prev) => ({
                ...prev,
                dimensions: { ...prev.dimensions, [dimField]: value }
            }));
        } else if (type === "checkbox") {
            setForm((prev) => ({
                ...prev,
                [name]: checked
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Handle image upload (multiple files)
    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        setUploading(true);
        try {
            const uploadedImages = [];
            for (let file of files) {
                const formData = new FormData();
                formData.append("image", file);

                const { data } = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                uploadedImages.push({
                    url: data.url || data.imageUrl,
                    altText: "",
                });
            }
            setForm((prev) => ({
                ...prev,
                images: [...prev.images, ...uploadedImages],
            }));
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setUploading(false);
        }
    };

    // Remove image by index
    const handleRemoveImage = (removeIdx) => {
        setForm((prev) => ({
            ...prev,
            images: prev.images.filter((_, idx) => idx !== removeIdx),
        }));
    };

    // Change altText for a specific image
    const handleAltTextChange = (index, newAltText) => {
        setForm((prev) => {
            const newImages = [...prev.images];
            newImages[index] = {
                ...newImages[index],
                altText: newAltText,
            };
            return { ...prev, images: newImages };
        });
    };

    // Handle submit
    const handleAddProduct = (e) => {
        e.preventDefault();
        // Convert comma separated fields to arrays
        const formattedProduct = {
            ...form,
            price: Number(form.price),
            discountedPrice: Number(form.discountedPrice),
            countInStock: Number(form.countInStock),
            weight: Number(form.weight),
            sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
            colors: form.colors.split(",").map((c) => c.trim()).filter(Boolean),
            collections: form.collections.split(",").map((v) => v.trim()).filter(Boolean),
            tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
            dimensions: {
                length: Number(form.dimensions.length),
                width: Number(form.dimensions.width),
                height: Number(form.dimensions.height),
            },
            images: form.images.map(img => ({
                url: img.url,
                altText: img.altText && img.altText.trim() !== "" ? img.altText : "Product Image",
            })),
        };
        dispatch(createProduct(formattedProduct));
        setShowAddModal(false);
        setForm({
            name: "",
            description: "",
            price: "",
            discountedPrice: "",
            countInStock: "",
            category: "",
            brand: "",
            sizes: "",
            colors: "",
            collections: "",
            material: "",
            gender: "",
            images: [],
            isFeatured: false,
            isPublished: false,
            tags: "",
            dimensions: { length: "", width: "", height: "" },
            weight: "",
            sku: ""
        });
    };

    if (loading) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }
    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Product Management</h2>
            <button
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setShowAddModal(true)}
            >Add Product</button>
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="min-w-full text-left text-gray-500">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Price</th>
                            <th className="py-3 px-4">SKU</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) =>
                                <tr
                                    key={product._id}
                                    className="border-b hover:bg-gray-50 cursor-pointer"
                                >
                                    <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                                        {product.name}
                                    </td>
                                    <td className="p-4">${product.price}</td>
                                    <td className="p-4">{product.sku}</td>
                                    <td className="p-4">
                                        <Link to={`/admin/products/${product._id}/edit`}
                                            className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>)
                        ) : (
                            <tr>
                                <td colSpan={4} className="p-4 text-center text-gray-500">
                                    No Products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Product Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative overflow-y-auto max-h-[90vh]">
                        <button
                            onClick={() => setShowAddModal(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-2xl"
                        >&times;</button>
                        <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
                        <form onSubmit={handleAddProduct} className="space-y-3">
                            <input className="w-full border px-3 py-2 rounded" name="name" placeholder="Name" value={form.name} onChange={handleFormChange} required />
                            <textarea className="w-full border px-3 py-2 rounded" name="description" placeholder="Description" value={form.description} onChange={handleFormChange} required />
                            <input className="w-full border px-3 py-2 rounded" type="number" name="price" placeholder="Price" value={form.price} onChange={handleFormChange} required />
                            <input className="w-full border px-3 py-2 rounded" type="number" name="discountedPrice" placeholder="Discounted Price" value={form.discountedPrice} onChange={handleFormChange} />
                            <input className="w-full border px-3 py-2 rounded" type="number" name="countInStock" placeholder="Count In Stock" value={form.countInStock} onChange={handleFormChange} required />
                            <input className="w-full border px-3 py-2 rounded" name="category" placeholder="Category" value={form.category} onChange={handleFormChange} />
                            <input className="w-full border px-3 py-2 rounded" name="brand" placeholder="Brand" value={form.brand} onChange={handleFormChange} />
                            <input className="w-full border px-3 py-2 rounded" name="sizes" placeholder="Sizes (comma separated)" value={form.sizes} onChange={handleFormChange} />
                            <input className="w-full border px-3 py-2 rounded" name="colors" placeholder="Colors (comma separated)" value={form.colors} onChange={handleFormChange} />
                            <input className="w-full border px-3 py-2 rounded" name="collections" placeholder="Collections (comma separated)" value={form.collections} onChange={handleFormChange} />
                            <input className="w-full border px-3 py-2 rounded" name="material" placeholder="Material" value={form.material} onChange={handleFormChange} />
                            <input className="w-full border px-3 py-2 rounded" name="gender" placeholder="Gender" value={form.gender} onChange={handleFormChange} />
                            <input className="w-full border px-3 py-2 rounded" name="sku" placeholder="SKU" value={form.sku} onChange={handleFormChange} required />
                            <input className="w-full border px-3 py-2 rounded" name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleFormChange} />
                            <div className="flex gap-2">
                                <div className="flex flex-col flex-1">
                                    <label className="text-xs mb-1">Length</label>
                                    <input
                                        className="border px-3 py-2 rounded w-full"
                                        type="number"
                                        name="dimensions.length"
                                        placeholder="Length"
                                        value={form.dimensions.length}
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <label className="text-xs mb-1">Width</label>
                                    <input
                                        className="border px-3 py-2 rounded w-full"
                                        type="number"
                                        name="dimensions.width"
                                        placeholder="Width"
                                        value={form.dimensions.width}
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <label className="text-xs mb-1">Height</label>
                                    <input
                                        className="border px-3 py-2 rounded w-full"
                                        type="number"
                                        name="dimensions.height"
                                        placeholder="Height"
                                        value={form.dimensions.height}
                                        onChange={handleFormChange}
                                    />
                                </div>
                            </div>
                            <input className="w-full border px-3 py-2 rounded" type="number" name="weight" placeholder="Weight (kg)" value={form.weight} onChange={handleFormChange} />
                            <div>
                                <label className="inline-flex items-center mr-4">
                                    <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleFormChange} className="mr-2" />
                                    Featured
                                </label>
                                <label className="inline-flex items-center">
                                    <input type="checkbox" name="isPublished" checked={form.isPublished} onChange={handleFormChange} className="mr-2" />
                                    Published
                                </label>
                            </div>
                            {/* Image Upload */}
                            <div>
                                <label className="block mb-1 font-medium">Upload Images</label>
                                <input
                                    type="file"
                                    multiple
                                    className="file:mr-4 file:py-1 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:bg-white file:text-gray-700 hover:file:bg-gray-100"
                                    onChange={handleImageChange}
                                    disabled={uploading}
                                />
                                {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
                                <div className="flex gap-4 mt-4 flex-wrap">
                                    {form.images.map((image, index) => (
                                        <div
                                            key={index}
                                            className="relative group flex flex-col items-center w-32"
                                        >
                                            <img
                                                src={image.url || image.imageUrl}
                                                alt={image.altText || "Product Image"}
                                                className='w-24 h-24 object-cover rounded-md shadow-md mb-2 border border-gray-300'
                                            />
                                            <input
                                                type="text"
                                                placeholder="Alt text (required)"
                                                className="border border-blue-500 rounded px-2 py-1 text-xs w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                value={image.altText || ""}
                                                onChange={e => handleAltTextChange(index, e.target.value)}
                                                required
                                            />
                                            {!image.altText && (
                                                <span className="text-xs text-red-500 mt-1">Alt text is required</span>
                                            )}
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
                                {form.images.length > 0 && form.images.some(img => !img.altText) && (
                                    <p className="text-xs text-red-500 mt-2">Please provide alt text for all images before submitting.</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                                disabled={uploading || (form.images.length > 0 && form.images.some(img => !img.altText))}
                            >Add Product</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductManagement;