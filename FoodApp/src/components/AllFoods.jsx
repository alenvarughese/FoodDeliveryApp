import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { cartActions } from './CartSlice';

const AllFoods = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/get-menu`);
        const result = await response.json();
        if (result.success) {
          setProducts(result.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const processedProducts = products
    .filter((item) => {
      if (searchTerm === "") return item;
      return item.name?.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      if (sortOption === "high-price") return b.price - a.price;
      if (sortOption === "low-price") return a.price - b.price;
      return 0;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = processedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(processedProducts.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOption]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToNext = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const goToPrev = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

  if (loading) return (
    <div className="py-20 text-center text-gray-500 text-2xl">Loading products...</div>
  );

  return (
    <section className="container mx-auto px-4 py-8">

      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="I'm looking for...."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-red-500"
          />
          <span className="absolute right-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </span>
        </div>
        <div className="w-full md:w-auto">
          <select
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-red-500 bg-white"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="high-price">High Price</option>
            <option value="low-price">Low Price</option>
          </select>
        </div>
      </div>

      {currentItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentItems.map((item) => (
            <div
              key={item._id}
              className="border border-gray-100 p-5 rounded-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-between min-h-[300px]"
            >
              <div className="w-32 h-32 mb-4">
                <Link to={`/foods/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                  />
                </Link>
              </div>

              <h5 className="font-semibold text-lg text-gray-800 text-center mb-6">
                <Link to={`/foods/${item._id}`}>{item.name}</Link>
              </h5>

              <div className="w-full flex justify-between items-center mt-auto">
                <span className="text-red-500 font-bold text-lg">
                  ₹{item.price}
                </span>
                <button
                  className="bg-red-600 hover:bg-red-700 hover:cursor-pointer text-white px-4 py-2 rounded text-sm transition-colors"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          <h2>No products found matching "{searchTerm}"</h2>
        </div>
      )}

      {processedProducts.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-12 gap-3">
          <button
            onClick={goToPrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-white rounded-md transition-colors duration-300 ${currentPage === 1
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-900 hover:bg-red-600'
              }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`w-10 h-10 rounded-md flex items-center justify-center text-white transition-colors duration-300 ${currentPage === i + 1
                ? "bg-red-600"
                : "bg-blue-900 hover:bg-red-600"
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-white rounded-md transition-colors duration-300 ${currentPage === totalPages
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-900 hover:bg-red-600'
              }`}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default AllFoods;