import React from 'react';
import banner from '../images/banner.jpg'

const PageBanner = ({ title }) => {
  return (
    <div 
      className="relative w-full h-64 bg-cover bg-center flex items-center "
      style={{ backgroundImage: `url(${banner})` }} >
      
      <div className="absolute inset-0 bg-opacity-100 bg-black/50"></div>

      <div className="relative z-10 container mx-auto px-6">
        <h2 className="text-white text-4xl font-bold tracking-wide">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default PageBanner;