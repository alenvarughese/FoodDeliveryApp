import React from "react";
import PageBanner from "../components/PageBanner";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from '../components/CartSlice';
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <div>
      <PageBanner title="Your Cart" />

      <section className="container mx-auto px-4 py-12">
        {cartItems.length === 0 ? (
          <h5 className="text-center font-bold text-2xl">Your cart is empty</h5>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-center whitespace-no-wrap">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-bold text-gray-900 text-base text-left">
                    Image
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-bold text-gray-900 text-base">
                    Product Title
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-bold text-gray-900 text-base">
                    Price
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-bold text-gray-900 text-base">
                    Quantity
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-bold text-gray-900 text-base">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <Tr item={item} key={item.id} />
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8">
          <h6 className="text-xl font-bold text-gray-800">
            Subtotal: <span className="text-red-500 text-2xl ml-2">₹{totalAmount}</span>
          </h6>
          <p className="text-gray-500 mt-2 text-sm">
            Taxes and shipping will calculate at checkout
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Link to="/foods">
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded text-sm transition-colors duration-300">
                Continue Shopping
              </button>
            </Link>
            <Link to="/checkout">
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded text-sm transition-colors duration-300">
                Proceed to checkout
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Table Row Component ---
const Tr = ({ item }) => {
  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(cartActions.deleteItem(item.id));
  };

  return (
    <tr className="border-b border-gray-200">
      <td className="px-4 py-4 text-left">
        <img
          src={item.image01}
          alt={item.title}
          className="w-10 h-10 object-cover rounded-full"
        />
      </td>
      <td className="px-4 py-4 text-gray-600 font-medium text-center">
        {item.title}
      </td>
      <td className="px-4 py-4 text-gray-600 text-center">
        ₹{item.price}
      </td>
      <td className="px-4 py-4 text-gray-600 text-center">
        {item.quantity}pc
      </td>

      <td className="px-4 py-4 text-center">
        <button onClick={deleteItem} className="hover:bg-red-50 p-2 rounded-full transition-colors hover:cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-red-600"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Cart;