import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  X,
  Tag,
  Home,
  Plus,
  Clock,
  Search,
  Settings,
  Calendar,
  BarChart2,
  RefreshCw,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  AlertCircle,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import {
  Bar,
  Pie,
  Cell,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  PieChart,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import clsx from "clsx";

import Loading from "../../components/Loading";

import {
  getUserFromToken,
  fetchTrackingList,
  fetchActivityData,
  fetchUpcomingSales,
  fetchTrendingProducts,
} from "../../services/authService";

import { getStartDate, getEndDate } from "../../utils/productUtils";

// Sample data for charts ...
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

export default function Dashboard() {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const [trackingItems, setTrackingItems] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSavings: 0,
    avgDiscount: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Activity section
  const [activityData, setActivityData] = useState([]);
  const [errorActivity, setErrorActivity] = useState(null);
  const [loadingActivity, setLoadingActivity] = useState(true);

  // Upcomimg sales
  const [salesData, setSalesData] = useState([]);
  const [errorSales, setErrorSales] = useState(null);
  const [loadingSales, setLoadingSales] = useState(true);

  // Trending products
  const [errorTrending, setErrorTrending] = useState(null);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [trendingProducts, setTrendingProducts] = useState([]);

  // Fetching user activity data ...
  useEffect(() => {
    const getActivity = async () => {
      try {
        const data = await fetchActivityData();
        setActivityData(data);
      } catch (err) {
        setErrorActivity(err.message || "Failed to fetch activity data.");
      } finally {
        setLoadingActivity(false);
      }
    };

    getActivity();
  }, []);

  // Checking user auth status ...
  useEffect(() => {
    const user = getUserFromToken();

    if (!user) {
      navigate("/signin");
    } else {
      setUser(user);
    }
  }, [navigate]);

  // Fetching tracking list data and compute stats ...
  useEffect(() => {
    const getTrackingList = async () => {
      try {
        const list = await fetchTrackingList();

        // Calculate stats ...
        const totalProducts = list.length;
        const totalSavings = list.reduce((sum, item) => {
          const saving = item.currentPrice - item.hitPrice;
          return sum + (saving > 0 ? saving : 0);
        }, 0);
        const avgDiscount =
          totalProducts > 0
            ? Math.round(
                (totalSavings /
                  list.reduce((sum, item) => sum + item.currentPrice, 0)) *
                  100
              )
            : 0;

        // Sorted list by savings ...
        const sortedList = list.sort(
          (a, b) => b.currentPrice - b.hitPrice - (a.currentPrice - a.hitPrice)
        );

        setTrackingItems(sortedList);
        setStats({ totalProducts, totalSavings, avgDiscount });
      } catch (err) {
        setError(err.message || "Failed to fetch tracking list.");
      } finally {
        setLoading(false);
      }
    };

    getTrackingList();
  }, []);

  // Fetching upcoming sales data ...
  useEffect(() => {
    const getUpcomingSales = async () => {
      try {
        const sales = await fetchUpcomingSales();

        const filteredSales = sales
          .filter((sale) => {
            const endDate = getEndDate(sale.duration);
            const today = new Date();

            today.setHours(0, 0, 0, 0);
            return endDate >= today;
          })
          .sort((a, b) => {
            return getStartDate(a.duration) - getStartDate(b.duration);
          });

        setSalesData(filteredSales);
      } catch (err) {
        setErrorSales(err.message || "Failed to fetch upcoming sales.");
      } finally {
        setLoadingSales(false);
      }
    };

    getUpcomingSales();
  }, []);

  // Fetching trending products ...
  useEffect(() => {
    const fetchTrending = async () => {
      setLoadingTrending(true);
      try {
        const trending = await fetchTrendingProducts();
        setTrendingProducts(trending);
        setErrorTrending(null);
      } catch (err) {
        console.error("Error fetching trending products:", err);
        setErrorTrending("Failed to fetch trending products.");
      } finally {
        setLoadingTrending(false);
      }
    };

    fetchTrending();
  }, []);

  // Calculated stats ...
  const { totalProducts, totalSavings, avgDiscount } = stats;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-md w-full">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-center mb-2">Error</h2>
          <p className="text-center text-gray-600 dark:text-gray-400">
            Oops! Something went wrong.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 w-full bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-medium py-2 px-4 rounded-md"
          >
            Retry
          </button>
        </div>
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
                    Home
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
                <li></li>
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
            </nav>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar - Desktop Only */}
        <aside className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen sticky top-0 overflow-y-auto">
          <div className="p-6">
            <h3 className="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Navigation
            </h3>
            <nav className="mt-2 space-y-1 pb-4 border-b border-gray-200 dark:border-gray-700">
              <Link
                to="/dashboard"
                className="flex items-center px-4 py-2.5 text-sm rounded-md bg-gray-100 dark:bg-gray-700"
              >
                <Home className="mr-3 h-4 w-4" />
                Home
              </Link>
              <Link
                to="/analysis"
                className="flex items-center px-4 py-2.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <BarChart2 className="mr-3 h-4 w-4" />
                Analytics
              </Link>
              <Link
                to="/account"
                className="flex items-center px-4 py-2.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Settings className="mr-3 h-4 w-4" />
                Settings
              </Link>
            </nav>

            <div className="mt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/20 text-orange-500">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Potential Savings
                    </p>
                    <h3 className="text-2xl font-bold">
                      ₹{totalSavings.toLocaleString()}
                    </h3>
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
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-500">
                    <ShoppingBag className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Products Tracked
                    </p>
                    <h3 className="text-2xl font-bold">{totalProducts}</h3>
                  </div>
                </div>
              </div>
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
                      <ul className="space-y-[1.35rem]">
                        {trendingProducts.slice(0, 5).map((product, index) => (
                          <li
                            key={product._id}
                            className="flex items-center space-x-4"
                          >
                            <div className="flex-1">
                              <p className="font-medium">
                                {product.name.split("|")[0].trim()}
                              </p>
                              <p className="text-sm text-orange-500">
                                Deal Price ₹{product.deal_price}
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
                        to="/allproducts"
                        className="text-sm text-orange-500 hover:underline flex items-center"
                      >
                        View Details <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-[1.35rem]">
                        {trackingItems.slice(0, 5).map((item, index) => (
                          <li
                            key={item._id}
                            className="flex items-center space-x-4"
                          >
                            <div className="flex-1">
                              <p className="font-medium">
                                {item.productTitle.split("|")[0].trim()}
                              </p>
                              <p className="text-sm text-orange-500">
                                Saved ₹
                                {Math.max(item.currentPrice - item.hitPrice, 0)}
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
                        View All <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                    <div className="p-4">
                      {loadingSales ? (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Loading deals...
                        </div>
                      ) : errorSales ? (
                        <div className="text-sm text-red-500">{errorSales}</div>
                      ) : salesData.length > 0 ? (
                        <ul className="space-y-4">
                          {salesData.slice(0, 5).map((deal) => (
                            <li
                              key={deal._id || deal.id}
                              className="flex items-start space-x-4"
                            >
                              <Calendar className="h-5 w-5 text-orange-500 mt-1" />
                              <div>
                                <p className="font-medium">
                                  {deal.title || deal.name}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {deal.duration || deal.date}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {deal.description}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          No upcoming deals found.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Recommendations */}
                  {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 md:col-span-1">
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
                  </div> */}
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
