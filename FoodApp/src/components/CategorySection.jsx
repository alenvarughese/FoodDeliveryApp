import React, { useState, useEffect } from 'react';

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const predefinedIcons = {
    "Fastfood": (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
        <path d="M2 13h20v2H2v-2zm1.05-2h17.9a6.002 6.002 0 0 0-17.9 0zM5 17h14c.55 0 1 .45 1 1s-.45 1-1 1H5c-.55 0-1-.45-1-1s.45-1 1-1z" />
      </svg>
    ),
    "Pizza": (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.25.23 2.44.64 3.54l6.92-11.9C10.03 2.65 10.99 2 12 2zm1.65 1.54L6.73 15.46c-1.37.77-2.18 2.21-2.18 3.79 0 .41.34.75.75.75h14.5a.75.75 0 0 0 .75-.75c0-4.63-3.14-8.54-6.9-9.71zM14.5 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
      </svg>
    ),
    "Asian Food": (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
        <path d="M12 3a9 9 0 0 0-9 9h18a9 9 0 0 0-9-9zm0-2a11.01 11.01 0 0 1 11 11h1a1 1 0 0 1 0 2H1a1 1 0 0 1 0-2h1A11.01 11.01 0 0 1 12 1zm0 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
      </svg>
    ),
    "Cold Drink": (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
        <path d="M6 7v10.33C6 19.53 7.8 21.4 10.05 21.4h3.9c2.25 0 4.05-1.87 4.05-4.07V7H6zm10.5-2V3.5L18 2l-1.5-1-1.5 1.5V5H9v2h7.5zM9.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
      </svg>
    ),
    "default": (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
        <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
      </svg>
    )
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/api/categories");
      const result = response.data;
      if (result.success) {
        setCategories(result.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

        {categories.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 bg-red-50 p-6 rounded-lg cursor-pointer transition-transform duration-300 hover:-translate-y-4 hover:shadow-xl"
          >
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center p-3 shadow-md">
              {predefinedIcons[item.name] || predefinedIcons["default"]}
            </div>

            <h6 className="font-semibold text-lg text-gray-800">
              {item.name}
            </h6>
          </div>
        ))}

      </div>
    </section>
  );
};

export default CategorySection;