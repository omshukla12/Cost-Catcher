import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { ArrowLeft, Calendar } from "lucide-react";

import Loading from "../../../components/Loading";
import { AuthContext } from "../../../context/AuthContext";

export default function BestDeals() {
  const { token } = useContext(AuthContext);

  const [sales, setSales] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [salesSortBy, setSalesSortBy] = useState("duration");
  const [salesStoreFilter, setSalesStoreFilter] = useState("All");

  useEffect(() => {
    const fetchUpcomingSales = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_CC_API}/upcomingSales`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();

        if (response.ok) {
          setSales(result.payload);
        } else {
          setError(result.message || "Failed to fetch upcoming sales.");
        }
      } catch (err) {
        console.error("Error fetching upcoming sales:", err);
        setError("Error fetching upcoming sales.");
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingSales();
  }, []);

  // Parsing starting dates ...
  const getStartDate = (duration) => {
    if (!duration) return new Date(0);

    const firstRange = duration.split(";")[0].trim();
    const match = firstRange.match(/([A-Za-z]+)\s*(\d{1,2})/);
    const yearMatch = firstRange.match(/(\d{4})/);

    if (match && yearMatch) {
      return new Date(`${match[1]} ${match[2]}, ${yearMatch[1]}`);
    }
    return new Date(0);
  };

  // Parsing ending dates ...
  const getEndDate = (duration) => {
    if (!duration) return new Date(0);

    const firstRange = duration.split(";")[0].trim();
    const rangeMatch = firstRange.match(
      /([A-Za-z]+)\s*(\d{1,2})-(\d{1,2}),\s*(\d{4})/
    );

    if (rangeMatch) {
      return new Date(`${rangeMatch[1]} ${rangeMatch[3]}, ${rangeMatch[4]}`);
    }
    return getStartDate(duration);
  };

  // Filter and sort sales ...
  const filteredSales = sales
    .filter((sale) => {
      if (salesStoreFilter !== "All" && sale.store !== salesStoreFilter)
        return false;

      const endDate = getEndDate(sale.duration);
      const today = new Date();

      today.setHours(0, 0, 0, 0);
      return endDate >= today;
    })
    .sort((a, b) => {
      if (salesSortBy === "duration")
        return getStartDate(a.duration) - getStartDate(b.duration);
      return 0;
    });

  const salesStores = [
    "All",
    ...Array.from(new Set(sales.map((s) => s.store))),
  ];

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Loading />
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
            <h1 className="text-2xl font-bold">Upcoming Sales</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Sales Filter and Sort Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <div>
            <label className="mr-2 font-medium">Store:</label>
            <select
              value={salesStoreFilter}
              onChange={(e) => setSalesStoreFilter(e.target.value)}
              className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
            >
              {salesStores.map((store) => (
                <option key={store} value={store}>
                  {store}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mr-2 font-medium">Sort by:</label>
            <select
              value={salesSortBy}
              onChange={(e) => setSalesSortBy(e.target.value)}
              className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
            >
              <option value="duration">Start Date</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSales.map((sale) => (
            <div
              key={sale._id}
              className="relative bg-gradient-to-br from-orange-50 to-white dark:from-gray-900 dark:to-gray-800 border border-orange-100 dark:border-gray-700 rounded-xl shadow-lg p-6 flex flex-col transition-transform hover:scale-[1.025] hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300">
                  {sale.store}
                </span>
                <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 capitalize">
                  {sale.status}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
                {sale.title}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-orange-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {sale.duration}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 min-h-[48px]">
                {sale.description}
              </p>
            </div>
          ))}
        </div>
        {filteredSales.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-12">
            No upcoming sales found.
          </div>
        )}
      </main>
    </div>
  );
}
