import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { clearCart, fetchCart } from "../redux/slices/cartSlice";
import axios from "axios";

function OrderConfirmationPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { checkout } = useSelector((state) => state.checkout);
    // Get userId/guestId from your auth state or localStorage as appropriate
    const userId = useSelector((state) => state.auth?.user?._id);
    const guestId = localStorage.getItem("guestId");

    useEffect(() => {
        const clearAllCarts = async () => {
            if (checkout && checkout._id) {
                // Clear Redux cart and localStorage
                dispatch(clearCart());
                localStorage.setItem("cart", JSON.stringify({ products: [] }));

                // Clear backend cart (with correct userId/guestId)
                try {
                    await axios.post(
                        `${import.meta.env.VITE_BACKEND_URL}/api/cart/clear`,
                        { userId, guestId },
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                            },
                        }
                    );
                } catch (error) {
                    console.error("Error clearing backend cart:", error);
                    // Ignore backend errors here
                }

                // Immediately fetch the fresh (empty) cart from backend and update Redux/localStorage
                dispatch(fetchCart({ userId, guestId }));
            } else {
                navigate("/my-orders");
            }
        };
        clearAllCarts();
        // Only run on checkout change  eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkout, dispatch, navigate, userId, guestId]);

    const calculateEstimatedDelivery = (createdAt) => {
        const orderDate = new Date(createdAt);
        orderDate.setDate(orderDate.getDate() + 10);
        return orderDate.toLocaleDateString();
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
                Thank You for Your Order!
            </h1>
            {checkout && (
                <div className="p-6 rounded-lg border">
                    <div className="flex justify-between mb-20">
                        <div>
                            <h2 className="text-xl font-semibold">
                                Order ID: {checkout._id}
                            </h2>
                            <p className="text-gray-500">
                                Order date: {new Date(checkout.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-emerald-700 text-sm">
                                Estimated Delivery: {calculateEstimatedDelivery(checkout.createdAt)}
                            </p>
                        </div>
                    </div>
                    <div className="mb-20">
                        {Array.isArray(checkout.checkoutItems) && checkout.checkoutItems.length > 0 ? (
                            checkout.checkoutItems.map((item) => (
                                <div key={item.productId || item._id} className="flex items-center mb-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-md mr-4"
                                    />
                                    <div>
                                        <h4 className="text-md font-semibold">{item.name}</h4>
                                        <p className="text-sm text-gray-500">
                                            {item.color} | {item.size}
                                        </p>
                                    </div>
                                    <div className="ml-auto text-right">
                                        <p className="text-md">${item.price}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500">No items in this order.</div>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Payment</h4>
                            <p className="text-gray-600">PayPal</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Delivery</h4>
                            <p className="text-gray-600">
                                {checkout.shippingAddress?.address}
                            </p>
                            <p className="text-gray-600">
                                {checkout.shippingAddress?.city}, {checkout.shippingAddress?.country}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderConfirmationPage;