import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageBanner from '../components/PageBanner';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                if (user && user._id) {
                    const response = await axios.get(`http://localhost:5000/api/users/${user._id}/orders`);
                    if (response.data.success) {
                        setOrders(response.data.data);
                    }
                }
            } catch (error) {
                console.error('Error fetching user orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserOrders();
    }, []);

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
            case 'Preparing': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'Completed': return 'bg-green-50 text-green-600 border-green-100';
            case 'Cancelled': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    return (
        <div>
            <PageBanner title="My Orders" />
            <section className="container mx-auto px-4 py-20">
                {loading ? (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500"></div>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto space-y-6">
                        {orders.length === 0 ? (
                            <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                <span className="text-5xl mb-4 block">📦</span>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">No orders found</h3>
                                <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
                                <a href="/foods" className="bg-red-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-600 transition">
                                    Start Shopping
                                </a>
                            </div>
                        ) : (
                            orders.map((order) => (
                                <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-300">
                                    <div className="p-6">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Order #{order._id.substring(order._id.length - 8)}</span>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyles(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-500 font-medium mb-1">Total Amount</p>
                                                <h4 className="text-2xl font-black text-red-600">₹{order.totalAmount}</h4>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 rounded-xl p-4 mb-4">
                                            <h5 className="text-xs font-bold text-gray-400 uppercase mb-3">Order Items</h5>
                                            <div className="space-y-3">
                                                {order.cartItems.map((item, idx) => (
                                                    <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center font-bold text-red-500 text-xs">
                                                                {item.quantity}x
                                                            </div>
                                                            <span className="font-bold text-gray-700 text-sm">{item.title}</span>
                                                        </div>
                                                        <span className="text-sm font-bold text-gray-800">₹{item.price * item.quantity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm mt-4 pt-4 border-t border-gray-100">
                                            <div className="flex gap-2">
                                                <span className="text-gray-400">Ship to:</span>
                                                <span className="font-bold text-gray-700">{order.shippingAddress.name}, {order.shippingAddress.city}</span>
                                            </div>
                                            {order.status === 'Completed' && (
                                                <div className="text-green-600 font-bold flex items-center gap-1">
                                                    <span>✅</span> Delivered successfully
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </section>
        </div>
    );
};

export default MyOrders;
