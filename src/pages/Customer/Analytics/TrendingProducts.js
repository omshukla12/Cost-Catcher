import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { ArrowLeft } from "lucide-react";
import Avatar from "react-avatar";

export default function TrendingProducts() {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${process.env.REACT_APP_CC_API}/trendingProducts`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include JWT token in the headers
            },
          }
        );
        const data = await response.json();

        if (data.Status === "Successful") {
          setTrendingProducts(data.payload);
        } else {
          setError("Failed to fetch trending products.");
        }
      } catch (err) {
        console.error("Error fetching trending products:", err);
        setError("Error fetching trending products.");
      }
    };

    fetchTrendingProducts();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (trendingProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No trending products available.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/dashboard" className="mr-4">
                <ArrowLeft className="h-5 w-5 text-gray-200 hover:text-orange-500 focus:outline-none" />
              </Link>
              <h1 className="text-2xl font-bold">Favorites</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar name="User" size="32" round={true} color="#FF6B6B" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold">Trending Products</h1>
        </div>
      </header> */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingProducts.map((product) => (
            <li
              key={product._id}
              className="border rounded-lg shadow p-4 space-y-2 bg-white dark:bg-gray-800"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="h-32 w-full object-contain"
              />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {product.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Category: {product.category}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Deal Price: ₹{product.deal_price}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Original Price: ₹{product.original_price}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                Discount: {product.discount}%
              </p>
              <a
                href={product.product_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF6B6B] hover:underline"
              >
                View Product
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
