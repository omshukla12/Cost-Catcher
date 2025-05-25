import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { ArrowLeft } from "lucide-react";
import Loading from "../../../components/Loading";
import { AuthContext } from "../../../context/AuthContext";

export default function TrendingProducts() {
  const { token } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_CC_API}/trendingProducts`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
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
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loading />
      </div>
    );
  }

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4">
              <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-orange-500 focus:outline-none" />
            </Link>
            <h1 className="text-2xl font-bold">Trending Products</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingProducts.map((product) => (
            <li
              key={product._id}
              className="flex flex-col border dark:border-gray-700 rounded-lg shadow p-4 bg-white dark:bg-gray-800 h-full transition hover:shadow-lg"
            >
              <div className="flex justify-center items-center h-40 mb-3 bg-gray-50 dark:bg-gray-900 rounded">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="max-h-36 max-w-full object-contain"
                  style={{ minHeight: "80px" }}
                />
              </div>
              <div className="flex-1 flex flex-col">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 mb-1">
                  {product.name}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-1">
                  Category: {product.category}
                </p>
                <div className="flex flex-col gap-1 mb-2">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Deal Price:</span> ₹
                    {product.deal_price}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                    Original: ₹{product.original_price}
                  </span>
                  <span className="text-sm text-green-600 dark:text-green-400 font-semibold">
                    Discount: {product.discount}%
                  </span>
                </div>
                <div className="mt-auto pt-2">
                  <a
                    href={product.product_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-orange-500 hover:underline font-medium text-sm"
                  >
                    View Product
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
