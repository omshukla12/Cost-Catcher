import React, { useState } from "react";
import {
  Calendar,
  Download,
  Filter,
  ChevronDown,
  BarChart2,
  PieChartIcon,
  LineChartIcon,
  TrendingDown,
  ArrowLeft,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Tag,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import clsx from "clsx";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data for charts
const monthlyData = [
  { name: "Jan", savings: 1200, tracked: 25 },
  { name: "Feb", savings: 1900, tracked: 28 },
  { name: "Mar", savings: 2400, tracked: 30 },
  { name: "Apr", savings: 1800, tracked: 32 },
  { name: "May", savings: 2800, tracked: 35 },
  { name: "Jun", savings: 3600, tracked: 38 },
  { name: "Jul", savings: 3200, tracked: 42 },
];

const categoryData = [
  { name: "Electronics", value: 40, savings: 6500 },
  { name: "Home", value: 25, savings: 3800 },
  { name: "Fashion", value: 15, savings: 2200 },
  { name: "Beauty", value: 10, savings: 1500 },
  { name: "Other", value: 10, savings: 1000 },
];

const storeData = [
  { name: "Amazon", value: 45, savings: 7200 },
  { name: "Best Buy", value: 20, savings: 3100 },
  { name: "Walmart", value: 15, savings: 2400 },
  { name: "Target", value: 10, savings: 1600 },
  { name: "Other", value: 10, savings: 1700 },
];

const priceHistoryData = [
  { date: "2023-01", avg: 100 },
  { date: "2023-02", avg: 98 },
  { date: "2023-03", avg: 96 },
  { date: "2023-04", avg: 94 },
  { date: "2023-05", avg: 90 },
  { date: "2023-06", avg: 88 },
  { date: "2023-07", avg: 85 },
];

const topSavingsProducts = [
  {
    id: 1,
    name: "LG C1 OLED TV",
    savings: 200,
    percentage: 13,
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 2,
    name: "Dyson V11 Absolute",
    savings: 150,
    percentage: 21,
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 3,
    name: "MacBook Air M1",
    savings: 100,
    percentage: 10,
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 4,
    name: "Sony WH-1000XM4",
    savings: 70,
    percentage: 20,
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 5,
    name: 'Samsung 55" QLED TV',
    savings: 200,
    percentage: 20,
    image: "/placeholder.svg?height=50&width=50",
  },
];

const COLORS = ["#FF6B6B", "#4ECDC4", "#556FB5", "#9D8DF1", "#FFB4B4"];

export default function Analysis() {
  const [timeRange, setTimeRange] = useState("6 months");
  const [chartType, setChartType] = useState("savings");

  const totalSavings = 15000;
  const totalTracked = 42;
  const avgDiscount = 18.5;
  const purchasesMade = 7;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/dashboard" className="mr-4">
                <ArrowLeft className="h-5 w-5 text-gray-200 hover:text-orange-500 focus:outline-none" />
              </Link>
              <h1 className="text-2xl font-bold">Analytics</h1>
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
          <div>
            <h2 className="text-xl font-semibold">Your Savings Overview</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Track your savings and product price trends
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {timeRange}
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>

            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>

            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/20 text-[#FF6B6B]">
                <DollarSign className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Savings
                </p>
                <h3 className="text-2xl font-bold">
                  ₹{totalSavings.toLocaleString()}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-500">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Products Tracked
                </p>
                <h3 className="text-2xl font-bold">{totalTracked}</h3>
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
                  Avg. Discount
                </p>
                <h3 className="text-2xl font-bold">{avgDiscount}%</h3>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-500">
                <Clock className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Purchases Made
                </p>
                <h3 className="text-2xl font-bold">{purchasesMade}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 mb-6">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Savings Over Time</h3>
            <div className="flex items-center space-x-2">
              <button
                className={clsx("px-3 py-1.5 rounded-md text-sm", {
                  "bg-[#FF6B6B] text-white": chartType === "savings",
                  "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600":
                    chartType !== "savings",
                })}
                onClick={() => setChartType("savings")}
              >
                <BarChart2 className="h-4 w-4 inline-block mr-1" />
                Savings
              </button>
              <button
                className={clsx("px-3 py-1.5 rounded-md text-sm", {
                  "bg-[#FF6B6B] text-white": chartType === "tracked",
                  "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600":
                    chartType !== "tracked",
                })}
                onClick={() => setChartType("tracked")}
              >
                <LineChartIcon className="h-4 w-4 inline-block mr-1" />
                Products Tracked
              </button>
              <button
                className={clsx("px-3 py-1.5 rounded-md text-sm", {
                  "bg-[#FF6B6B] text-white": chartType === "price",
                  "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600":
                    chartType !== "price",
                })}
                onClick={() => setChartType("price")}
              >
                <TrendingDown className="h-4 w-4 inline-block mr-1" />
                Price Trends
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "savings" ? (
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
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
                    <Legend />
                    <Bar dataKey="savings" fill="#FF6B6B" name="Savings (₹)" />
                  </BarChart>
                ) : chartType === "tracked" ? (
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [value, "Products Tracked"]}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        border: "none",
                        borderRadius: "4px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="tracked"
                      stroke="#556FB5"
                      strokeWidth={2}
                      name="Products Tracked"
                    />
                  </LineChart>
                ) : (
                  <AreaChart data={priceHistoryData}>
                    <defs>
                      <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#4ECDC4"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#4ECDC4"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Average Price"]}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        border: "none",
                        borderRadius: "4px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="avg"
                      stroke="#4ECDC4"
                      fillOpacity={1}
                      fill="url(#colorAvg)"
                      name="Average Price (% of original)"
                    />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Category Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold">Savings by Category</h3>
            </div>
            <div className="p-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
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
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name, props) => {
                        const item = categoryData.find(
                          (item) => item.value === value
                        );
                        return [`₹${item.savings}`, name];
                      }}
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
            </div>
          </div>

          {/* Store Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold">Savings by Store</h3>
            </div>
            <div className="p-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={storeData}
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
                      {storeData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name, props) => {
                        const item = storeData.find(
                          (item) => item.value === value
                        );
                        return [`₹${item.savings}`, name];
                      }}
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
            </div>
          </div>
        </div>

        {/* Top Savings Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold">Top Savings Products</h3>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Savings
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Discount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {topSavingsProducts.map((product, index) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-750"
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="h-10 w-10 rounded-md object-cover"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium">
                              {product.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-[#FF6B6B]">
                          ₹{product.savings}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm">{product.percentage}%</div>
                          <TrendingDown className="h-4 w-4 text-green-500 ml-1" />
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <Link
                          to={`/product/${product.id}`}
                          className="text-[#FF6B6B] hover:underline"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
