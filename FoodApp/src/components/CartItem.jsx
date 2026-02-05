import React from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../components/CartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { id, title, price, image01, quantity, totalPrice } = item;


  const incrementItem = () => {
    dispatch(cartActions.addItem({ id, title, price, image01 }));
  };

  const decrementItem = () => {
    dispatch(cartActions.removeItem(id));
  };

  const deleteItem = () => {
    dispatch(cartActions.deleteItem(id));
  };

  return (
    <div className="flex items-start gap-4 mb-6 border-b border-gray-100 pb-4">
      {/* Product Image */}
      <img src={image01} alt={title} className="w-16 h-16 object-cover rounded-md" />

      <div className="flex-grow flex flex-col justify-between min-h-[64px]">
        <div>
          {/* Title */}
          <h6 className="text-base font-bold text-gray-800 leading-tight mb-1">{title}</h6>
          {/* Price and Quantity Info */}
          <p className="text-sm text-gray-600">
            {quantity}x <span className="text-red-500 font-bold">₹{price}</span> = <span className="font-semibold text-gray-800">₹{totalPrice}</span>
          </p>
        </div>
        {/* Quantity Controls (+ and - buttons) */}
        <div className="flex items-center gap-4 bg-red-50 rounded-md px-3 py-1 w-fit mt-2">
          <button onClick={incrementItem} className="text-xl text-red-500 leading-none hover:text-red-700 transition-colors">+</button>
          <span className="text-base font-medium text-gray-800">{quantity}</span>
          <button onClick={decrementItem} className="text-xl text-red-500 leading-none hover:text-red-700 transition-colors">-</button>
        </div>
      </div>

      {/* Delete 'x' Button */}
      <button onClick={deleteItem} className="text-gray-400 hover:text-red-500 transition-colors text-2xl leading-none">
        <i className="ri-close-line"></i>
      </button>
    </div>
  );
};

export default CartItem;