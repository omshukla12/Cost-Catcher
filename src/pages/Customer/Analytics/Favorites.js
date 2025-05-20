import React, { useState } from "react";
import {
  Heart,
  Search,
  Filter,
  ArrowUpDown,
  ArrowLeft,
  StarOff,
  Bell,
  Eye,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import clsx from "clsx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data for favorite products
const favoriteProducts = [
  {
    id: 1,
    name: "Sony WH-1000XM4",
    price: 279,
    oldPrice: 349,
    lowestPrice: 269,
    image: "/placeholder.svg?height=80&width=80",
    store: "Amazon",
    discount: 20,
    priceHistory: [
      { date: "Jun 1", price: 349 },
      { date: "Jun 15", price: 329 },
      { date: "Jul 1", price: 299 },
      { date: "Jul 15", price: 279 },
    ],
    alert: "15% drop",
    dateAdded: "2 months ago",
    category: "Electronics",
    inStock: true,
  },
  {
    id: 2,
    name: "Apple Watch Series 7",
    price: 399,
    oldPrice: 429,
    lowestPrice: 379,
    image: "/placeholder.svg?height=80&width=80",
    store: "Apple Store",
    discount: 7,
    priceHistory: [
      { date: "Jun 1", price: 429 },
      { date: "Jun 15", price: 429 },
      { date: "Jul 1", price: 399 },
      { date: "Jul 15", price: 399 },
    ],
    alert: "7% drop",
    dateAdded: "1 month ago",
    category: "Wearables",
    inStock: true,
  },
  {
    id: 3,
    name: 'Samsung 55" QLED TV',
    price: 799,
    oldPrice: 999,
    lowestPrice: 799,
    image: "/placeholder.svg?height=80&width=80",
    store: "Best Buy",
    discount: 20,
    priceHistory: [
      { date: "Jun 1", price: 999 },
      { date: "Jun 15", price: 899 },
      { date: "Jul 1", price: 849 },
      { date: "Jul 15", price: 799 },
    ],
    alert: "20% drop",
    dateAdded: "3 weeks ago",
    category: "Electronics",
    inStock: true,
  },
  {
    id: 4,
    name: "Dyson V11 Absolute",
    price: 599,
    oldPrice: 699,
    lowestPrice: 549,
    image: "/placeholder.svg?height=80&width=80",
    store: "Dyson",
    discount: 14,
    priceHistory: [
      { date: "Jun 1", price: 699 },
      { date: "Jun 15", price: 649 },
      { date: "Jul 1", price: 599 },
      { date: "Jul 15", price: 599 },
    ],
    alert: "14% drop",
    dateAdded: "1 month ago",
    category: "Home Appliances",
    inStock: true,
  },
  {
    id: 5,
    name: "MacBook Air M1",
    price: 899,
    oldPrice: 999,
    lowestPrice: 849,
    image: "/placeholder.svg?height=80&width=80",
    store: "Amazon",
    discount: 10,
    priceHistory: [
      { date: "Jun 1", price: 999 },
      { date: "Jun 15", price: 949 },
      { date: "Jul 1", price: 899 },
      { date: "Jul 15", price: 899 },
    ],
    alert: "10% drop",
    dateAdded: "2 weeks ago",
    category: "Computers",
    inStock: true,
  },
];

export default function Favorites() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterCategory, setFilterCategory] = useState("All");

  // Filter and sort products
  const filteredProducts = favoriteProducts
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterCategory === "All" || product.category === filterCategory)
    )
    .sort((a, b) => {
      let comparison = 0;

      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === "price") {
        comparison = a.price - b.price;
      } else if (sortBy === "discount") {
        comparison = a.discount - b.discount;
      } else if (sortBy === "date") {
        // This is simplified - in a real app you'd parse the dates properly
        comparison = a.dateAdded.localeCompare(b.dateAdded);
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

  const categories = [
    "All",
    "Electronics",
    "Wearables",
    "Computers",
    "Home Appliances",
  ];

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search favorites..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              Your Favorite Products ({filteredProducts.length})
            </h2>
            <div className="flex items-center space-x-2">
              <button
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF6B6B] dark:hover:text-[#FF6B6B] flex items-center"
                onClick={() => toggleSort("name")}
              >
                Name
                <ArrowUpDown
                  className={clsx("h-4 w-4 ml-1", {
                    "text-[#FF6B6B]": sortBy === "name",
                  })}
                />
              </button>
              <button
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF6B6B] dark:hover:text-[#FF6B6B] flex items-center"
                onClick={() => toggleSort("price")}
              >
                Price
                <ArrowUpDown
                  className={clsx("h-4 w-4 ml-1", {
                    "text-[#FF6B6B]": sortBy === "price",
                  })}
                />
              </button>
              <button
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF6B6B] dark:hover:text-[#FF6B6B] flex items-center"
                onClick={() => toggleSort("discount")}
              >
                Discount
                <ArrowUpDown
                  className={clsx("h-4 w-4 ml-1", {
                    "text-[#FF6B6B]": sortBy === "discount",
                  })}
                />
              </button>
              <button
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF6B6B] dark:hover:text-[#FF6B6B] flex items-center"
                onClick={() => toggleSort("date")}
              >
                Date Added
                <ArrowUpDown
                  className={clsx("h-4 w-4 ml-1", {
                    "text-[#FF6B6B]": sortBy === "date",
                  })}
                />
              </button>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="p-8 text-center">
              <Heart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                No favorites found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Link
                to="/products"
                className="inline-flex items-center px-4 py-2 bg-[#FF6B6B] text-white rounded-md hover:bg-[#FF5252]"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center space-x-4 flex-1">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span>{product.store}</span>
                          <span className="mx-2">•</span>
                          <span>{product.category}</span>
                          <span className="mx-2">•</span>
                          <span>Added {product.dateAdded}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <span className="text-lg font-bold text-[#FF6B6B]">
                            ₹{product.price}
                          </span>
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ₹{product.oldPrice}
                          </span>
                          <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded">
                            -{product.discount}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-64 h-16">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={product.priceHistory}>
                          <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#FF6B6B"
                            strokeWidth={2}
                            dot={false}
                          />
                          <XAxis dataKey="date" hide={true} />
                          <YAxis
                            hide={true}
                            domain={["dataMin - 20", "dataMax + 20"]}
                          />
                          <Tooltip
                            formatter={(value) => [`₹${value}`, "Price"]}
                            labelFormatter={(label) => label}
                            contentStyle={{
                              backgroundColor: "rgba(255, 255, 255, 0.9)",
                              border: "none",
                              borderRadius: "4px",
                              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
                            }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-[#FF6B6B]">
                        <Bell className="h-5 w-5" />
                      </button>
                      <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-[#FF6B6B]">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-red-500">
                        <StarOff className="h-5 w-5" />
                      </button>
                      <Link
                        to={`/product/${product.id}`}
                        className="p-2 rounded-md bg-[#FF6B6B] text-white hover:bg-[#FF5252]"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
