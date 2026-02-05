import React from 'react';
import logo from '../images/res-logo.png'

const Footer = () => {
  return (
    <footer className="bg-red-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP SECTION: 4 COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img src={logo} alt="logoimage" />
              </div>
              <span className="font-bold text-xl text-gray-900">Fresh Bites</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Welcome to Fresh Bites, your ultimate destination for delicious and fresh online food ordering!
            </p>
          </div>

          
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-4">Delivery Time</h3>
            <div className="space-y-2 text-gray-600">
              <p className="font-medium text-gray-800">Monday - Friday</p>
              <p className="text-sm mb-3">10:00am - 11:00pm</p>
              
              <p className="font-medium text-gray-800">Saturday - Sunday</p>
              <p className="text-sm">Full Day</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-4">Contact</h3>
            <div className="space-y-3 text-gray-600 text-sm">
              <p>Location: Kalol, Ahmedabad</p>
              <p className="font-bold text-gray-800">Phone: 8511755852</p>
              <p className="font-bold text-gray-800">Email: alenvarughese2004@gmail.com</p>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-4">Newsletter</h3>
            <p className="text-gray-600 text-sm mb-4">Subscribe our newsletter</p>
            <div className="flex bg-white border border-gray-300 rounded overflow-hidden">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 w-full outline-none text-gray-700 text-sm"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 flex items-center justify-center">
                {/* Send Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Copyright & Socials */}
        <div className="border-t border-red-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-red-500 text-xs md:text-sm text-center md:text-left">
            Copyright - 2024, website made by Alen Varughese. All Rights Reserved.
          </p>
          
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm mr-2">Follow:</span>
            {/* Social Icons (Red Circles) */}
            <SocialIcon>
              {/* Facebook (F) */}
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </SocialIcon>
            <SocialIcon>
              {/* GitHub */}
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
            </SocialIcon>
            <SocialIcon>
              {/* YouTube */}
              <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.33 29 29 0 00-.46-5.33zM9.75 15.02l5.75-3.27-5.75-3.27v6.54z" />
            </SocialIcon>
            <SocialIcon>
               {/* LinkedIn */}
               <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
               <circle cx="4" cy="4" r="2" />
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper component for the social icons to keep code clean
const SocialIcon = ({ children }) => (
  <a href="#" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      {children}
    </svg>
  </a>
);

export default Footer;