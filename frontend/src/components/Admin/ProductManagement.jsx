import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    deleteProduct,
    fetchAdminProducts,
    createProduct,
} from "../../redux/slices/adminProductSlice";

function ProductManagement() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.adminProducts);

    // Modal state & form state
    const [showAddModal, setShowAddModal] = useState(false);
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
        images: [{ url: "", altText: "" }],
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
        } else if (name.startsWith("images.")) {
            const [_, idx, field] = name.split(".");
            const updatedImages = [...form.images];
            updatedImages[Number(idx)][field] = value;
            setForm((prev) => ({
                ...prev,
                images: updatedImages
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

    const handleAddImageField = () => {
        setForm((prev) => ({
            ...prev,
            images: [...prev.images, { url: "", altText: "" }]
        }));
    };

    const handleRemoveImageField = (idx) => {
        setForm((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== idx)
        }));
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
            images: form.images.filter(img => img.url.trim() !== ""),
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
            images: [{ url: "", altText: "" }],
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
                                <input
                                    className="border px-3 py-2 rounded"
                                    type="number"
                                    name="dimensions.length"
                                    placeholder="Length"
                                    value={form.dimensions.length}
                                    onChange={handleFormChange}
                                />
                                <input
                                    className="border px-3 py-2 rounded"
                                    type="number"
                                    name="dimensions.width"
                                    placeholder="Width"
                                    value={form.dimensions.width}
                                    onChange={handleFormChange}
                                />
                                <input
                                    className="border px-3 py-2 rounded"
                                    type="number"
                                    name="dimensions.height"
                                    placeholder="Height"
                                    value={form.dimensions.height}
                                    onChange={handleFormChange}
                                />
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
                            {/* Images input */}
                            <div>
                                <label className="block mb-1 font-medium">Images</label>
                                {form.images.map((img, idx) => (
                                    <div className="flex gap-2 mb-2" key={idx}>
                                        <input
                                            className="w-full border px-3 py-2 rounded"
                                            name={`images.${idx}.url`}
                                            placeholder="Image URL"
                                            value={img.url}
                                            onChange={handleFormChange}
                                        />
                                        <input
                                            className="border px-3 py-2 rounded"
                                            name={`images.${idx}.altText`}
                                            placeholder="Alt text"
                                            value={img.altText}
                                            onChange={handleFormChange}
                                        />
                                        {form.images.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImageField(idx)}
                                                className="bg-red-400 text-white px-2 rounded"
                                            >-</button>
                                        )}
                                        {idx === form.images.length - 1 && (
                                            <button
                                                type="button"
                                                onClick={handleAddImageField}
                                                className="bg-green-500 text-white px-2 rounded"
                                            >+</button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                            >Add Product</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductManagement;