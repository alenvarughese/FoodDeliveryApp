import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageBanner from '../components/PageBanner';

import { useDispatch } from "react-redux";
import { cartActions } from './CartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  const [activeTab, setActiveTab] = useState('description');

  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [reviewMsg, setReviewMsg] = useState('');

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
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/get-menu`);
        const result = await response.json();

        if (result.success) {
          const foundProduct = result.data.find(item => item._id === id);
          if (foundProduct) {
            setProduct(foundProduct);
            setMainImage(foundProduct.image);

            // Filter related products
            const related = result.data.filter(
              item => (item.category?.name || item.category) === (foundProduct.category?.name || foundProduct.category) && item._id !== foundProduct._id
            ).slice(0, 4);
            setRelatedProducts(related);
          }
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Review submitted:", enteredName, enteredEmail, reviewMsg);
  };

  if (loading) return (
    <div className="container mx-auto py-20 text-center text-2xl">Loading details...</div>
  );

  if (!product) {
    return <div className="container mx-auto py-20 text-center text-2xl">Product not found.</div>;
  }

  return (
    <div>
      <PageBanner title={product.name} />

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Images Section */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-4 justify-center md:justify-start">
              {[product.image].map((img, index) => (
                <div
                  key={index}
                  className={`w-20 h-20 border-2 rounded cursor-pointer p-1 ${mainImage === img ? 'border-red-500' : 'border-transparent'}`}
                  onClick={() => setMainImage(img)}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
            <div className="flex-1 flex items-center justify-center bg-red-50 rounded p-4">
              <img src={mainImage} alt={product.name} className="w-full h-auto max-h-[400px] object-contain" />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h2>
            <p className="text-red-500 text-2xl font-semibold mb-5">
              Price: <span className="text-4xl">₹{product.price}</span>
            </p>
            <div className="flex items-center gap-2 mb-8">
              <span className="font-semibold text-gray-700">Category: </span>
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                {product.category?.name || "General"}
              </span>
            </div>
            <button
              className="bg-red-600 text-white px-8 py-3 rounded-md hover:bg-red-700 transition-colors w-fit font-semibold"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* --- TABS SECTION --- */}
        <div className="mt-16">
          <div className="flex gap-8 border-b border-gray-200 mb-6">
            <button
              className={`pb-2 font-semibold text-lg transition-colors ${activeTab === 'description' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`pb-2 font-semibold text-lg transition-colors ${activeTab === 'review' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('review')}
            >
              Review
            </button>
          </div>

          <div className="text-gray-600 leading-relaxed">
            {activeTab === 'description' ? (
              <p>{product.description || "No description available."}</p>
            ) : (
              <div className="mt-4">
                <div className="mb-12">
                  <p className="text-center italic">No reviews yet.</p>
                </div>

                <div className="bg-red-50 p-8 rounded-lg w-full md:w-[70%] mx-auto">
                  <form className="flex flex-col gap-5" onSubmit={submitHandler}>
                    <div>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        required
                        className="w-full bg-transparent border-b border-gray-400 py-2 focus:outline-none focus:border-red-500 placeholder-gray-500"
                        onChange={e => setEnteredName(e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="w-full bg-transparent border-b border-gray-400 py-2 focus:outline-none focus:border-red-500 placeholder-gray-500"
                        onChange={e => setEnteredEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <textarea
                        rows={3}
                        placeholder="Write your review"
                        required
                        className="w-full bg-transparent border-b border-gray-400 py-2 focus:outline-none focus:border-red-500 placeholder-gray-500 resize-none"
                        onChange={e => setReviewMsg(e.target.value)}
                      />
                    </div>

                    <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded mt-4 hover:bg-red-700 w-fit">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">You might also like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {relatedProducts.map((item) => (
              <div key={item._id} className="border border-gray-100 p-5 rounded-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-between min-h-[300px]">
                <div className="w-32 h-32 mb-4">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain hover:scale-110 transition-transform duration-300" />
                </div>
                <h5 className="font-semibold text-lg text-gray-800 text-center mb-4">
                  <Link to={`/foods/${item._id}`}>{item.name}</Link>
                </h5>
                <div className="w-full flex justify-between items-center mt-auto">
                  <span className="text-red-500 font-bold text-lg">₹{item.price}</span>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition-colors" onClick={() => addToCart(item)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;