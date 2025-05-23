import React, { useState, useEffect, useContext } from "react";
import {
  Bell,
  Search,
  Home,
  BarChart2,
  Heart,
  Settings,
  Menu,
  Plus,
  ArrowRight,
  Zap,
  DollarSign,
  ShoppingCart,
  X,
  Calendar,
  Clock,
  TrendingUp,
  Target,
  Gift,
  Tag,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Filter,
  RefreshCw,
  Award,
  Bookmark,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
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
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import Loading from "../../components/Loading";
import ProductCard from "../../components/ui/ProductCard";
import {
  getUserFromToken,
  fetchTrackingList,
} from "../../services/authService";

import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// Sample data for charts
const priceHistoryData = [
  { name: "Jan", price: 400 },
  { name: "Feb", price: 380 },
  { name: "Mar", price: 390 },
  { name: "Apr", price: 370 },
  { name: "May", price: 350 },
  { name: "Jun", price: 320 },
  { name: "Jul", price: 310 },
];

const savingsData = [
  { name: "Jan", savings: 50 },
  { name: "Feb", savings: 80 },
  { name: "Mar", savings: 120 },
  { name: "Apr", savings: 150 },
  { name: "May", savings: 200 },
  { name: "Jun", savings: 220 },
  { name: "Jul", savings: 280 },
];

const categoryData = [
  { name: "Electronics", value: 40 },
  { name: "Home", value: 25 },
  { name: "Fashion", value: 15 },
  { name: "Beauty", value: 10 },
  { name: "Other", value: 10 },
];

const COLORS = ["#FF6B6B", "#FFB4B4", "#4ECDC4", "#556FB5", "#9D8DF1"];

const recentAlerts = [
  {
    id: 1,
    product: "Sony WH-1000XM4",
    message: "Price dropped by 15%",
    time: "1 hour ago",
    type: "drop",
  },
  {
    id: 2,
    product: "MacBook Air M1",
    message: "Back in stock",
    time: "3 hours ago",
    type: "stock",
  },
  {
    id: 3,
    product: "PlayStation 5",
    message: "Price increased by 5%",
    time: "1 day ago",
    type: "increase",
  },
  {
    id: 4,
    product: "Nintendo Switch OLED",
    message: "Price dropped by 10%",
    time: "2 days ago",
    type: "drop",
  },
  {
    id: 5,
    product: 'iPad Pro 12.9"',
    message: "Price match found",
    time: "3 days ago",
    type: "match",
  },
];

const topSavings = [
  {
    id: 1,
    product: "LG C1 OLED TV",
    savings: 150,
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 2,
    product: "Dyson V11 Absolute",
    savings: 100,
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 3,
    product: "iPhone 13 Pro",
    savings: 80,
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 4,
    product: "Samsung Galaxy S22",
    savings: 75,
    image: "/placeholder.svg?height=50&width=50",
  },
];

const stats = [
  { label: "Total Savings", value: "₹15,000", icon: DollarSign },
  { label: "Active Tracks", value: "42", icon: Zap },
  { label: "Avg. Discount", value: "18.5%", icon: BarChart2 },
  { label: "Purchases", value: "7", icon: ShoppingCart },
];

const trendingProducts = [
  {
    id: 1,
    name: "Sony WH-1000XM4",
    price: 279,
    oldPrice: 349,
    image: "/placeholder.svg?height=80&width=80",
    store: "Amazon",
    discount: 20,
  },
  {
    id: 2,
    name: "Apple Watch Series 7",
    price: 399,
    oldPrice: 429,
    image: "/placeholder.svg?height=80&width=80",
    store: "Apple Store",
    discount: 7,
  },
  {
    id: 3,
    name: 'Samsung 55" QLED TV',
    price: 799,
    oldPrice: 999,
    image: "/placeholder.svg?height=80&width=80",
    store: "Best Buy",
    discount: 20,
  },
];

const upcomingDeals = [
  {
    id: 1,
    name: "Amazon Prime Day",
    date: "July 12-13",
    description: "Annual sales event with deep discounts",
  },
  {
    id: 2,
    name: "Black Friday",
    date: "November 26",
    description: "Biggest shopping day of the year",
  },
  {
    id: 3,
    name: "Cyber Monday",
    date: "November 29",
    description: "Online-focused deals after Black Friday",
  },
];

const recommendations = [
  {
    id: 1,
    name: "Kindle Paperwhite",
    price: 139,
    image: "/placeholder.svg?height=60&width=60",
    reason: "Based on your interest in electronics",
  },
  {
    id: 2,
    name: "Instant Pot Duo",
    price: 99,
    image: "/placeholder.svg?height=60&width=60",
    reason: "Popular in your area",
  },
  {
    id: 3,
    name: "Fitbit Charge 5",
    price: 149,
    image: "/placeholder.svg?height=60&width=60",
    reason: "Similar to items you track",
  },
];

const userGoals = [
  {
    id: 1,
    name: "Save ₹20,000 this year",
    progress: 75,
    target: "₹20,000",
    current: "₹15,000",
  },
  {
    id: 2,
    name: "Track 50 products",
    progress: 84,
    target: "50",
    current: "42",
  },
  {
    id: 3,
    name: "Complete profile",
    progress: 60,
    target: "100%",
    current: "60%",
  },
];

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  const [trackingItems, setTrackingItems] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Activity section
  const [activityData, setActivityData] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [errorActivity, setErrorActivity] = useState(null);

  // Fetching user activity data
  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${process.env.REACT_APP_CC_API}/activity`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include JWT token in the headers
            },
          }
        );
        const data = await response.json();

        if (data.status === "Success") {
          setActivityData(data.payload);
        } else {
          setErrorActivity("Failed to fetch activity data.");
        }
      } catch (error) {
        console.error("Error fetching activity data:", error);
        setErrorActivity("Error fetching activity data.");
      } finally {
        setLoadingActivity(false);
      }
    };

    fetchActivityData();
  }, []);

  useEffect(() => {
    const user = getUserFromToken();

    if (!user) {
      navigate("/signin");
    } else {
      setUser(user);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchTrackingList = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming JWT token is stored in localStorage

        const response = await fetch(
          `${process.env.REACT_APP_CC_API}/trackinglist`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include JWT token in the headers
            },
          }
        );

        const result = await response.json();

        if (response.ok) {
          setTrackingItems(result.trackinglist); // Assuming the tracklist is returned
        } else {
          setError(result.message || "Failed to fetch tracking list.");
        }
      } catch (err) {
        console.error("Error fetching tracking list:", err);
        setError("Error fetching tracking list.");
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchTrackingList();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 md:hidden">
          <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h1 className="text-xl font-bold text-orange-500">CostCatcher</h1>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              >
                <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            <div className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center px-4 py-2 text-sm rounded-md bg-gray-100 dark:bg-gray-700"
                  >
                    <Home className="mr-3 h-4 w-4" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/analytics"
                    className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <BarChart2 className="mr-3 h-4 w-4" />
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link
                    to="/favorites"
                    className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Heart className="mr-3 h-4 w-4" />
                    Favorites
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </Link>
                </li>
              </ul>
              {/* <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="bg-gradient-to-r from-orange-500 to-[#FFB4B4] rounded-lg p-4 text-white">
                  <h3 className="font-medium mb-2">Upgrade to Pro</h3>
                  <p className="text-sm mb-3 text-white/90">
                    Get more features and save even more!
                  </p>
                  <button className="w-full px-3 py-1.5 bg-white text-orange-500 rounded-md text-sm hover:bg-gray-100 focus:outline-none">
                    Learn More
                  </button>
                </div>
              </div> */}
            </nav>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar - Desktop Only */}
        <aside className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen sticky top-0 overflow-y-auto">
          <div className="p-6">
            <nav className="space-y-1">
              <Link
                to="/dashboard"
                className="flex items-center px-4 py-2.5 text-sm rounded-md bg-gray-100 dark:bg-gray-700"
              >
                <Home className="mr-3 h-4 w-4" />
                Dashboard
              </Link>
              <Link
                to="/analysis"
                className="flex items-center px-4 py-2.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <BarChart2 className="mr-3 h-4 w-4" />
                Analytics
              </Link>
              <Link
                to="/favorites"
                className="flex items-center px-4 py-2.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Heart className="mr-3 h-4 w-4" />
                Favorites
              </Link>
              <Link
                to="/account"
                className="flex items-center px-4 py-2.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Settings className="mr-3 h-4 w-4" />
                Settings
              </Link>
            </nav>

            <div className="mt-8 pb-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Insights
              </h3>
              <nav className="mt-2 space-y-1">
                <Link
                  to="/trends"
                  className="flex items-center px-4 py-2.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <TrendingUp className="mr-3 h-4 w-4" />
                  Price Trends
                </Link>
                <Link
                  to="/deals"
                  className="flex items-center px-4 py-2.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Tag className="mr-3 h-4 w-4" />
                  Best Deals
                </Link>
                <Link
                  to="/alerts"
                  className="flex items-center px-4 py-2.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <AlertTriangle className="mr-3 h-4 w-4" />
                  Price Alerts
                </Link>
              </nav>
            </div>

            {/* <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-gradient-to-r from-orange-500 to-[#FFB4B4] rounded-lg p-4 text-white">
                <h3 className="font-medium mb-2">Upgrade to Pro</h3>
                <p className="text-sm mb-3 text-white/90">
                  Get more features and save even more!
                </p>
                <Link to="/pricing">
                  <button className="w-full px-3 py-1.5 bg-white text-orange-500 rounded-md text-sm hover:bg-gray-100 focus:outline-none flex items-center justify-center">
                    Upgrade Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div> */}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  Welcome back, {user.name}!
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Here's what's happening with your tracked products ...
                </p>
              </div>
              <div className="flex space-x-2 mt-4 md:mt-0">
                <Link to="/addProduct">
                  <button className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                  </button>
                </Link>
                <Link to="/allproducts">
                  <button className="px-4 py-2 text-sm bg-orange-500 text-white rounded-md hover:bg-[#FF5252] focus:outline-none">
                    View All Products
                  </button>
                </Link>
              </div>
            </div>

            {/* Dashboard Tabs */}
            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={clsx(
                    "pb-4 text-sm font-medium border-b-2 transition-colors duration-200",
                    {
                      "border-orange-500 text-orange-500":
                        activeTab === "overview",
                      "border-transparent hover:border-gray-300 dark:hover:border-gray-600":
                        activeTab !== "overview",
                    }
                  )}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("analytics")}
                  className={clsx(
                    "pb-4 text-sm font-medium border-b-2 transition-colors duration-200",
                    {
                      "border-orange-500 text-orange-500":
                        activeTab === "analytics",
                      "border-transparent hover:border-gray-300 dark:hover:border-gray-600":
                        activeTab !== "analytics",
                    }
                  )}
                >
                  Insights
                </button>
                <button
                  onClick={() => setActiveTab("activity")}
                  className={clsx(
                    "pb-4 text-sm font-medium border-b-2 transition-colors duration-200",
                    {
                      "border-orange-500 text-orange-500":
                        activeTab === "activity",
                      "border-transparent hover:border-gray-300 dark:hover:border-gray-600":
                        activeTab !== "activity",
                    }
                  )}
                >
                  Activity
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex flex-col items-center justify-center">
                    <stat.icon className="h-8 w-8 text-orange-500 mb-2" />
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                  </div>
                </div>
              ))}
            </div>

            {activeTab === "overview" && (
              <div className="grid md:grid-cols-3 gap-6">
                {/* Main Content Area */}
                <div className="md:col-span-2 space-y-6">
                  {/* Price History Chart */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Price History</h3>
                      <div className="flex items-center space-x-2">
                        <select className="text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 px-2 py-1">
                          <option>Last 7 days</option>
                          <option>Last 30 days</option>
                          <option>Last 90 days</option>
                        </select>
                        <button className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                          <RefreshCw className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={priceHistoryData}>
                            <defs>
                              <linearGradient
                                id="colorPrice"
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
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area
                              type="monotone"
                              dataKey="price"
                              stroke="#FF6B6B"
                              fillOpacity={1}
                              fill="url(#colorPrice)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* Trending Products */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <h3 className="text-lg font-semibold">
                        Trending Products
                      </h3>
                      <Link to="/trendingProducts">
                        <button className="text-sm text-orange-500 hover:underline flex items-center">
                          View All <ChevronRight className="h-4 w-4" />
                        </button>
                      </Link>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        {trendingProducts.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recent Alerts */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Recent Alerts</h3>
                      <Link to="/recentalerts">
                        <button className="text-sm text-orange-500 hover:underline flex items-center">
                          View All <ChevronRight className="h-4 w-4" />
                        </button>
                      </Link>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-4">
                        {recentAlerts.map((alert) => (
                          <li
                            key={alert.id}
                            className="flex items-start space-x-4"
                          >
                            <Bell
                              className={clsx("h-5 w-5 mt-1", {
                                "text-green-500": alert.type === "drop",
                                "text-red-500": alert.type === "increase",
                                "text-blue-500": alert.type === "stock",
                                "text-purple-500": alert.type === "match",
                              })}
                            />
                            <div>
                              <p className="font-medium">{alert.product}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {alert.message}
                              </p>
                              <p className="text-xs text-gray-500">
                                {alert.time}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                {/* <div className="space-y-6"> */}
                <div className="flex flex-col gap-6">
                  {/* Search - Mobile Only */}
                  <div className="md:hidden bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  {/* User Goals */}
                  {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700  flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Your Goals</h3>
                      <Link
                        to="/goals"
                        className="text-sm text-orange-500 hover:underline flex items-center"
                      >
                        View Details <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-4">
                        {userGoals.map((goal) => (
                          <li key={goal.id} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <p className="font-medium text-sm">{goal.name}</p>
                              <span className="text-xs text-gray-500">
                                {goal.current} / {goal.target}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-orange-500 h-2 rounded-full"
                                style={{ width: `${goal.progress}%` }}
                              ></div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div> */}

                  {/* Top Savings */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700  flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Top Savings</h3>
                      <Link
                        to="/topsavings"
                        className="text-sm text-orange-500 hover:underline flex items-center"
                      >
                        View Details <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-4">
                        {topSavings.map((item, index) => (
                          <li
                            key={item.id}
                            className="flex items-center space-x-4"
                          >
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.product}
                              className="w-12 h-12 rounded-md object-cover"
                            />
                            <div className="flex-1">
                              <p className="font-medium">{item.product}</p>
                              <p className="text-sm text-orange-500">
                                Saved ₹{item.savings}
                              </p>
                            </div>
                            <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded">
                              #{index + 1}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Upcoming Deals */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Upcoming Deals</h3>
                      <Link
                        to="/deals"
                        className="text-sm text-orange-500 hover:underline flex items-center"
                      >
                        View Details <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-4">
                        {upcomingDeals.map((deal) => (
                          <li
                            key={deal.id}
                            className="flex items-start space-x-4"
                          >
                            <Calendar className="h-5 w-5 text-orange-500 mt-1" />
                            <div>
                              <p className="font-medium">{deal.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {deal.date}
                              </p>
                              <p className="text-xs text-gray-500">
                                {deal.description}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 md:col-span-1">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold">
                        Recommended For You
                      </h3>
                      <Link
                        to="/recommended"
                        className="text-sm text-orange-500 hover:underline flex items-center"
                      >
                        View Details <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        {recommendations.map((item) => (
                          <div
                            key={item.id}
                            className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4"
                          >
                            <div className="flex items-center space-x-3 mb-2">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-12 h-12 rounded-md object-cover"
                              />
                              <div>
                                <h4 className="font-medium text-sm">
                                  {item.name}
                                </h4>
                                <p className="text-orange-500 text-sm">
                                  ₹{item.price}
                                </p>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {item.reason}
                            </p>
                            <button className="mt-2 w-full px-3 py-1.5 text-xs bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-1000">
                              Track Price
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Savings Over Time */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold">
                        Savings Over Time
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={savingsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="savings" fill="#FF6B6B" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* Tracking by Category */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold">
                        Tracking by Category
                      </h3>
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
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <div className="space-y-6">
                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold">Recent Activity</h3>
                  </div>
                  <div className="p-4">
                    {loadingActivity ? (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Loading activity...
                      </p>
                    ) : errorActivity ? (
                      <p className="text-sm text-red-500">{errorActivity}</p>
                    ) : activityData.length > 0 ? (
                      <ul className="space-y-4">
                        {activityData
                          .slice(-5)
                          .reverse()
                          .map((activity) => (
                            <li
                              key={activity._id}
                              className="flex items-start space-x-4"
                            >
                              <Clock className="h-5 w-5 text-gray-500 mt-1" />
                              <div>
                                <p className="font-medium">
                                  {activity.activity}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {new Date(
                                    activity.timestamp
                                  ).toLocaleString()}
                                </p>
                              </div>
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No recent activity found.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

/*
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { jwtDecode } from "jwt-decode";

// SVGs
import edit from "../../components/assets/edit.svg";
import trash from "../../components/assets/trash.svg";

const Home = () => {
  const [user, setUser] = useState(null);
  const [trackingItems, setTrackingItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // For loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
    } else {
      const decoded = jwtDecode(token); // Decode token and get the user's name
      setUser(decoded); // Now, user will contain both name and email
    }
  }, [navigate]);

  useEffect(() => {
    const fetchTrackingList = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming JWT token is stored in localStorage

        const response = await fetch(
          `${process.env.REACT_APP_CC_API}/trackinglist`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include JWT token in the headers
            },
          }
        );

        const result = await response.json();

        if (response.ok) {
          setTrackingItems(result.trackinglist); // Assuming the tracklist is returned
        } else {
          setError(result.message || "Failed to fetch tracking list.");
        }
      } catch (err) {
        console.error("Error fetching tracking list:", err);
        setError("Error fetching tracking list.");
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchTrackingList();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loading />
      </div>
    );
  }

  return (
    <div className="font-inter">
      {user ? (
        <div className="flex flex-col items-center gap-4 py-12 bg-foreground">
          <h1 className="text-3xl">
            Hello <b>{user.name}</b>, welcome to your dashboard!
          </h1>
          <div>
            <p>Your current Tracking List</p>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex flex-col items-center text-center p-4 border border-gray-500 h-auto w-auto rounded">
            {trackingItems.length > 0 ? (
              <ul className="space-y-4">
                {trackingItems.map((item, index) => (
                  <li key={index} className="border p-4 rounded-md shadow">
                    <div>
                      <h2 className="text-lg">
                        Product Title: {item.productTitle}
                      </h2>
                      <h2 className="text-lg">
                        Product Link: {item.productLink}
                      </h2>
                      <h3 className="font-semibold">
                        Current Price: ₹{item.currentPrice}
                      </h3>
                      <h4 className="font-semibold">
                        Target Price: ₹{item.hitPrice}
                      </h4>
                    </div>
                    <hr />
                    <div className="flex justify-between mt-2">
                      <button className="flex items-center bg-black hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded">
                        <img
                          src={edit}
                          alt="Edit"
                          className="w-5 h-5 mr-2 filter-white"
                        />
                        <a href="/edit">Edit Target Price</a>
                      </button>
                      <button className="flex items-center bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-4 rounded">
                        <img
                          src={trash}
                          alt="Delete"
                          className="w-5 h-5 mr-2 filter-white"
                        />
                        <a href="/delete">Delete This Product</a>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-gray-500">
                <h2 className="text-xl font-semibold mt-4">Wow, such empty</h2>
              </div>
            )}
          </div>
          <div className="flex mt-6">
            <p className="p-2">Want to track another product?</p>
            <a
              href="/addProduct"
              className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Track a new Product
            </a>
          </div>
        </div>
      ) : (
        <p>
          <Loading />
        </p>
      )}
    </div>
  );
};

export default Home;
*/
