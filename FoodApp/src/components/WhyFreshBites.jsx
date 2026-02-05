import React from 'react';
import location from '../images/location.png'

const WhyFreshBites = () => {
  
  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          
          
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
           
            <img src={location} alt="locationimage" />
          </div>

          
          <div className="w-full md:w-1/2 space-y-8">
            
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Fresh Bites?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                At Fresh Bites, we’re not just a food service — we’re a culinary journey. Discover the unparalleled freshness and taste that sets us apart. From farm-fresh ingredients to expertly crafted dishes, every bite is an experience worth savoring.
              </p>
            </div>

           
            <div className="space-y-6 mt-8">
              
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <CheckIcon />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Fresh and tasty foods</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    Indulge in a world of fresh and tasty foods meticulously prepared by our talented chefs. Each dish is a masterpiece of flavor, showcasing the finest ingredients and culinary expertise.
                  </p>
                </div>
              </div>

              
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <CheckIcon />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Quality support</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    At Fresh Bites, we pride ourselves on delivering not only exceptional food but also outstanding customer support.
                  </p>
                </div>
              </div>

             
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <CheckIcon />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Order from any location</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    With our convenient platform, delicious food is always just a tap away.
                  </p>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default WhyFreshBites;