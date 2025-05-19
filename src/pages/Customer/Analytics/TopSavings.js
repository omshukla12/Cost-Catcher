import React, { useState } from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  Star,
  StarOff,
  ExternalLink,
  Calendar,
  DollarSign,
  ShoppingCart,
  Tag,
  Award,
  TrendingDown,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import clsx from "clsx";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data for top savings
const topSavingsData = [
  {
    id: 1,
    product: "LG C1 OLED TV",
    savings: 200,
    percentage: 13,
    image: "/placeholder.svg?height=80&width=80",
    store: "Amazon",
    category: "Electronics",
    purchaseDate: "July 15, 2023",
    originalPrice: 1499,
    purchasePrice: 1299,
    isFavorite: true,
  },
  {
    id: 2,
    product: "Dyson V11 Absolute",
    savings: 150,
    percentage: 21,
    image: "/placeholder.svg?height=80&width=80",
    store: "Dyson",
    category: "Home Appliances",
    purchaseDate: "June 20, 2023",
    originalPrice: 699,
    purchasePrice: 549,
    isFavorite: true,
  },
  {
    id: 3,
    product: "MacBook Air M1",
    savings: 100,
    percentage: 10,
    image: "/placeholder.svg?height=80&width=80",
    store: "Apple Store",
    category: "Computers",
    purchaseDate: "May 10, 2023",
    originalPrice: 999,
    purchasePrice: 899,
    isFavorite: true,
  },
  {
    id: 4,
    product: "Sony WH-1000XM4",
    savings: 70,
    percentage: 20,
    image: "/placeholder.svg?height=80&width=80",
    store: "Best Buy",
    category: "Audio",
    purchaseDate: "April 5, 2023",
    originalPrice: 349,
    purchasePrice: 279,
    isFavorite: false,
  },
  {
    id: 5,
    product: 'Samsung 55" QLED TV',
    savings: 200,
    percentage: 20,
    image: "/placeholder.svg?height=80&width=80",
    store: "Best Buy",
    category: "Electronics",
    purchaseDate: "March 15, 2023",
    originalPrice: 999,
    purchasePrice: 799,
    isFavorite: false,
  },
  {
    id: 6,
    product: "Nintendo Switch OLED",
    savings: 50,
    percentage: 14,
    image: "/placeholder.svg?height=80&width=80",
    store: "GameStop",
    category: "Gaming",
    purchaseDate: "February 20, 2023",
    originalPrice: 349,
    purchasePrice: 299,
    isFavorite: false,
  },
  {
    id: 7,
    product: 'iPad Pro 12.9"',
    savings: 150,
    percentage: 14,
    image: "/placeholder.svg?height=80&width=80",
    store: "Best Buy",
    category: "Tablets",
    purchaseDate: "January 10, 2023",
    originalPrice: 1099,
    purchasePrice: 949,
    isFavorite: true,
  },
  {
    id: 8,
    product: "Bose QuietComfort Earbuds",
    savings: 50,
    percentage: 17,
    image: "/placeholder.svg?height=80&width=80",
    store: "Bose",
    category: "Audio",
    purchaseDate: "December 15, 2022",
    originalPrice: 299,
    purchasePrice: 249,
    isFavorite: false,
  },
];

// Sample data for savings by category
const savingsByCategory = [
  { name: "Electronics", value: 400 },
  { name: "Home Appliances", value: 150 },
  { name: "Computers", value: 100 },
  { name: "Audio", value: 120 },
  { name: "Gaming", value: 50 },
  { name: "Tablets", value: 150 },
];

// Sample data for savings by store
const savingsByStore = [
  { name: "Amazon", value: 250 },
  { name: "Best Buy", value: 370 },
  { name: "Apple Store", value: 100 },
  { name: "Dyson", value: 150 },
  { name: "GameStop", value: 50 },
  { name: "Bose", value: 50 },
];

// Sample data for monthly savings
const monthlySavings = [
  { month: "Jan", savings: 150 },
  { month: "Feb", savings: 50 },
  { month: "Mar", savings: 200 },
  { month: "Apr", savings: 70 },
  { month: "May", savings: 100 },
  { month: "Jun", savings: 150 },
  { month: "Jul", savings: 200 },
];

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#556FB5",
  "#9D8DF1",
  "#FFB4B4",
  "#F8A978",
];

export default function TopSavings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("savings");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStore, setFilterStore] = useState("All");
  const [filterTimeframe, setFilterTimeframe] = useState("All Time");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Filter and sort savings
  const filteredSavings = topSavingsData
    .filter(
      (item) =>
        item.product.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterCategory === "All" || item.category === filterCategory) &&
        (filterStore === "All" || item.store === filterStore) &&
        (!showFavoritesOnly || item.isFavorite)
    )
    .sort((a, b) => {
      let comparison = 0;

      if (sortBy === "savings") {
        comparison = a.savings - b.savings;
      } else if (sortBy === "percentage") {
        comparison = a.percentage - b.percentage;
      } else if (sortBy === "date") {
        // Simple string comparison for demo purposes
        // In a real app, you'd parse the actual dates
        comparison = a.purchaseDate.localeCompare(b.purchaseDate);
      } else if (sortBy === "product") {
        comparison = a.product.localeCompare(b.product);
      }

      return sortOrder === "desc" ? -comparison : comparison;
    });

  const categories = [
    "All",
    "Electronics",
    "Home Appliances",
    "Computers",
    "Audio",
    "Gaming",
    "Tablets",
  ];
  const stores = [
    "All",
    "Amazon",
    "Best Buy",
    "Apple Store",
    "Dyson",
    "GameStop",
    "Bose",
  ];
  const timeframes = [
    "All Time",
    "This Month",
    "This Year",
    "Last 3 Months",
    "Last 6 Months",
  ];

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const toggleFavorite = (id) => {
    // In a real app, this would update the state or call an API
    console.log(`Toggle favorite for product ${id}`);
  };

  // Calculate total savings
  const totalSavings = topSavingsData.reduce(
    (sum, item) => sum + item.savings,
    0
  );
  const totalItems = topSavingsData.length;
  const avgSavingsPerItem =
    totalItems > 0 ? Math.round(totalSavings / totalItems) : 0;
  const avgSavingsPercentage =
    totalItems > 0
      ? Math.round(
          topSavingsData.reduce((sum, item) => sum + item.percentage, 0) /
            totalItems
        )
      : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Top Savings</h1>
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
              placeholder="Search savings..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
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

            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
              value={filterStore}
              onChange={(e) => setFilterStore(e.target.value)}
            >
              {stores.map((store) => (
                <option key={store} value={store}>
                  {store}
                </option>
              ))}
            </select>

            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
              value={filterTimeframe}
              onChange={(e) => setFilterTimeframe(e.target.value)}
            >
              {timeframes.map((timeframe) => (
                <option key={timeframe} value={timeframe}>
                  {timeframe}
                </option>
              ))}
            </select>

            <button
              className={clsx("px-4 py-2 border rounded-md flex items-center", {
                "border-[#FF6B6B] bg-[#FF6B6B]/10 text-[#FF6B6B]":
                  showFavoritesOnly,
                "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600":
                  !showFavoritesOnly,
              })}
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            >
              <Star className="h-4 w-4 mr-2" />
              Favorites
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/20 text-[#FF6B6B]">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Total Savings
                    </p>
                    <h3 className="text-2xl font-bold">₹{totalSavings}</h3>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-500">
                    <ShoppingCart className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Items Purchased
                    </p>
                    <h3 className="text-2xl font-bold">{totalItems}</h3>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20 text-green-500">
                    <Tag className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Avg. Savings
                    </p>
                    <h3 className="text-2xl font-bold">₹{avgSavingsPerItem}</h3>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-500">
                    <TrendingDown className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Avg. Discount
                    </p>
                    <h3 className="text-2xl font-bold">
                      {avgSavingsPercentage}%
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Savings List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  Your Top Savings ({filteredSavings.length})
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF6B6B] dark:hover:text-[#FF6B6B] flex items-center"
                    onClick={() => toggleSort("savings")}
                  >
                    Savings
                    <ArrowUpDown
                      className={clsx("h-4 w-4 ml-1", {
                        "text-[#FF6B6B]": sortBy === "savings",
                      })}
                    />
                  </button>
                  <button
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF6B6B] dark:hover:text-[#FF6B6B] flex items-center"
                    onClick={() => toggleSort("percentage")}
                  >
                    Percentage
                    <ArrowUpDown
                      className={clsx("h-4 w-4 ml-1", {
                        "text-[#FF6B6B]": sortBy === "percentage",
                      })}
                    />
                  </button>
                  <button
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF6B6B] dark:hover:text-[#FF6B6B] flex items-center"
                    onClick={() => toggleSort("date")}
                  >
                    Date
                    <ArrowUpDown
                      className={clsx("h-4 w-4 ml-1", {
                        "text-[#FF6B6B]": sortBy === "date",
                      })}
                    />
                  </button>
                </div>
              </div>

              {filteredSavings.length === 0 ? (
                <div className="p-8 text-center">
                  <DollarSign className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                    No savings found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredSavings.map((item, index) => (
                    <div
                      key={item.id}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 font-medium">
                          {index + 1}
                        </div>

                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.product}
                          className="w-16 h-16 rounded-md object-cover"
                        />

                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="font-medium">{item.product}</h3>
                            <button
                              className="ml-2 text-gray-400 hover:text-yellow-500"
                              onClick={() => toggleFavorite(item.id)}
                            >
                              {item.isFavorite ? (
                                <Star className="h-4 w-4 text-yellow-500" />
                              ) : (
                                <StarOff className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <span>{item.store}</span>
                            <span className="mx-2">•</span>
                            <span>{item.category}</span>
                            <span className="mx-2">•</span>
                            <span>{item.purchaseDate}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <span className="text-sm line-through text-gray-500">
                              ₹{item.originalPrice}
                            </span>
                            <span className="mx-2 text-sm font-bold">
                              ₹{item.purchasePrice}
                            </span>
                            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full flex items-center">
                              <TrendingDown className="h-3 w-3 mr-1" />
                              {item.percentage}% Off
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Saved
                          </div>
                          <div className="text-lg font-bold text-[#FF6B6B]">
                            ₹{item.savings}
                          </div>
                        </div>

                        <Link
                          to={`/product/${item.id}`}
                          className="p-2 rounded-md bg-[#FF6B6B] text-white hover:bg-[#FF5252]"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Monthly Savings Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold">Monthly Savings</h3>
              </div>
              <div className="p-4">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlySavings}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`₹${value}`, "Savings"]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          border: "none",
                          borderRadius: "4px",
                          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
                        }}
                      />
                      <Bar dataKey="savings" fill="#FF6B6B" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Savings by Category */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold">Savings by Category</h3>
              </div>
              <div className="p-4">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={savingsByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {savingsByCategory.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`₹${value}`, "Savings"]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          border: "none",
                          borderRadius: "4px",
                          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4">
                  <ul className="space-y-2">
                    {savingsByCategory.map((category, index) => (
                      <li
                        key={category.name}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <span
                            className="inline-block w-3 h-3 rounded-full mr-2"
                            style={{
                              backgroundColor: COLORS[index % COLORS.length],
                            }}
                          ></span>
                          <span className="text-sm">{category.name}</span>
                        </div>
                        <span className="text-sm font-medium">
                          ₹{category.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Savings by Store */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold">Savings by Store</h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {savingsByStore.map((store) => (
                    <div
                      key={store.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <ShoppingCart className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{store.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium text-[#FF6B6B]">
                          ₹{store.value}
                        </span>
                        <ChevronRight className="h-4 w-4 ml-1 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Savings Tips */}
            <div className="bg-gradient-to-r from-[#FF6B6B] to-[#FFB4B4] rounded-lg shadow text-white">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Award className="h-6 w-6 mr-2" />
                  <h3 className="text-lg font-semibold">Savings Tips</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#FF6B6B] font-medium text-xs mr-2 mt-0.5">
                      1
                    </span>
                    <p className="text-sm">
                      Set price alerts for high-value items to catch the best
                      deals
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#FF6B6B] font-medium text-xs mr-2 mt-0.5">
                      2
                    </span>
                    <p className="text-sm">
                      Compare prices across multiple stores before making a
                      purchase
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#FF6B6B] font-medium text-xs mr-2 mt-0.5">
                      3
                    </span>
                    <p className="text-sm">
                      Wait for seasonal sales for the biggest discounts on
                      electronics
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#FF6B6B] font-medium text-xs mr-2 mt-0.5">
                      4
                    </span>
                    <p className="text-sm">
                      Use coupon codes and cashback offers to maximize your
                      savings
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
