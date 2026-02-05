import React from 'react';
import hero from '../images/hero.png';
import PopularFoods from '../components/PopularFoods';
import WhyFreshBites from '../components/WhyFreshBites';
import Testimonial from '../components/Network';
import CategorySection from '../components/CategorySection';
import { NavLink } from 'react-router-dom';

const Home = () => {
  
  const services = [
    {
      title: "Quick Delivery",
      description: "Experience lightning-fast delivery with Fresh Bites, ensuring your meal arrives swiftly to your doorstep.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-16 h-16 mx-auto mb-4">
          <path fill="#e11d48" d="M48 24h-8l-4-8h-8l-4 8H12a4 4 0 00-4 4v16a4 4 0 004 4h4a8 8 0 0016 0h12a8 8 0 0016 0h2a2 2 0 002-2v-8a14 14 0 00-14-14z" opacity="0.2"/>
          <circle cx="20" cy="48" r="6" fill="#1f2937" />
          <circle cx="52" cy="48" r="6" fill="#1f2937" />
          <path fill="#e11d48" d="M42 24h8v12h-8z" />
          <path fill="#374151" d="M26 42h20v4H26z" />
          <path fill="#374151" d="M18 24l8 18h-4l-8-18z" />
          <path fill="#374151" d="M14 24h8v4h-8z" />
        </svg>
      )
    },
    {
      title: "Super Dine In",
      description: "Experience the ultimate dining convenience with Super Dine In, where delicious meals are just a click away.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-16 h-16 mx-auto mb-4">
           <path fill="#fcd34d" d="M8 44h48v4H8z" />
           <path fill="#fbbf24" d="M12 44c0-14 8-26 20-26s20 12 20 26H12z" />
           <circle cx="32" cy="14" r="4" fill="#e11d48" />
           <path fill="#f59e0b" d="M14 44h36v-4H14z" opacity="0.3"/>
        </svg>
      )
    },
    {
      title: "Easy Pick Up",
      description: "Enjoy the convenience of easy pick-up options, making your Fresh Bites experience even more seamless.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-16 h-16 mx-auto mb-4">
           <path fill="#e11d48" d="M48 40l-16 16-16-16h32z" />
           <path fill="#1f2937" d="M12 36h40v4H12z" />
           <path fill="#fcd34d" d="M16 36c0-10 6-20 16-20s16 10 16 20H16z" />
           <circle cx="32" cy="12" r="3" fill="#e11d48" />
        </svg>
      )
    }
  ];

  return (
    <div className="w-full">
     
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            
            {/* Left Column: Text Content */}
            <div className="w-full md:w-1/2 space-y-8">
              <div>
                <h3 className="text-lg text-gray-600 font-medium mb-2">
                  Easy way to make an order
                </h3>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  <span className="text-red-600">HUNGRY?</span> Just wait <br className="hidden md:block" />
                  food at <span className="text-red-600">your door</span>
                </h1>
              </div>
              
              <p className="text-gray-600 text-lg max-w-md leading-relaxed">
                Welcome to Fresh Bites, your ultimate destination for delicious and fresh online food ordering!
              </p>
              
              
              <div className="flex flex-wrap gap-4">
                <button className="bg-red-600 hover:bg-red-700 hover:cursor-pointer text-white font-medium py-3 px-8 rounded-md flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Order now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <NavLink to="/foods">
                <button className="bg-white text-red-600 border hover:cursor-pointer border-red-600 hover:bg-red-50 font-medium py-3 px-8 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md">
                  See all foods
                </button>
                </NavLink>
              </div>
              
              
              <div className="flex flex-wrap items-center gap-8 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium text-sm">No shipping charge</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium text-sm">100% secure checkout</span>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
              
              <img src={hero} alt="heroimage" />
            </div>
          </div>
        </div>
      </section>

      <CategorySection/>

      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h4 className="text-red-500 font-medium text-lg mb-2">What we serve</h4>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Just sit back at home <br />
              we will <span className="text-red-600">take care</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-center leading-relaxed">
              At Fresh Bites, we serve a delectable array of dishes crafted with care and made with the freshest ingredients. 
              From wholesome salads to savory entrees and delightful desserts, there's something to satisfy every craving.
            </p>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {services.map((service, index) => (
              <div key={index} className="flex flex-col items-center px-4 group cursor-pointer">
                
                <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
      <PopularFoods/>
      <WhyFreshBites/>
      <Testimonial/>
    </div>

   
  );
};

export default Home;