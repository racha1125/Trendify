import {useEffect } from "react";
import { useNavigate, useParams, /*useNavigate*/ } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails } from "../redux/slices/orderSlice";

function OrderDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const {orderDetails, loading,error} =useSelector((state) => state.orders);
    useEffect(() => {
        dispatch(fetchOrderDetails(id));
    }, [dispatch, id]);

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }
    if (error) {
        return <div className="text-center py-10 text-red-600">{error}</div>;
    }
    if (!orderDetails) {
        return <div className="text-center py-10">No order found.</div>;
    }

    // Prefer orderItems, fallback to checkoutItems for compatibility
    const {
        _id,
        createdAt,
        orderItems = [],
        checkoutItems = [],
        shippingAddress = {},
        paymentMethod,
        isPaid,
        paidAt,
        totalPrice,
        paymentResult
    } = orderDetails;

    const items = Array.isArray(orderItems) && orderItems.length > 0 ? orderItems : checkoutItems;

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
            >
                Back
            </button>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>
            <div className="mb-6 border rounded p-4 flex flex-col md:flex-row md:justify-between">
                <div>
                    <div className="mb-2">
                        <span className="font-semibold">Order ID:</span> {_id}
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold">Order Date:</span> {new Date(createdAt).toLocaleString()}
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold">Payment:</span>{" "}
                        {paymentMethod || "N/A"}{" "}
                        {isPaid ? (
                            <span className="ml-2 text-green-700">(Paid{paidAt ? ` at ${new Date(paidAt).toLocaleString()}` : ""})</span>
                        ) : (
                            <span className="ml-2 text-red-700">(Not Paid)</span>
                        )}
                    </div>
                    {isPaid && paymentResult && paymentResult.id && (
                        <div className="mb-2">
                            <span className="font-semibold">Payment ID:</span> {paymentResult.id}
                        </div>
                    )}
                </div>
                <div>
                    <div className="mb-2">
                        <span className="font-semibold">Total Price:</span> ${totalPrice?.toLocaleString()}
                    </div>
                </div>
            </div>

            <div className="mb-8 border rounded p-4">
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <div>{shippingAddress.firstName} {shippingAddress.lastName}</div>
                <div>{shippingAddress.address}</div>
                <div>{shippingAddress.city}{shippingAddress.city && shippingAddress.country ? ',' : ''} {shippingAddress.country}</div>
                <div>{shippingAddress.postalCode}</div>
                <div>{shippingAddress.phone}</div>
            </div>

            <div className="mb-8 border rounded p-4">
                <h3 className="font-semibold mb-4">Order Items</h3>
                {Array.isArray(items) && items.length > 0 ? (
                    items.map((item, idx) => (
                        <div
                            key={item.productId || item._id || idx}
                            className="flex items-center justify-between border-b py-4 last:border-b-0"
                        >
                            <div className="flex items-center">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded mr-4"
                                />
                                <div>
                                    <div className="font-semibold">{item.name}</div>
                                    <div className="text-gray-500 text-sm">
                                        {item.color} | {item.size}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-semibold">${item.price}</div>
                                <div className="text-gray-500">Qty: {item.quantity}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500">No items in this order.</div>
                )}
            </div>
        </div>
    );
}

export default OrderDetailsPage;