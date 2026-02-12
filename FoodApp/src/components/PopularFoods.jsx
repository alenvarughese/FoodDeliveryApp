import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { useDispatch } from "react-redux";
import { cartActions } from './CartSlice'

const PopularFoods = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [allProducts, setAllProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [categories, setCategories] = useState([{ name: 'All', icon: '' }]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const addToCart = (item) => {
    dispatch(
      cartActions.addItem({
        id: item._id,
        title: item.name,
        image01: item.image,
        price: item.price,
      })
    );
    alert("Product added to cart!");
  };

  const categoryIcons = {
    "Burger": "🍔",
    "Pizza": "🍕",
    "Bread": "🌭",
    "Snacks": "🌭",
    "Drinks": "🥤",
    "Cold Drink": "🥤",
    "Fastfood": "🍟"
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuRes, catRes] = await Promise.all([
          api.get("/get-menu"),
          api.get("/api/categories")
        ]);

        const menuData = menuRes.data;
        const catData = catRes.data;

        if (menuData.success) {
          setAllProducts(menuData.data);
          setDisplayProducts(menuData.data);
        }

        if (catData.success) {
          setCategories([{ name: 'All', icon: '' }, ...catData.data]);
        }
      } catch (error) {
        console.error("Error fetching menu data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setDisplayProducts(allProducts);
    } else {
      const filtered = allProducts.filter(
        (item) => (item.category?.name || item.category) === selectedCategory
      );
      setDisplayProducts(filtered);
    }
  }, [selectedCategory, allProducts]);

  if (loading) return (
    <div className="py-20 text-center text-gray-500">Loading foods...</div>
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Popular Foods
        </h2>

        {/* Filter Bar */}
        <div className="bg-red-600 p-2 rounded-lg mb-16 flex justify-center w-full md:w-auto mx-auto overflow-x-auto">
          <div className="flex space-x-2">
            {categories.map((cat) => (
              <button
                key={cat._id || cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-200 whitespace-nowrap
                  ${selectedCategory === cat.name ? 'bg-white text-red-600 shadow-sm' : 'text-white hover:bg-red-700'}`}
              >
                <span>{categoryIcons[cat.name] || ''}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.map((item) => (
            <div
              key={item._id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center border border-gray-100"
            >
              <Link to={`/foods/${item._id}`} className="w-40 h-40 mb-6 transform transition-transform duration-300 hover:scale-105">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </Link>

              <h3 className="text-lg font-bold text-gray-800 mb-4 flex-grow">
                <Link to={`/foods/${item._id}`}>{item.name}</Link>
              </h3>

              <div className="w-full flex justify-between items-center pt-2 border-t border-gray-50">
                <span className="text-xl font-extrabold text-red-600">
                  ₹{item.price}
                </span>
                <button className="bg-red-600 hover:bg-red-700 text-white hover:cursor-pointer font-medium py-2 px-5 rounded-md transition-colors duration-200" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularFoods;