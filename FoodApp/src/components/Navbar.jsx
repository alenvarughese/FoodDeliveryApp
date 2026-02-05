import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from "../images/res-logo.png";
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from './CartSlice';
import CartUi from './CartUi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showCart, setShowCart] = useState(false);

    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const dispatch = useDispatch();

    const linkClasses = ({ isActive }) =>
        `font-medium text-lg transition-colors duration-200 hover:text-red-500 ${isActive ? 'text-red-500' : 'text-gray-600'
        }`;

    // Helper function to toggle the cart slider
    const toggleCart = () => {
        setShowCart(!showCart);
    };

    const handleLogout = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            if (user && user._id) {
                await fetch(`http://localhost:5000/api/users/${user._id}/status`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: "inactive" }),
                });
            }
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            dispatch(cartActions.clearCart());
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
    };

    return (
        <>
            <nav className="bg-white shadow-sm sticky top-0 z-50 fixed top-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">

                        {/* Logo */}
                        <NavLink to="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 flex items-center justify-center">
                                <img src={logo} alt="logo" />
                            </div>
                            <span className="font-bold text-2xl text-gray-800 tracking-tight">Fresh Bites</span>
                        </NavLink>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-10">
                            <NavLink to="/" className={linkClasses}>Home</NavLink>
                            <NavLink to="/foods" className={linkClasses}>Foods</NavLink>
                            <NavLink to="/orders" className={linkClasses}>My Orders</NavLink>
                            <NavLink to="/cart" className={linkClasses}>Cart</NavLink>
                            <NavLink to="/contact" className={linkClasses}>Contact</NavLink>
                        </div>

                        {/* Icons Section */}
                        <div className="flex items-center gap-6">

                            {/* Cart Icon - CHANGED to a button that toggles the slider */}
                            <button onClick={toggleCart} className="relative group cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-600 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                {/* Badge Number from Redux */}
                                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                                    {totalQuantity}
                                </span>
                            </button>

                            {/* User Icon / Auth Section */}
                            <div className="flex items-center gap-2">
                                {localStorage.getItem("user") ? (() => {
                                    const user = JSON.parse(localStorage.getItem("user") || "{}");
                                    const firstName = user.name ? user.name.split(' ')[0] : 'User';
                                    return (
                                        <div className="flex items-center gap-4">
                                            <span className="text-gray-700 font-medium truncate max-w-[100px]" title={user.name || 'User'}>
                                                Hi, {firstName}
                                            </span>
                                            <button
                                                onClick={handleLogout}
                                                className="text-gray-600 hover:text-red-500 transition-colors cursor-pointer"
                                                title="Logout"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                            </button>
                                        </div>
                                    );
                                })() : (
                                    <Link to="/login" className="text-gray-600 hover:text-red-500 transition-colors cursor-pointer" title="Login">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </Link>
                                )}
                            </div>

                            {/* Mobile Menu Button */}
                            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100">
                        <div className="flex flex-col px-4 py-4 space-y-4">
                            <NavLink to="/" className={linkClasses} onClick={() => setIsOpen(false)}>Home</NavLink>
                            <NavLink to="/foods" className={linkClasses} onClick={() => setIsOpen(false)}>Foods</NavLink>
                            <NavLink to="/cart" className={linkClasses} onClick={() => setIsOpen(false)}>Cart</NavLink>
                            <NavLink to="/contact" className={linkClasses} onClick={() => setIsOpen(false)}>Contact</NavLink>
                        </div>
                    </div>
                )}
            </nav>

            {/* 5. Conditionally render the CartUi slider */}
            {showCart && <CartUi onClose={toggleCart} />}
        </>
    );
};

export default Navbar;