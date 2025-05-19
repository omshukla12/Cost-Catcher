import React, { useState } from "react";
import {
  Bell,
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  ExternalLink,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Settings,
  Calendar,
  Clock,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import clsx from "clsx";

// Sample data for price alerts
const priceAlerts = [
  {
    id: 1,
    product: "Sony WH-1000XM4",
    image: "/placeholder.svg?height=80&width=80",
    store: "Amazon",
    currentPrice: 279,
    oldPrice: 349,
    targetPrice: 250,
    status: "active",
    type: "price_drop",
    lastUpdated: "1 hour ago",
    createdAt: "2 weeks ago",
    notification: "email",
    category: "Electronics",
  },
  {
    id: 2,
    product: "MacBook Air M1",
    image: "/placeholder.svg?height=80&width=80",
    store: "Apple Store",
    currentPrice: 899,
    oldPrice: 999,
    targetPrice: 850,
    status: "active",
    type: "price_drop",
    lastUpdated: "3 hours ago",
    createdAt: "1 month ago",
    notification: "email",
    category: "Computers",
  },
  {
    id: 3,
    product: "PlayStation 5",
    image: "/placeholder.svg?height=80&width=80",
    store: "Best Buy",
    currentPrice: 499,
    oldPrice: 499,
    targetPrice: 450,
    status: "active",
    type: "price_drop",
    lastUpdated: "2 days ago",
    createdAt: "3 weeks ago",
    notification: "email",
    category: "Gaming",
  },
  {
    id: 4,
    product: "Nintendo Switch OLED",
    image: "/placeholder.svg?height=80&width=80",
    store: "GameStop",
    currentPrice: 349,
    oldPrice: 349,
    targetPrice: 300,
    status: "active",
    type: "price_drop",
    lastUpdated: "1 day ago",
    createdAt: "2 weeks ago",
    notification: "email",
    category: "Gaming",
  },
  {
    id: 5,
    product: 'iPad Pro 12.9"',
    image: "/placeholder.svg?height=80&width=80",
    store: "Best Buy",
    currentPrice: 1099,
    oldPrice: 1099,
    targetPrice: 950,
    status: "active",
    type: "price_drop",
    lastUpdated: "5 hours ago",
    createdAt: "1 month ago",
    notification: "email",
    category: "Tablets",
  },
  {
    id: 6,
    product: "Samsung Galaxy S22",
    image: "/placeholder.svg?height=80&width=80",
    store: "Samsung",
    currentPrice: 799,
    oldPrice: 849,
    targetPrice: 750,
    status: "triggered",
    type: "price_drop",
    lastUpdated: "2 days ago",
    createdAt: "1 month ago",
    notification: "email",
    category: "Smartphones",
  },
  {
    id: 7,
    product: "Dyson V11 Absolute",
    image: "/placeholder.svg?height=80&width=80",
    store: "Dyson",
    currentPrice: 599,
    oldPrice: 699,
    targetPrice: 600,
    status: "triggered",
    type: "price_drop",
    lastUpdated: "1 week ago",
    createdAt: "2 months ago",
    notification: "email",
    category: "Home Appliances",
  },
  {
    id: 8,
    product: "LG C1 OLED TV",
    image: "/placeholder.svg?height=80&width=80",
    store: "Amazon",
    currentPrice: 1299,
    oldPrice: 1499,
    targetPrice: 1300,
    status: "triggered",
    type: "price_drop",
    lastUpdated: "3 days ago",
    createdAt: "1 month ago",
    notification: "email",
    category: "Electronics",
  },
];

export default function Alerts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("product");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedAlerts, setSelectedAlerts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const alertsPerPage = 5;

  // Filter and sort alerts
  const filteredAlerts = priceAlerts
    .filter(
      (alert) =>
        alert.product.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterCategory === "All" || alert.category === filterCategory) &&
        (filterStatus === "All" || alert.status === filterStatus)
    )
    .sort((a, b) => {
      let comparison = 0;

      if (sortBy === "product") {
        comparison = a.product.localeCompare(b.product);
      } else if (sortBy === "price") {
        comparison = a.currentPrice - b.currentPrice;
      } else if (sortBy === "target") {
        comparison = a.targetPrice - b.targetPrice;
      } else if (sortBy === "date") {
        comparison = a.createdAt.localeCompare(b.createdAt);
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

  // Pagination
  const indexOfLastAlert = currentPage * alertsPerPage;
  const indexOfFirstAlert = indexOfLastAlert - alertsPerPage;
  const currentAlerts = filteredAlerts.slice(
    indexOfFirstAlert,
    indexOfLastAlert
  );
  const totalPages = Math.ceil(filteredAlerts.length / alertsPerPage);

  const categories = [
    "All",
    "Electronics",
    "Computers",
    "Gaming",
    "Tablets",
    "Smartphones",
    "Home Appliances",
  ];
  const statuses = ["All", "active", "triggered"];

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
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

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-blue-500";
      case "triggered":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            Active
          </span>
        );
      case "triggered":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 flex items-center">
            <CheckCircle className="h-3 w-3 mr-1" />
            Triggered
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Price Alerts</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
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
              placeholder="Search alerts..."
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
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "All"
                    ? "All Statuses"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>

            <button className="px-4 py-2 bg-[#FF6B6B] text-white rounded-md hover:bg-[#FF5252] flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Create Alert
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-[#FF6B6B] rounded border-gray-300 focus:ring-[#FF6B6B]"
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
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF6B6B] dark:hover:text-[#FF6B6B] flex items-center"
                onClick={() => toggleSort("product")}
              >
                Product
                <ArrowUpDown
                  className={clsx("h-4 w-4 ml-1", {
                    "text-[#FF6B6B]": sortBy === "product",
                  })}
                />
              </button>
              <button
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF6B6B] dark:hover:text-[#FF6B6B] flex items-center"
                onClick={() => toggleSort("price")}
              >
                Current Price
                <ArrowUpDown
                  className={clsx("h-4 w-4 ml-1", {
                    "text-[#FF6B6B]": sortBy === "price",
                  })}
                />
              </button>
              <button
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF6B6B] dark:hover:text-[#FF6B6B] flex items-center"
                onClick={() => toggleSort("target")}
              >
                Target Price
                <ArrowUpDown
                  className={clsx("h-4 w-4 ml-1", {
                    "text-[#FF6B6B]": sortBy === "target",
                  })}
                />
              </button>
              <button
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF6B6B] dark:hover:text-[#FF6B6B] flex items-center"
                onClick={() => toggleSort("date")}
              >
                Created
                <ArrowUpDown
                  className={clsx("h-4 w-4 ml-1", {
                    "text-[#FF6B6B]": sortBy === "date",
                  })}
                />
              </button>
            </div>
          </div>

          {selectedAlerts.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-750 p-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <span className="text-sm">
                {selectedAlerts.length} alerts selected
              </span>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md">
                  Edit
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
              <button className="inline-flex items-center px-4 py-2 bg-[#FF6B6B] text-white rounded-md hover:bg-[#FF5252]">
                <Plus className="h-4 w-4 mr-2" />
                Create New Alert
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-[#FF6B6B] rounded border-gray-300 focus:ring-[#FF6B6B]"
                      checked={selectedAlerts.includes(alert.id)}
                      onChange={() => toggleAlertSelection(alert.id)}
                    />

                    <img
                      src={alert.image || "/placeholder.svg"}
                      alt={alert.product}
                      className="w-16 h-16 rounded-md object-cover"
                    />

                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="font-medium">{alert.product}</h3>
                        {getStatusBadge(alert.status)}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span>{alert.store}</span>
                        <span className="mx-2">•</span>
                        <span>{alert.category}</span>
                        <span className="mx-2">•</span>
                        <span>Created {alert.createdAt}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <div className="mr-4">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Current:
                          </span>
                          <span className="ml-1 text-sm font-bold">
                            ₹{alert.currentPrice}
                          </span>
                        </div>
                        <div className="mr-4">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Target:
                          </span>
                          <span className="ml-1 text-sm font-bold text-[#FF6B6B]">
                            ₹{alert.targetPrice}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Difference:
                          </span>
                          <span className="ml-1 text-sm font-bold text-green-500">
                            {(
                              ((alert.currentPrice - alert.targetPrice) /
                                alert.currentPrice) *
                              100
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-[#FF6B6B]">
                        <Settings className="h-5 w-5" />
                      </button>
                      <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-[#FF6B6B]">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-red-500">
                        <Trash2 className="h-5 w-5" />
                      </button>
                      <Link
                        to={`/product/${alert.id}`}
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
                  className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
                        "bg-[#FF6B6B] text-white": currentPage === page,
                        "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600":
                          currentPage !== page,
                      })}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
