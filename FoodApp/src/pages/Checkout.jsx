import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../components/CartSlice";
import PageBanner from "../components/PageBanner";
import api from "../api/api";

const Checkout = () => {
  // 1. Get the subtotal from Redux
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);

  // 2. Define shipping cost (Static ₹30 based on your image)
  const shippingCost = 30;

  // 3. Calculate final total
  const totalAmount = cartTotalAmount + shippingCost;

  // Form handling
  const [enterName, setEnterName] = useState("");
  const [enterEmail, setEnterEmail] = useState("");
  const [enterPhone, setEnterPhone] = useState("");
  const [enterCountry, setEnterCountry] = useState("");
  const [enterCity, setEnterCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // Pre-fill user data
  React.useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (savedUser) {
      setEnterName(savedUser.name || "");
      setEnterEmail(savedUser.email || "");
    }
  }, []);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    // Get user from localStorage
    const savedUser = JSON.parse(localStorage.getItem("user") || "null");

    if (!savedUser) {
      alert("Please login to place an order");
      window.location.href = "/login";
      return;
    }

    const orderData = {
      userId: savedUser._id || savedUser.id,
      shippingAddress: {
        name: enterName,
        email: enterEmail,
        phone: enterPhone,
        country: enterCountry,
        city: enterCity,
        postalCode: postalCode,
      },
      cartItems: cartItems.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image01: item.image01
      })),
      totalAmount: totalAmount
    };

    try {
      const response = await api.post("/api/orders", orderData);
      const result = response.data;

      if (result.success) {
        alert("Order placed successfully!");
        // Clear cart in Redux and localStorage
        dispatch(cartActions.clearCart());
        // For localStorage, we might need a specific cleanup if clearCart doesn't do it for the user context
        localStorage.removeItem(`cartItems_${orderData.userId}`);
        localStorage.removeItem(`totalAmount_${orderData.userId}`);
        localStorage.removeItem(`totalQuantity_${orderData.userId}`);

        window.location.href = "/orders";
      } else {
        alert(result.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      {/* Banner */}
      <PageBanner title="Checkout" />

      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-10">

          {/* --- LEFT SIDE: Shipping Form --- */}
          <div className="w-full md:w-2/3">
            <h6 className="text-xl font-bold mb-8 text-gray-800">Shipping Address</h6>

            <form className="flex flex-col gap-6" onSubmit={submitHandler}>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                  value={enterName}
                  readOnly
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-red-500 text-gray-400 bg-gray-50 cursor-not-allowed"
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={enterEmail}
                  readOnly
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-red-500 text-gray-400 bg-gray-50 cursor-not-allowed"
                />
              </div>

              <div className="form-group">
                <input
                  type="number"
                  placeholder="Phone number"
                  required
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-red-500 text-gray-600 placeholder-gray-400"
                  onChange={(e) => setEnterPhone(e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Country"
                  required
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-red-500 text-gray-600 placeholder-gray-400"
                  onChange={(e) => setEnterCountry(e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="City"
                  required
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-red-500 text-gray-600 placeholder-gray-400"
                  onChange={(e) => setEnterCity(e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="number"
                  placeholder="Postal code"
                  required
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-red-500 text-gray-600 placeholder-gray-400"
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="mt-6 bg-red-600 text-white font-semibold py-2 px-6 rounded hover:bg-red-700 transition-colors w-fit"
              >
                Payment
              </button>
            </form>
          </div>

          {/* --- RIGHT SIDE: Order Summary --- */}
          <div className="w-full md:w-1/3">
            <div className="bg-red-50 p-8 rounded-md">
              <div className="flex justify-between items-center mb-4">
                <h6 className="text-gray-700 font-medium">Subtotal:</h6>
                <span className="font-bold text-gray-800">₹{cartTotalAmount}</span>
              </div>

              <div className="flex justify-between items-center mb-4">
                <h6 className="text-gray-700 font-medium">Shipping:</h6>
                <span className="font-bold text-gray-800">₹{shippingCost}</span>
              </div>

              <div className="border-t border-gray-300 my-4"></div>

              <div className="flex justify-between items-center">
                <h5 className="text-xl font-bold text-gray-900">Total:</h5>
                <span className="text-xl font-bold text-gray-900">₹{totalAmount}</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Checkout;