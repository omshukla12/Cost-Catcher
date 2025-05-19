import React, { useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  ChevronDown,
  TrendingDown,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  Info,
} from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import clsx from "clsx";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Sample data for price trends
const priceHistoryData = [
  { month: "Jan", electronics: 100, home: 100, fashion: 100, beauty: 100 },
  { month: "Feb", electronics: 98, home: 97, fashion: 99, beauty: 101 },
  { month: "Mar", electronics: 95, home: 96, fashion: 98, beauty: 102 },
  { month: "Apr", electronics: 92, home: 94, fashion: 97, beauty: 103 },
  { month: "May", electronics: 90, home: 93, fashion: 96, beauty: 104 },
  { month: "Jun", electronics: 88, home: 91, fashion: 95, beauty: 105 },
  { month: "Jul", electronics: 85, home: 90, fashion: 94, beauty: 106 },
];

const seasonalTrendsData = [
  { month: "Jan", index: 95 },
  { month: "Feb", index: 93 },
  { month: "Mar", index: 92 },
  { month: "Apr", index: 94 },
  { month: "May", index: 96 },
  { month: "Jun", index: 98 },
  { month: "Jul", index: 100 },
  { month: "Aug", index: 102 },
  { month: "Sep", index: 97 },
  { month: "Oct", index: 94 },
  { month: "Nov", index: 90 },
  { month: "Dec", index: 88 },
];

const productTrendsData = [
  {
    id: 1,
    name: "Smartphones",
    currentTrend: "down",
    priceChange: -8.5,
    bestTimeToBuy: "November (Black Friday)",
    worstTimeToBuy: "September (New releases)",
    forecast: "Expected to drop further in Q4",
    data: [
      { month: "Jan", price: 100 },
      { month: "Feb", price: 99 },
      { month: "Mar", price: 98 },
      { month: "Apr", price: 97 },
      { month: "May", price: 96 },
      { month: "Jun", price: 94 },
      { month: "Jul", price: 92 },
    ],
  },
  {
    id: 2,
    name: "Laptops",
    currentTrend: "down",
    priceChange: -5.2,
    bestTimeToBuy: "August (Back to School)",
    worstTimeToBuy: "May-June",
    forecast: "Prices stabilizing in Q3",
    data: [
      { month: "Jan", price: 100 },
      { month: "Feb", price: 99 },
      { month: "Mar", price: 98 },
      { month: "Apr", price: 97 },
      { month: "May", price: 96 },
      { month: "Jun", price: 95 },
      { month: "Jul", price: 95 },
    ],
  },
  {
    id: 3,
    name: "TVs",
    currentTrend: "down",
    priceChange: -12.3,
    bestTimeToBuy: "January-February (Post-holiday)",
    worstTimeToBuy: "October-November (Pre-holiday)",
    forecast: "Significant drops expected for older models",
    data: [
      { month: "Jan", price: 100 },
      { month: "Feb", price: 97 },
      { month: "Mar", price: 95 },
      { month: "Apr", price: 92 },
      { month: "May", price: 90 },
      { month: "Jun", price: 88 },
      { month: "Jul", price: 88 },
    ],
  },
  {
    id: 4,
    name: "Home Appliances",
    currentTrend: "down",
    priceChange: -3.8,
    bestTimeToBuy: "September-October",
    worstTimeToBuy: "December",
    forecast: "Modest price reductions expected",
    data: [
      { month: "Jan", price: 100 },
      { month: "Feb", price: 99 },
      { month: "Mar", price: 98 },
      { month: "Apr", price: 97 },
      { month: "May", price: 97 },
      { month: "Jun", price: 96 },
      { month: "Jul", price: 96 },
    ],
  },
  {
    id: 5,
    name: "Fashion",
    currentTrend: "down",
    priceChange: -6.1,
    bestTimeToBuy: "End of season sales",
    worstTimeToBuy: "Start of new season",
    forecast: "Seasonal discounts expected",
    data: [
      { month: "Jan", price: 100 },
      { month: "Feb", price: 99 },
      { month: "Mar", price: 98 },
      { month: "Apr", price: 97 },
      { month: "May", price: 96 },
      { month: "Jun", price: 95 },
      { month: "Jul", price: 94 },
    ],
  },
  {
    id: 6,
    name: "Beauty Products",
    currentTrend: "up",
    priceChange: 6.0,
    bestTimeToBuy: "Holiday sales events",
    worstTimeToBuy: "Spring season",
    forecast: "Prices expected to continue rising",
    data: [
      { month: "Jan", price: 100 },
      { month: "Feb", price: 101 },
      { month: "Mar", price: 102 },
      { month: "Apr", price: 103 },
      { month: "May", price: 104 },
      { month: "Jun", price: 105 },
      { month: "Jul", price: 106 },
    ],
  },
];

export default function Trends() {
  const [timeRange, setTimeRange] = useState("6 months");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Price Trends</h1>
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
            <h2 className="text-xl font-semibold">Market Price Trends</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Track price movements across different product categories
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
              {selectedCategory}
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>

        {/* Main Price Trends Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 mb-6">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold">Price Index by Category</h3>
              <button className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <Info className="h-4 w-4" />
              </button>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Base: January = 100
            </div>
          </div>
          <div className="p-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceHistoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[80, 110]} />
                  <Tooltip
                    formatter={(value) => [`${value}`, "Price Index"]}
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
                    dataKey="electronics"
                    stroke="#FF6B6B"
                    strokeWidth={2}
                    name="Electronics"
                  />
                  <Line
                    type="monotone"
                    dataKey="home"
                    stroke="#4ECDC4"
                    strokeWidth={2}
                    name="Home Appliances"
                  />
                  <Line
                    type="monotone"
                    dataKey="fashion"
                    stroke="#556FB5"
                    strokeWidth={2}
                    name="Fashion"
                  />
                  <Line
                    type="monotone"
                    dataKey="beauty"
                    stroke="#9D8DF1"
                    strokeWidth={2}
                    name="Beauty"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              <p>
                <span className="inline-block w-3 h-3 bg-[#FF6B6B] rounded-full mr-1"></span>
                Electronics:{" "}
                <span className="font-medium text-red-500">-15%</span> since
                January
              </p>
              <p>
                <span className="inline-block w-3 h-3 bg-[#4ECDC4] rounded-full mr-1"></span>
                Home Appliances:{" "}
                <span className="font-medium text-red-500">-10%</span> since
                January
              </p>
              <p>
                <span className="inline-block w-3 h-3 bg-[#556FB5] rounded-full mr-1"></span>
                Fashion: <span className="font-medium text-red-500">-6%</span>{" "}
                since January
              </p>
              <p>
                <span className="inline-block w-3 h-3 bg-[#9D8DF1] rounded-full mr-1"></span>
                Beauty: <span className="font-medium text-green-500">+6%</span>{" "}
                since January
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Seasonal Trends */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold">Seasonal Price Trends</h3>
            </div>
            <div className="p-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={seasonalTrendsData}>
                    <defs>
                      <linearGradient
                        id="colorIndex"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#FF6B6B"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#FF6B6B"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[85, 105]} />
                    <Tooltip
                      formatter={(value) => [`${value}`, "Price Index"]}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        border: "none",
                        borderRadius: "4px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="index"
                      stroke="#FF6B6B"
                      fillOpacity={1}
                      fill="url(#colorIndex)"
                      name="Overall Price Index"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm">
                <p className="font-medium">Key Insights:</p>
                <ul className="list-disc pl-5 mt-1 text-gray-600 dark:text-gray-400 space-y-1">
                  <li>
                    Lowest prices typically in November-December (holiday sales)
                  </li>
                  <li>Highest prices in July-August (summer peak)</li>
                  <li>
                    Good buying opportunities in January (post-holiday
                    clearance)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Price Forecast */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold">
                Price Forecast (Next 3 Months)
              </h3>
            </div>
            <div className="p-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { category: "Electronics", forecast: -5 },
                      { category: "Home", forecast: -3 },
                      { category: "Fashion", forecast: -2 },
                      { category: "Beauty", forecast: 4 },
                      { category: "Toys", forecast: -8 },
                      { category: "Sports", forecast: -1 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis domain={[-10, 10]} />
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Expected Change"]}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        border: "none",
                        borderRadius: "4px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
                      }}
                    />
                    <Bar dataKey="forecast" name="Expected Price Change">
                      {[
                        { category: "Electronics", forecast: -5 },
                        { category: "Home", forecast: -3 },
                        { category: "Fashion", forecast: -2 },
                        { category: "Beauty", forecast: 4 },
                        { category: "Toys", forecast: -8 },
                        { category: "Sports", forecast: -1 },
                      ].map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.forecast < 0 ? "#4ECDC4" : "#FF6B6B"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-[#4ECDC4] rounded-full mr-1"></span>
                    <span className="text-gray-600 dark:text-gray-400">
                      Price Decrease
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-[#FF6B6B] rounded-full mr-1"></span>
                    <span className="text-gray-600 dark:text-gray-400">
                      Price Increase
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Category Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 mb-6">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold">Product Category Trends</h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {productTrendsData.map((category) => (
              <div
                key={category.id}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="font-medium">{category.name}</h4>
                      {category.currentTrend === "down" ? (
                        <TrendingDown className="h-4 w-4 text-green-500 ml-2" />
                      ) : (
                        <TrendingUp className="h-4 w-4 text-red-500 ml-2" />
                      )}
                      <span
                        className={clsx("ml-2 text-sm font-medium", {
                          "text-green-500": category.priceChange < 0,
                          "text-red-500": category.priceChange > 0,
                        })}
                      >
                        {category.priceChange > 0 ? "+" : ""}
                        {category.priceChange}%
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Best Time to Buy
                        </p>
                        <p className="text-sm">{category.bestTimeToBuy}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Worst Time to Buy
                        </p>
                        <p className="text-sm">{category.worstTimeToBuy}</p>
                      </div>
                    </div>

                    <div className="mt-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Forecast
                      </p>
                      <p className="text-sm">{category.forecast}</p>
                    </div>
                  </div>

                  <div className="w-full md:w-64 h-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={category.data}>
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke={
                            category.currentTrend === "down"
                              ? "#4ECDC4"
                              : "#FF6B6B"
                          }
                          strokeWidth={2}
                          dot={false}
                        />
                        <XAxis dataKey="month" hide={true} />
                        <YAxis
                          hide={true}
                          domain={["dataMin - 5", "dataMax + 5"]}
                        />
                        <Tooltip
                          formatter={(value) => [`${value}`, "Price Index"]}
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
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buying Recommendations */}
        <div className="bg-gradient-to-r from-[#FF6B6B] to-[#FFB4B4] rounded-lg shadow text-white p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Smart Buying Recommendations
              </h3>
              <p className="text-white/90 mb-4">
                Based on current trends, now is a good time to buy Electronics
                and Home Appliances. Consider waiting on Beauty products as
                prices are trending upward.
              </p>
              <Link
                to="/best-deals"
                className="inline-flex items-center px-4 py-2 bg-white text-[#FF6B6B] rounded-md hover:bg-gray-100 focus:outline-none"
              >
                View Best Deals
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="mt-4 md:mt-0">
              <TrendingDown className="h-16 w-16 md:h-24 md:w-24" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
