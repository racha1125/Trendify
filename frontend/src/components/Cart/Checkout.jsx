import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PaypalButton from './PaypalButton';
import { useDispatch, useSelector } from 'react-redux';
import { createCheckout } from '../../redux/slices/checkoutSlice';
import axios from 'axios';

function Checkout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cart);  
    const { user } = useSelector((state) => state.auth);
    const { checkout, loading, error } = useSelector((state) => state.checkout);

    const [checkoutId, setCheckoutId] = useState(null);
    const [checkoutError, setCheckoutError] = useState(null);
    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
    });

    useEffect(() => {
        if (!cart || !cart.products || cart.products.length === 0) {
            navigate("/");
        }
    }, [cart, navigate]);

    const handleCreateCheckout = async (e) => {
        e.preventDefault();
        setCheckoutError(null);
        if (cart && cart.products.length > 0) {
            try {
                const payload = {
                    checkoutItems: cart.products,
                    shippingAddress,
                    paymentMethod: "paypal",
                    totalPrice: cart.totalPrice,
                };
                const res = await dispatch(createCheckout(payload));
                if (res.error) {
                    setCheckoutError(
                        res.error.message || res.payload || "Unknown error creating checkout session."
                    );
                } else if (res.payload && res.payload._id) {
                    setCheckoutId(res.payload._id);
                } else if (checkout && checkout._id) {
                    setCheckoutId(checkout._id);
                }
            } catch (err) {
                setCheckoutError("Unexpected error: " + (err.message || err));
                console.error("Unexpected error creating checkout session:", err);
            }
        }
    };

    const handlePaymentSuccess = async (details) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
                { paymentStatus: "Paid", paymentDetails: details },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            if (response.status >= 200 && response.status < 300) {
                await handleFinalizeCheckout(checkoutId);
            } else {
                setCheckoutError("Error updating payment status: " + response.status);
            }
        } catch (error) {
            setCheckoutError("Error updating payment status: " + (error.response?.data?.message || error.message));
            console.error("Error updating payment status:", error);
        }
    };

    const handleFinalizeCheckout = async (checkoutId) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            if (response.status >= 200 && response.status < 300) {
                navigate("/order-confirmation");
            } else {
                setCheckoutError("Unexpected response status: " + response.status);
            }
        } catch (error) {
            setCheckoutError("Error finalizing checkout: " + (error.response?.data?.message || error.message));
            console.error("Error finalizing checkout:", error);
        }
    };

    if (loading) return <div className='text-center py-10'>Loading...</div>;
    if (error)   return <div className='text-center py-10 text-red-500'>Error: {error}</div>;
    if (!cart || !cart.products || cart.products.length === 0) {
        return <div className='text-center py-10'>Your cart is empty. Please add items to your cart before proceeding to checkout.</div>;
    }
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter'>
            {/* Left Section */}
            <div className='bg-white rounded-lg p-6'>
                <h2 className='text-2xl uppercase mb-6'>Checkout</h2>
                <form onSubmit={handleCreateCheckout}>
                    <h3 className='text-lg mb-4'>Contact Details</h3>
                    <div className='mb-4'>
                        <label htmlFor="" className='block text-gray-700'>Email</label>
                        <input
                            type="email"
                            value={user ? user.email : ""}
                            className='w-full p-2 border rounded'
                            disabled
                        />
                    </div>
                    <h3 className='text-lg'>Delivery</h3>
                    <div className='mb-4 grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-gray-700'>First Name</label>
                            <input
                                type="text"
                                value={shippingAddress.firstName}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                                className='w-full p-2 border rounded'
                                required
                            />
                        </div>
                        <div>
                            <label className='block text-gray-700'>Last Name</label>
                            <input
                                type="text"
                                value={shippingAddress.lastName}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                                className='w-full p-2 border rounded'
                                required
                            />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Address</label>
                        <input
                            type="text" value={shippingAddress.address}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                            className='w-full p-2 border rounded'
                            required
                        />
                    </div>
                    <div className='mb-4 grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-gray-700'>City</label>
                            <input
                                type="text"
                                value={shippingAddress.city}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                                className='w-full p-2 border rounded'
                                required
                            />
                        </div>
                        <div>
                            <label className='block text-gray-700'>Postal Code</label>
                            <input
                                type="text"
                                value={shippingAddress.postalCode}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                                className='w-full p-2 border rounded'
                                required
                            />
                        </div>
                        <div>
                            <label className='block text-gray-700'>Country</label>
                            <input
                                type="text" value={shippingAddress.country}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                                className='w-full p-2 border rounded'
                                required
                            />
                        </div>
                        <div>
                            <label className='block text-gray-700'>Phone</label>
                            <input
                                type="text"
                                value={shippingAddress.phone}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                                className='w-full p-2 border rounded'
                                required
                            />
                        </div>
                    </div>
                    {checkoutError && (
                        <div className="text-red-500 text-sm mb-4">{checkoutError}</div>
                    )}
                    <div className='mt-6'>
                        {!checkoutId ? (
                            <button type='submit' className='w-full bg-black text-white py-3 rounded'>
                                Continue to Payment
                            </button>
                        ) : (
                            <div>
                                <h3 className='text-lg mb-4'>Pay with Paypal</h3>
                                <PaypalButton
                                    amount={cart.totalPrice}
                                    onSuccess={handlePaymentSuccess}
                                    onError={(err) =>
                                        alert("Payment failed. Try again.", err)} />
                            </div>
                        )}
                    </div>
                </form>
            </div>
            {/* Right Section */}
            <div className='bg-gray-50 p-6 rounded-lg'>
                <h3 className='text-lg mb-4'>Order Summary</h3>
                <div className='border-t py-4 mb-4'>
                    {cart.products.map((product, index) => (
                        <div key={index} className='flex items-start justify-between py-2 border-b'>
                            <div className='flex items-start'>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className='w-20 h-24 object-cover mr-4' />
                                <div>
                                    <h3 className='text-md'>{product.name}</h3>
                                    <p className='text-gray-500'>Size: {product.size}</p>
                                    <p className='text-gray-500'>Color: {product.color}</p>
                                </div>
                            </div>
                            <p className='text-xl'>${product.price?.toLocaleString()}</p>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between items-center text-lg mb-4'>
                    <p>Subtotal</p>
                    <p>${cart.totalPrice?.toLocaleString()}</p>
                </div>
                <div className='flex justify-between items-center text-lg mb-4'>
                    <p>Shipping</p>
                    <p>Free</p>
                </div>
                <div className='flex justify-between items-center text-lg border-t pt-4 mt-4'>
                    <p>Total</p>
                    <p>${cart.totalPrice?.toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default Checkout;