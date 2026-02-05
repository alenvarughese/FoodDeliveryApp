import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

const CartUi = ({ onClose }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">

      <div
        className="absolute inset-0 bg-black/60 transition-opacity"
        onClick={onClose}
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex animate-slide-in">
        <div className="relative w-screen max-w-md bg-white shadow-2xl flex flex-col h-full">


          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h5 className="text-xl font-bold text-gray-800">Shopping Cart</h5>

            <button
              onClick={onClose}
              className="p-2 bg-gray-100 rounded-full hover:cursor-pointer hover:bg-red-100 hover:text-red-600 transition-colors group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-gray-600 group-hover:text-red-600"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4 text-gray-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                <h6 className="text-xl font-semibold">Your cart is empty</h6>
                <p className="mt-2 text-sm">Add some delicious food!</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))
            )}
          </div>

          {/* Footer */}
          <div className="bg-red-600 p-6 text-white">
            <div className="flex justify-between items-center mb-4">
              <h6 className="text-xl font-bold">Subtotal: <span className="text-3xl">₹{totalAmount}</span></h6>
            </div>
            <Link to="/checkout" onClick={onClose}>
              <button className="w-full bg-white text-red-600 py-3 hover:cursor-pointer rounded-md font-bold text-lg hover:bg-gray-100 transition-colors">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartUi;