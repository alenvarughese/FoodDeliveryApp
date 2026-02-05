import React, { useState, useEffect } from 'react';
import prof1 from '../images/person1.jpg'
import prof2 from '../images/person2.jpg'
import network from '../images/network.png'

const Testimonial = () => {
  // 1. Testimonial Data
  // Add your actual testimonial text, names, and image paths here.
  const testimonials = [
    {
      id: 1,
      text: "\"Fresh Bites redefines freshness with every dish. I couldn't believe the difference in taste until I tried their farm-to-table ingredients. It's like they've captured the essence of freshness in every bite.\"",
      name: "Smit Patel",
      // Replace with your actual profile picture path
      image: prof1
    },
    {
      id: 2,
      text: "\"The delivery was incredibly fast, and the food was still piping hot! The flavors in the chicken burger were absolutely incredible. Definitely my go-to for ordering in now.\"",
      name: "Priya Sharma",
      // Replace with your actual profile picture path
      image: prof2
    },
    {
      id: 3,
      text: "\"I love the variety on the menu. Whether I want a healthy salad or a cheesy pizza, they have the best options. Great service and amazing quality every single time.\"",
      name: "Rahul Verma",
      // Replace with your actual profile picture path
      image: prof2
    }
  ];

  // 2. State to track current slide index
  const [currentIndex, setCurrentIndex] = useState(0);

  // 3. Auto-play Logic (useEffect)
  useEffect(() => {
    // Set an interval to change the slide every 3 seconds (3000ms)
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        // If at the last slide, go back to 0, otherwise go to next slide
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change slides every 4 seconds

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Helper function for manual navigation via dots
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
         
          <div className="w-full md:w-1/2 space-y-6">
            {/* Headings */}
            <div>
              <h4 className="text-red-600 font-medium text-lg mb-2">Testimonial</h4>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                What our <span className="text-red-600">customers</span> are saying
              </h2>
            </div>
             
             {/* Static Intro Text */}
            <p className="text-gray-600 leading-relaxed mb-8">
              Fresh Bites truly lives up to its name! Every bite bursts with freshness and flavor. From the crisp salads to the hearty sandwiches, each dish is a delightful journey for the taste buds.
            </p>

            {/* === CAROUSEL AREA === */}
            <div className="min-h-[200px] flex flex-col justify-between">
               {/* Dynamic Testimonial Text */}
              <p className="text-gray-700 italic text-lg leading-relaxed mb-6">
                 {testimonials[currentIndex].text}
              </p>

              {/* User Profile Section */}
              <div className="flex items-center gap-4 mb-8">
                {/* Profile Image */}
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 shadow-sm">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                    // Add a placeholder error handler in case image path is wrong
                    onError={(e) => {e.target.src = 'https://via.placeholder.com/64?text=User'}}
                  />
                </div>
                 {/* User Name */}
                <h4 className="font-bold text-gray-900 text-lg">
                  {testimonials[currentIndex].name}
                </h4>
              </div>

              {/* Carousel Indicators (Dots) */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentIndex 
                        ? 'w-8 h-2 bg-red-600' // Active Dot style
                        : 'w-2 h-2 bg-gray-300 hover:bg-gray-400' // Inactive Dot style
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            

          </div>

          
          <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
             
           <img src={network} alt="networkimage" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonial;