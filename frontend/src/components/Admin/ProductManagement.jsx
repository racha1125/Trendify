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

    // --- Add Product Modal State ---
    const [showAddModal, setShowAddModal] = useState(false);
    const [addLoading, setAddLoading] = useState(false);
    const [addError, setAddError] = useState(null);

    const emptyProduct = {
        name: "",
        description: "",
        price: "",
        discountedPrice: "",
        countInStock: "",
        category: "",
        brand: "",
        sizes: [],
        colors: [],
        collections: [],
        material: "",
        gender: "",
        images: [],
        isFeatured: false,
        isPublished: false,
        rating: 0,
        numReviews: 0,
        tags: [],
        dimensions: { length: "", width: "", height: "" },
        weight: "",
        sku: "",
    };

    const [newProduct, setNewProduct] = useState(emptyProduct);

    // For managing new image input (url or upload)
    const [imageUrl, setImageUrl] = useState("");
    const [imageAltText, setImageAltText] = useState("");
    const [uploadingImg, setUploadingImg] = useState(false);

    // For paste JSON functionality
    const [pasteMode, setPasteMode] = useState(false);
    const [pastedText, setPastedText] = useState("");
    const [pastedError, setPastedError] = useState(null);

    useEffect(() => {
        dispatch(fetchAdminProducts());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteProduct(id));
        }
    };

    // Modal open/close
    const openAddModal = () => {
        setShowAddModal(true);
        setAddError(null);
    };
    const closeAddModal = () => {
        setShowAddModal(false);
        setAddError(null);
        setNewProduct(emptyProduct);
        setImageUrl("");
        setImageAltText("");
        setPasteMode(false);
        setPastedText("");
        setPastedError(null);
    };

    // Form handlers
    const handleAddChange = (e) => {
        const { name, value,  checked } = e.target;
        if (name === "isFeatured" || name === "isPublished") {
            setNewProduct((prev) => ({ ...prev, [name]: checked }));
        } else if (name.startsWith("dimension_")) {
            const dimName = name.split("_")[1];
            setNewProduct((prev) => ({
                ...prev,
                dimensions: { ...prev.dimensions, [dimName]: value },
            }));
        } else {
            setNewProduct((prev) => ({ ...prev, [name]: value }));
        }
    };

    const parseArrayInput = (value) =>
        Array.isArray(value)
            ? value
            : value
                  .split(",")
                  .map((v) => v.trim())
                  .filter(Boolean);

    // --- IMAGES ---
    const handleAddImageByUrl = () => {
        if (!imageUrl) return;
        setNewProduct((prev) => ({
            ...prev,
            images: [
                ...prev.images,
                { url: imageUrl, altText: imageAltText || "Product Image" },
            ],
        }));
        setImageUrl("");
        setImageAltText("");
    };

    const handleAddImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("image", file);
        try {
            setUploadingImg(true);
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            setNewProduct((prev) => ({
                ...prev,
                images: [
                    ...prev.images,
                    {
                        url: data.url || data.imageUrl,
                        altText: imageAltText || "Product Image",
                    },
                ],
            }));
            setImageAltText("");
        } catch (err) {
            alert("Image upload failed");
            console.error("Image upload error:", err);
        } finally {
            setUploadingImg(false);
        }
    };

    const handleRemoveNewImage = (idx) => {
        setNewProduct((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== idx),
        }));
    };

    const normalizeImages = (images) =>
        images.map((img) =>
            typeof img === "string"
                ? { url: img, altText: "Product Image" }
                : { url: img.url, altText: img.altText || "Product Image" }
        );

    // --- PASTE MODE ---
    const handlePasteModeToggle = () => {
        setPasteMode((prev) => !prev);
        setPastedError(null);
        setPastedText("");
    };

    const handlePastedTextChange = (e) => {
        setPastedText(e.target.value);
    };

    const tryParseObjectLiteral = (input) => {
        // Try JSON first
        try {
            return JSON.parse(input);
        } catch {
            // Try "object literal" to JSON
            try {
                // Replace single quotes with double quotes (not perfect for all JS, but works for your pasted data)
                let fixed = input
                    .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":') // unquoted keys to quoted
                    .replace(/'/g, '"'); // single to double quotes
                return JSON.parse(fixed);
            } catch {
                return null;
            }
        }
    };

    const handlePasteProduct = () => {
        setPastedError(null);
        let obj = tryParseObjectLiteral(pastedText);
        if (!obj) {
            setPastedError("Invalid product object. Please check your syntax.");
            return;
        }
        // Fill any missing keys in newProduct shape using emptyProduct defaults
        obj = { ...emptyProduct, ...obj };
        // Ensure arrays/objects
        obj.sizes = Array.isArray(obj.sizes) ? obj.sizes : [];
        obj.colors = Array.isArray(obj.colors) ? obj.colors : [];
        obj.collections = Array.isArray(obj.collections) ? obj.collections : [];
        obj.images = Array.isArray(obj.images) ? obj.images : [];
        obj.tags = Array.isArray(obj.tags) ? obj.tags : [];
        obj.dimensions = typeof obj.dimensions === "object" && obj.dimensions !== null
            ? { ...emptyProduct.dimensions, ...obj.dimensions }
            : { ...emptyProduct.dimensions };
        setNewProduct(obj);
        setPasteMode(false);
        setPastedText("");
        setPastedError(null);
    };

    // --- SUBMIT ---
    const handleAddProduct = async (e) => {
        e.preventDefault();
        setAddLoading(true);
        setAddError(null);
        try {
            const submitData = {
                ...newProduct,
                price: Number(newProduct.price),
                discountedPrice: newProduct.discountedPrice ? Number(newProduct.discountedPrice) : undefined,
                countInStock: Number(newProduct.countInStock),
                rating: Number(newProduct.rating),
                numReviews: Number(newProduct.numReviews),
                sizes: parseArrayInput(newProduct.sizes),
                colors: parseArrayInput(newProduct.colors),
                collections: parseArrayInput(newProduct.collections),
                tags: parseArrayInput(newProduct.tags),
                dimensions: {
                    length: Number(newProduct.dimensions.length) || 0,
                    width: Number(newProduct.dimensions.width) || 0,
                    height: Number(newProduct.dimensions.height) || 0,
                },
                weight: Number(newProduct.weight) || 0,
                images: normalizeImages(newProduct.images),
            };
            await dispatch(createProduct(submitData)).unwrap();
            dispatch(fetchAdminProducts());
            closeAddModal();
        } catch (err) {
            setAddError(err.message || "Failed to add product");
        } finally {
            setAddLoading(false);
        }
    };

    // ------------- RENDER ----------------
    if (loading) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Product Management</h2>
                <button
                    onClick={openAddModal}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    + Add Product
                </button>
            </div>
            {/* Table */}
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
                            products.map((product) => (
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
                                        <Link
                                            to={`/admin/products/${product._id}/edit`}
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
                                </tr>
                            ))
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
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div
                        className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8 relative max-h-[90vh] overflow-y-auto"
                    >
                        <button
                            className="absolute right-5 top-3 text-2xl text-gray-500 hover:text-red-500"
                            onClick={closeAddModal}
                            title="Close"
                        >
                            &times;
                        </button>
                        <div className="flex items-center gap-2 mb-4">
                            <h3 className="text-xl font-semibold flex-1">Add New Product</h3>
                            <button
                                type="button"
                                onClick={handlePasteModeToggle}
                                className={`px-3 py-1 rounded text-sm border ${pasteMode ? "bg-blue-100 border-blue-500 text-blue-700" : "bg-gray-100 border-gray-300 text-gray-700"} hover:bg-blue-200`}
                            >
                                {pasteMode ? "Cancel Paste" : "Paste Object"}
                            </button>
                        </div>
                        {/* Paste product mode */}
                        {pasteMode ? (
                            <>
                                <textarea
                                    rows={10}
                                    className="w-full border border-gray-300 rounded-md p-2 font-mono"
                                    placeholder={`Paste product object here (object literal or JSON)`}
                                    value={pastedText}
                                    onChange={handlePastedTextChange}
                                />
                                {pastedError && <div className="text-red-500 text-sm mt-2">{pastedError}</div>}
                                <div className="flex justify-end gap-3 mt-2">
                                    <button
                                        type="button"
                                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                                        onClick={handlePasteModeToggle}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
                                        onClick={handlePasteProduct}
                                    >
                                        Fill Form
                                    </button>
                                </div>
                            </>
                        ) : (
                        <form onSubmit={handleAddProduct} className="space-y-4">
                            <div>
                                <label className="block font-semibold mb-1">Name</label>
                                <input
                                    name="name"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    value={newProduct.name}
                                    onChange={handleAddChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Description</label>
                                <textarea
                                    name="description"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    value={newProduct.description}
                                    onChange={handleAddChange}
                                    rows={2}
                                    required
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block font-semibold mb-1">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={newProduct.price}
                                        onChange={handleAddChange}
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block font-semibold mb-1">Discounted Price</label>
                                    <input
                                        type="number"
                                        name="discountedPrice"
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={newProduct.discountedPrice}
                                        onChange={handleAddChange}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block font-semibold mb-1">Count In Stock</label>
                                    <input
                                        type="number"
                                        name="countInStock"
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={newProduct.countInStock}
                                        onChange={handleAddChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block font-semibold mb-1">SKU</label>
                                    <input
                                        name="sku"
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={newProduct.sku}
                                        onChange={handleAddChange}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block font-semibold mb-1">Brand</label>
                                    <input
                                        name="brand"
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={newProduct.brand}
                                        onChange={handleAddChange}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block font-semibold mb-1">Category</label>
                                    <input
                                        name="category"
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={newProduct.category}
                                        onChange={handleAddChange}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block font-semibold mb-1">Sizes (comma-separated)</label>
                                    <input
                                        name="sizes"
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={Array.isArray(newProduct.sizes) ? newProduct.sizes.join(",") : newProduct.sizes}
                                        onChange={handleAddChange}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block font-semibold mb-1">Colors (comma-separated)</label>
                                    <input
                                        name="colors"
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={Array.isArray(newProduct.colors) ? newProduct.colors.join(",") : newProduct.colors}
                                        onChange={handleAddChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Collections (comma-separated)</label>
                                <input
                                    name="collections"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    value={Array.isArray(newProduct.collections) ? newProduct.collections.join(",") : newProduct.collections}
                                    onChange={handleAddChange}
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block font-semibold mb-1">Material</label>
                                    <input
                                        name="material"
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={newProduct.material}
                                        onChange={handleAddChange}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block font-semibold mb-1">Gender</label>
                                    <input
                                        name="gender"
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={newProduct.gender}
                                        onChange={handleAddChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Tags (comma-separated)</label>
                                <input
                                    name="tags"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    value={Array.isArray(newProduct.tags) ? newProduct.tags.join(",") : newProduct.tags}
                                    onChange={handleAddChange}
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Dimensions (L, W, H)</label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        name="dimension_length"
                                        placeholder="Length"
                                        className="border border-gray-300 rounded-md p-2 w-1/3"
                                        value={newProduct.dimensions.length}
                                        onChange={handleAddChange}
                                    />
                                    <input
                                        type="number"
                                        name="dimension_width"
                                        placeholder="Width"
                                        className="border border-gray-300 rounded-md p-2 w-1/3"
                                        value={newProduct.dimensions.width}
                                        onChange={handleAddChange}
                                    />
                                    <input
                                        type="number"
                                        name="dimension_height"
                                        placeholder="Height"
                                        className="border border-gray-300 rounded-md p-2 w-1/3"
                                        value={newProduct.dimensions.height}
                                        onChange={handleAddChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Weight (kg)</label>
                                <input
                                    type="number"
                                    name="weight"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    value={newProduct.weight}
                                    onChange={handleAddChange}
                                />
                            </div>
                            <div className="flex items-center gap-6">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="isFeatured"
                                        checked={newProduct.isFeatured}
                                        onChange={handleAddChange}
                                    />{" "}
                                    Featured
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="isPublished"
                                        checked={newProduct.isPublished}
                                        onChange={handleAddChange}
                                    />{" "}
                                    Published
                                </label>
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Images</label>
                                <div className="flex flex-col md:flex-row gap-2 mb-2">
                                    <input
                                        type="url"
                                        placeholder="Paste image URL"
                                        className="border border-gray-300 rounded-md p-2 flex-1"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Alt text"
                                        className="border border-gray-300 rounded-md p-2 flex-1"
                                        value={imageAltText}
                                        onChange={(e) => setImageAltText(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddImageByUrl}
                                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                                    >
                                        Add by URL
                                    </button>
                                </div>
                                <div className="flex flex-col md:flex-row gap-2 items-center">
                                    <input
                                        type="file"
                                        onChange={handleAddImageUpload}
                                        disabled={uploadingImg}
                                        className="file:mr-4 file:py-1 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:bg-white file:text-gray-700 hover:file:bg-gray-100"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Alt text for upload"
                                        className="border border-gray-300 rounded-md p-2 flex-1"
                                        value={imageAltText}
                                        onChange={(e) => setImageAltText(e.target.value)}
                                    />
                                    {uploadingImg && <span className="text-gray-500">Uploading...</span>}
                                </div>
                                <div className="flex gap-4 mt-2 flex-wrap">
                                    {newProduct.images.map((img, i) => (
                                        <div key={i} className="relative group">
                                            <img
                                                src={img.url}
                                                alt={img.altText || "Product Image"}
                                                className="w-16 h-16 object-cover rounded shadow"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveNewImage(i)}
                                                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-80 group-hover:opacity-100 transition-opacity"
                                                title="Remove Image"
                                            >
                                                &times;
                                            </button>
                                            {img.altText && (
                                                <div className="absolute bottom-0 left-0 right-0 text-xs bg-white bg-opacity-80 text-center">{img.altText}</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {addError && (
                                <div className="text-red-500 text-sm">{addError}</div>
                            )}
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                                    onClick={closeAddModal}
                                    disabled={addLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
                                    disabled={addLoading || uploadingImg}
                                >
                                    {addLoading ? "Adding..." : "Add Product"}
                                </button>
                            </div>
                        </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductManagement;