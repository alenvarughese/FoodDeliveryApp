import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Foods from './pages/Foods';
import Contact from './pages/Contact';
import Cart from './pages/Cart';

import Login from './components/Login';
import Register from './components/Register';
import ProductDetails from './components/ProductDetails';

import { Provider } from "react-redux";
import store from './components/Store';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="content-container">
          <Routes>

            <Route path="/foods/:id" element={<ProductDetails />} />
            <Route path="/" element={<Home />} />
            <Route path="/foods" element={<Foods />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<MyOrders />} />

          </Routes>
        </div>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;