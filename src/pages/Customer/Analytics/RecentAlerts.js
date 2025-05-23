import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Tag,
  Bell,
  Search,
  ArrowLeft,
  TrendingUp,
  ArrowUpDown,
  ShoppingCart,
  ExternalLink,
  TrendingDown,
  AlertTriangle,
} from "lucide-react";
import clsx from "clsx";

// Sample data for recent alerts
const recentAlerts = [
  {
    id: 1,
    product: "Sony WH-1000XM4",
    message: "Price dropped by 15%",
    time: "1 hour ago",
    type: "price_drop",
    image: "/placeholder.svg?height=80&width=80",
    store: "Amazon",
    oldPrice: 349,
    newPrice: 279,
    link: "/product/1",
    read: false,
  },
  {
    id: 2,
    product: "MacBook Air M1",
    message: "Back in stock",
    time: "3 hours ago",
    type: "back_in_stock",
    image: "/placeholder.svg?height=80&width=80",
    store: "Apple Store",
    oldPrice: 999,
    newPrice: 999,
    link: "/product/2",
    read: false,
  },
  {
    id: 3,
    product: "PlayStation 5",
    message: "Price increased by 5%",
    time: "1 day ago",
    type: "price_increase",
    image: "/placeholder.svg?height=80&width=80",
    store: "Best Buy",
    oldPrice: 499,
    newPrice: 524,
    link: "/product/3",
    read: true,
  },
  {
    id: 4,
    product: "Nintendo Switch OLED",
    message: "Price dropped by 10%",
    time: "2 days ago",
    type: "price_drop",
    image: "/placeholder.svg?height=80&width=80",
    store: "GameStop",
    oldPrice: 349,
    newPrice: 314,
    link: "/product/4",
    read: true,
  },
  {
    id: 5,
    product: 'iPad Pro 12.9"',
    message: "Price match found",
    time: "3 days ago",
    type: "price_match",
    image: "/placeholder.svg?height=80&width=80",
    store: "Best Buy",
    oldPrice: 1099,
    newPrice: 1099,
    link: "/product/5",
    read: true,
  },
  {
    id: 6,
    product: "Samsung Galaxy S22",
    message: "Price alert triggered",
    time: "4 days ago",
    type: "alert_triggered",
    image: "/placeholder.svg?height=80&width=80",
    store: "Samsung",
    oldPrice: 849,
    newPrice: 799,
    link: "/product/6",
    read: true,
  },
  {
    id: 7,
    product: "Dyson V11 Absolute",
    message: "Price dropped by 14%",
    time: "5 days ago",
    type: "price_drop",
    image: "/placeholder.svg?height=80&width=80",
    store: "Dyson",
    oldPrice: 699,
    newPrice: 599,
    link: "/product/7",
    read: true,
  },
  {
    id: 8,
    product: "LG C1 OLED TV",
    message: "Price dropped by 13%",
    time: "1 week ago",
    type: "price_drop",
    image: "/placeholder.svg?height=80&width=80",
    store: "Amazon",
    oldPrice: 1499,
    newPrice: 1299,
    link: "/product/8",
    read: true,
  },
  {
    id: 9,
    product: "Bose QuietComfort Earbuds",
    message: "Price dropped by 7%",
    time: "1 week ago",
    type: "price_drop",
    image: "/placeholder.svg?height=80&width=80",
    store: "Bose",
    oldPrice: 299,
    newPrice: 279,
    link: "/product/9",
    read: true,
  },
  {
    id: 10,
    product: "Apple Watch Series 7",
    message: "Price dropped by 7%",
    time: "1 week ago",
    type: "price_drop",
    image: "/placeholder.svg?height=80&width=80",
    store: "Apple Store",
    oldPrice: 429,
    newPrice: 399,
    link: "/product/10",
    read: true,
  },
];

export default function RecentAlerts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterTimeframe, setFilterTimeframe] = useState("All");
  const [filterRead, setFilterRead] = useState("All");
  const [sortBy, setSortBy] = useState("time");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedAlerts, setSelectedAlerts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const alertsPerPage = 5;

  // Filter and sort alerts
  const filteredAlerts = recentAlerts
    .filter(
      (alert) =>
        alert.product.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterType === "All" || alert.type === filterType) &&
        (filterTimeframe === "All" ||
          getTimeframeFilter(alert.time, filterTimeframe)) &&
        (filterRead === "All" ||
          (filterRead === "Read" && alert.read) ||
          (filterRead === "Unread" && !alert.read))
    )
    .sort((a, b) => {
      let comparison = 0;

      if (sortBy === "time") {
        // Simple string comparison for demo purposes
        // In a real app, you'd parse the actual dates
        comparison = a.time.localeCompare(b.time);
      } else if (sortBy === "product") {
        comparison = a.product.localeCompare(b.product);
      } else if (sortBy === "type") {
        comparison = a.type.localeCompare(b.type);
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

  // Helper function to filter by timeframe
  const getTimeframeFilter = (timeString, filterValue) => {
    switch (filterValue) {
      case "Today":
        return timeString.includes("hour") || timeString === "Just now";
      case "This Week":
        return (
          timeString.includes("hour") ||
          timeString.includes("day") ||
          timeString === "Just now"
        );
      case "This Month":
        return !timeString.includes("month") || timeString.includes("1 month");
      default:
        return true;
    }
  };

  // Pagination
  const indexOfLastAlert = currentPage * alertsPerPage;
  const indexOfFirstAlert = indexOfLastAlert - alertsPerPage;
  const currentAlerts = filteredAlerts.slice(
    indexOfFirstAlert,
    indexOfLastAlert
  );
  const totalPages = Math.ceil(filteredAlerts.length / alertsPerPage);

  const alertTypes = [
    "All",
    "price_drop",
    "price_increase",
    "back_in_stock",
    "price_match",
    "alert_triggered",
  ];
  const timeframes = ["All", "Today", "This Week", "This Month"];
  const readStatus = ["All", "Read", "Unread"];

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const toggleAlertSelection = (alertId) => {
    if (selectedAlerts.includes(alertId)) {
      setSelectedAlerts(selectedAlerts.filter((id) => id !== alertId));
    } else {
      setSelectedAlerts([...selectedAlerts, alertId]);
    }
  };

  const selectAllAlerts = () => {
    if (selectedAlerts.length === currentAlerts.length) {
      setSelectedAlerts([]);
    } else {
      setSelectedAlerts(currentAlerts.map((alert) => alert.id));
    }
  };

  const getAlertTypeIcon = (type) => {
    switch (type) {
      case "price_drop":
        return <TrendingDown className="h-5 w-5 text-green-500" />;
      case "price_increase":
        return <TrendingUp className="h-5 w-5 text-red-500" />;
      case "back_in_stock":
        return <ShoppingCart className="h-5 w-5 text-blue-500" />;
      case "price_match":
        return <Tag className="h-5 w-5 text-purple-500" />;
      case "alert_triggered":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAlertTypeLabel = (type) => {
    switch (type) {
      case "price_drop":
        return "Price Drop";
      case "price_increase":
        return "Price Increase";
      case "back_in_stock":
        return "Back in Stock";
      case "price_match":
        return "Price Match";
      case "alert_triggered":
        return "Alert Triggered";
      default:
        return type;
    }
  };

  const markAsRead = (ids) => {
    // In a real app, this would update the state or call an API
    console.log(`Mark alerts as read: ${ids.join(", ")}`);
  };

  const markAllAsRead = () => {
    // In a real app, this would update the state or call an API
    console.log("Mark all alerts as read");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4">
              <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-orange-500 focus:outline-none" />
            </Link>
            <h1 className="text-2xl font-bold">Recent Alerts</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search alerts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              {alertTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "All" ? "All Types" : getAlertTypeLabel(type)}
                </option>
              ))}
            </select>

            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={filterTimeframe}
              onChange={(e) => setFilterTimeframe(e.target.value)}
            >
              {timeframes.map((timeframe) => (
                <option key={timeframe} value={timeframe}>
                  {timeframe === "All" ? "All Time" : timeframe}
                </option>
              ))}
            </select>

            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={filterRead}
              onChange={(e) => setFilterRead(e.target.value)}
            >
              {readStatus.map((status) => (
                <option key={status} value={status}>
                  {status === "All" ? "All Status" : status}
                </option>
              ))}
            </select>

            <button
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm"
              onClick={markAllAsRead}
            >
              Mark All as Read
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                checked={
                  selectedAlerts.length === currentAlerts.length &&
                  currentAlerts.length > 0
                }
                onChange={selectAllAlerts}
              />
              <h2 className="text-lg font-semibold ml-3">
                Your Alerts ({filteredAlerts.length})
              </h2>
            </div>

            <div className="flex items-center space-x-2">
              <button
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 flex items-center"
                onClick={() => toggleSort("time")}
              >
                Time
                <ArrowUpDown
                  className={clsx("h-4 w-4 ml-1", {
                    "text-orange-500": sortBy === "time",
                  })}
                />
              </button>
              <button
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 flex items-center"
                onClick={() => toggleSort("product")}
              >
                Product
                <ArrowUpDown
                  className={clsx("h-4 w-4 ml-1", {
                    "text-orange-500": sortBy === "product",
                  })}
                />
              </button>
              <button
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 flex items-center"
                onClick={() => toggleSort("type")}
              >
                Type
                <ArrowUpDown
                  className={clsx("h-4 w-4 ml-1", {
                    "text-orange-500": sortBy === "type",
                  })}
                />
              </button>
            </div>
          </div>

          {selectedAlerts.length > 0 && (
            <div className="bg-gray-100 dark:bg-gray-900 p-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <span className="text-sm">
                {selectedAlerts.length} alerts selected
              </span>
              <div className="flex space-x-2">
                <button
                  className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
                  onClick={() => markAsRead(selectedAlerts)}
                >
                  Mark as Read
                </button>
                <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md">
                  Delete
                </button>
              </div>
            </div>
          )}

          {filteredAlerts.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                No alerts found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={clsx(
                    "p-4 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-150",
                    {
                      "bg-gray-100 dark:bg-gray-900": !alert.read,
                    }
                  )}
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                      checked={selectedAlerts.includes(alert.id)}
                      onChange={() => toggleAlertSelection(alert.id)}
                    />

                    {getAlertTypeIcon(alert.type)}

                    <img
                      src={alert.image || "/placeholder.svg"}
                      alt={alert.product}
                      className="w-12 h-12 rounded-md object-cover"
                    />

                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3
                          className={clsx("font-medium", {
                            "font-semibold": !alert.read,
                          })}
                        >
                          {alert.product}
                        </h3>
                        {!alert.read && (
                          <span className="ml-2 px-2 py-0.5 text-xs bg-orange-500 text-white rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {alert.message}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>{alert.store}</span>
                        <span className="mx-2">•</span>
                        <span>{alert.time}</span>
                        <span className="mx-2">•</span>
                        <span>{getAlertTypeLabel(alert.type)}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {alert.type === "price_drop" && (
                        <div className="text-right">
                          <div className="text-sm line-through text-gray-500">
                            ₹{alert.oldPrice}
                          </div>
                          <div className="text-sm font-bold text-green-500">
                            ₹{alert.newPrice}
                          </div>
                        </div>
                      )}
                      {alert.type === "price_increase" && (
                        <div className="text-right">
                          <div className="text-sm line-through text-gray-500">
                            ₹{alert.oldPrice}
                          </div>
                          <div className="text-sm font-bold text-red-500">
                            ₹{alert.newPrice}
                          </div>
                        </div>
                      )}
                      <Link
                        to={alert.link}
                        className="p-2 rounded-md bg-orange-500 text-white hover:bg-[#FF5252]"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredAlerts.length > 0 && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {indexOfFirstAlert + 1} to{" "}
                {Math.min(indexOfLastAlert, filteredAlerts.length)} of{" "}
                {filteredAlerts.length} alerts
              </div>
              <div className="flex space-x-1">
                <button
                  className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      className={clsx("px-3 py-1 rounded-md", {
                        "bg-orange-500 text-white": currentPage === page,
                        "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600":
                          currentPage !== page,
                      })}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
