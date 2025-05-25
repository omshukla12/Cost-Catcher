import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Zap,
  Star,
  Clock,
  Search,
  StarOff,
  ThumbsUp,
  BarChart2,
  ArrowLeft,
  ArrowRight,
  ThumbsDown,
  ExternalLink,
  ShoppingCart,
} from "lucide-react";
import clsx from "clsx";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data for recommended products
const recommendedProducts = [
  {
    id: 1,
    name: "Sony WH-1000XM5",
    image: "/placeholder.svg?height=80&width=80",
    category: "Audio",
    currentPrice: 349,
    originalPrice: 399,
    discount: 13,
    store: "Amazon",
    rating: 4.8,
    reviews: 1250,
    relevanceScore: 98,
    priceHistory: [
      { date: "Jan", price: 399 },
      { date: "Feb", price: 399 },
      { date: "Mar", price: 379 },
      { date: "Apr", price: 369 },
      { date: "May", price: 359 },
      { date: "Jun", price: 349 },
      { date: "Jul", price: 349 },
    ],
    reason: "Based on your interest in audio products",
    isFavorite: true,
    isTracked: true,
    expectedPriceDrop: false,
    dealQuality: "Excellent",
  },
  {
    id: 2,
    name: "MacBook Air M2",
    image: "/placeholder.svg?height=80&width=80",
    category: "Computers",
    currentPrice: 1099,
    originalPrice: 1199,
    discount: 8,
    store: "Best Buy",
    rating: 4.7,
    reviews: 980,
    relevanceScore: 95,
    priceHistory: [
      { date: "Jan", price: 1199 },
      { date: "Feb", price: 1199 },
      { date: "Mar", price: 1199 },
      { date: "Apr", price: 1149 },
      { date: "May", price: 1149 },
      { date: "Jun", price: 1099 },
      { date: "Jul", price: 1099 },
    ],
    reason: "Based on your browsing history",
    isFavorite: false,
    isTracked: true,
    expectedPriceDrop: true,
    dealQuality: "Good",
  },
  {
    id: 3,
    name: 'Samsung 55" QLED TV',
    image: "/placeholder.svg?height=80&width=80",
    category: "Electronics",
    currentPrice: 799,
    originalPrice: 999,
    discount: 20,
    store: "Samsung",
    rating: 4.6,
    reviews: 750,
    relevanceScore: 92,
    priceHistory: [
      { date: "Jan", price: 999 },
      { date: "Feb", price: 999 },
      { date: "Mar", price: 949 },
      { date: "Apr", price: 899 },
      { date: "May", price: 849 },
      { date: "Jun", price: 799 },
      { date: "Jul", price: 799 },
    ],
    reason: "Similar to products you've tracked",
    isFavorite: false,
    isTracked: false,
    expectedPriceDrop: false,
    dealQuality: "Excellent",
  },
  {
    id: 4,
    name: 'iPad Pro 11"',
    image: "/placeholder.svg?height=80&width=80",
    category: "Tablets",
    currentPrice: 749,
    originalPrice: 799,
    discount: 6,
    store: "Apple Store",
    rating: 4.9,
    reviews: 1120,
    relevanceScore: 90,
    priceHistory: [
      { date: "Jan", price: 799 },
      { date: "Feb", price: 799 },
      { date: "Mar", price: 799 },
      { date: "Apr", price: 799 },
      { date: "May", price: 799 },
      { date: "Jun", price: 749 },
      { date: "Jul", price: 749 },
    ],
    reason: "Based on your wishlist",
    isFavorite: true,
    isTracked: true,
    expectedPriceDrop: true,
    dealQuality: "Fair",
  },
  {
    id: 5,
    name: "Dyson V12 Detect",
    image: "/placeholder.svg?height=80&width=80",
    category: "Home Appliances",
    currentPrice: 599,
    originalPrice: 649,
    discount: 8,
    store: "Dyson",
    rating: 4.5,
    reviews: 680,
    relevanceScore: 88,
    priceHistory: [
      { date: "Jan", price: 649 },
      { date: "Feb", price: 649 },
      { date: "Mar", price: 649 },
      { date: "Apr", price: 629 },
      { date: "May", price: 629 },
      { date: "Jun", price: 599 },
      { date: "Jul", price: 599 },
    ],
    reason: "Popular in your area",
    isFavorite: false,
    isTracked: false,
    expectedPriceDrop: true,
    dealQuality: "Good",
  },
  {
    id: 6,
    name: "Nintendo Switch OLED",
    image: "/placeholder.svg?height=80&width=80",
    category: "Gaming",
    currentPrice: 329,
    originalPrice: 349,
    discount: 6,
    store: "GameStop",
    rating: 4.7,
    reviews: 890,
    relevanceScore: 85,
    priceHistory: [
      { date: "Jan", price: 349 },
      { date: "Feb", price: 349 },
      { date: "Mar", price: 349 },
      { date: "Apr", price: 349 },
      { date: "May", price: 349 },
      { date: "Jun", price: 329 },
      { date: "Jul", price: 329 },
    ],
    reason: "Based on your purchase history",
    isFavorite: false,
    isTracked: true,
    expectedPriceDrop: false,
    dealQuality: "Fair",
  },
  {
    id: 7,
    name: "Bose QuietComfort Earbuds",
    image: "/placeholder.svg?height=80&width=80",
    category: "Audio",
    currentPrice: 199,
    originalPrice: 279,
    discount: 29,
    store: "Bose",
    rating: 4.6,
    reviews: 720,
    relevanceScore: 82,
    priceHistory: [
      { date: "Jan", price: 279 },
      { date: "Feb", price: 279 },
      { date: "Mar", price: 249 },
      { date: "Apr", price: 249 },
      { date: "May", price: 229 },
      { date: "Jun", price: 199 },
      { date: "Jul", price: 199 },
    ],
    reason: "Based on your interest in audio products",
    isFavorite: false,
    isTracked: false,
    expectedPriceDrop: false,
    dealQuality: "Excellent",
  },
  {
    id: 8,
    name: "Samsung Galaxy S23",
    image: "/placeholder.svg?height=80&width=80",
    category: "Smartphones",
    currentPrice: 799,
    originalPrice: 899,
    discount: 11,
    store: "Amazon",
    rating: 4.5,
    reviews: 950,
    relevanceScore: 80,
    priceHistory: [
      { date: "Jan", price: 899 },
      { date: "Feb", price: 899 },
      { date: "Mar", price: 899 },
      { date: "Apr", price: 849 },
      { date: "May", price: 849 },
      { date: "Jun", price: 799 },
      { date: "Jul", price: 799 },
    ],
    reason: "Similar to products you've viewed",
    isFavorite: false,
    isTracked: false,
    expectedPriceDrop: true,
    dealQuality: "Good",
  },
];

// Sample data for user preferences
const userPreferences = {
  categories: [
    { name: "Audio", weight: 35 },
    { name: "Computers", weight: 25 },
    { name: "Electronics", weight: 20 },
    { name: "Tablets", weight: 10 },
    { name: "Other", weight: 10 },
  ],
  priceRanges: [
    { range: "₹0-500", percentage: 15 },
    { range: "₹500-1000", percentage: 35 },
    { range: "₹1000-2000", percentage: 30 },
    { range: "₹2000+", percentage: 20 },
  ],
  stores: [
    { name: "Amazon", count: 12 },
    { name: "Best Buy", count: 8 },
    { name: "Apple Store", count: 5 },
    { name: "Samsung", count: 3 },
    { name: "Other", count: 7 },
  ],
};

export default function Recommended() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStore, setFilterStore] = useState("All");
  const [filterDealQuality, setFilterDealQuality] = useState("All");
  const [sortBy, setSortBy] = useState("relevance");
  const [showTrackedOnly, setShowTrackedOnly] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter and sort products
  const filteredProducts = recommendedProducts
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterCategory === "All" || product.category === filterCategory) &&
        (filterStore === "All" || product.store === filterStore) &&
        (filterDealQuality === "All" ||
          product.dealQuality === filterDealQuality) &&
        (!showTrackedOnly || product.isTracked)
    )
    .sort((a, b) => {
      if (sortBy === "relevance") {
        return b.relevanceScore - a.relevanceScore;
      } else if (sortBy === "price_asc") {
        return a.currentPrice - b.currentPrice;
      } else if (sortBy === "price_desc") {
        return b.currentPrice - a.currentPrice;
      } else if (sortBy === "discount") {
        return b.discount - a.discount;
      } else if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });

  const categories = [
    "All",
    "Audio",
    "Computers",
    "Electronics",
    "Tablets",
    "Home Appliances",
    "Gaming",
    "Smartphones",
  ];
  const stores = [
    "All",
    "Amazon",
    "Best Buy",
    "Apple Store",
    "Samsung",
    "Dyson",
    "Bose",
    "GameStop",
  ];
  const dealQualities = ["All", "Excellent", "Good", "Fair"];

  const toggleFavorite = (id) => {
    // In a real app, this would update the state or call an API
    console.log(`Toggle favorite for product ${id}`);
  };

  const toggleTracking = (id) => {
    // In a real app, this would update the state or call an API
    console.log(`Toggle tracking for product ${id}`);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleFeedback = (type) => {
    // In a real app, this would update the state or call an API
    console.log(`Feedback: ${type}`);
  };

  const getDealQualityColor = (quality) => {
    switch (quality) {
      case "Excellent":
        return "text-green-500";
      case "Good":
        return "text-blue-500";
      case "Fair":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4">
              <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-orange-500 focus:outline-none" />
            </Link>
            <h1 className="text-2xl font-bold">Recommended For You</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search recommendations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
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
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
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
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={filterDealQuality}
              onChange={(e) => setFilterDealQuality(e.target.value)}
            >
              {dealQualities.map((quality) => (
                <option key={quality} value={quality}>
                  {quality === "All" ? "All Deal Qualities" : quality}
                </option>
              ))}
            </select>

            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="price_asc">Sort by Price (Low to High)</option>
              <option value="price_desc">Sort by Price (High to Low)</option>
              <option value="discount">Sort by Discount</option>
              <option value="rating">Sort by Rating</option>
            </select>

            <button
              className={clsx("px-4 py-2 border rounded-md flex items-center", {
                "border-orange-500 bg-orange-500/10 text-orange-500":
                  showTrackedOnly,
                "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600":
                  !showTrackedOnly,
              })}
              onClick={() => setShowTrackedOnly(!showTrackedOnly)}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Tracked Only
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Recommended Products List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  Personalized Recommendations ({filteredProducts.length})
                </h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Based on your preferences
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="p-8 text-center">
                  <BarChart2 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                    No recommendations found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className={clsx(
                        "p-4 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer transition-colors duration-150",
                        {
                          "bg-gray-100 dark:bg-gray-900":
                            selectedProduct?.id === product.id,
                        }
                      )}
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-16 h-16 rounded-md object-cover"
                        />

                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="font-medium">{product.name}</h3>
                            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                              {product.category}
                            </span>
                            {product.expectedPriceDrop && (
                              <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                Price Drop Expected
                              </span>
                            )}
                          </div>

                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <span>{product.store}</span>
                            <span className="mx-2">•</span>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-500 mr-1" />
                              {product.rating} (
                              {product.reviews.toLocaleString()} reviews)
                            </div>
                            <span className="mx-2">•</span>
                            <span
                              className={getDealQualityColor(
                                product.dealQuality
                              )}
                            >
                              {product.dealQuality} Deal
                            </span>
                          </div>

                          <div className="flex items-center mt-1">
                            <span className="text-sm line-through text-gray-500">
                              ₹{product.originalPrice}
                            </span>
                            <span className="mx-2 text-lg font-bold">
                              ₹{product.currentPrice}
                            </span>
                            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full">
                              {product.discount}% Off
                            </span>
                          </div>

                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {product.reason}
                          </div>
                        </div>

                        <div className="flex flex-col items-center space-y-2">
                          <button
                            className={clsx("p-2 rounded-full", {
                              "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20":
                                product.isFavorite,
                              "text-gray-400 hover:text-yellow-500 hover:bg-yellow-100 dark:hover:bg-yellow-900/20":
                                !product.isFavorite,
                            })}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(product.id);
                            }}
                          >
                            {product.isFavorite ? (
                              <Star className="h-5 w-5" />
                            ) : (
                              <StarOff className="h-5 w-5" />
                            )}
                          </button>

                          <button
                            className={clsx("p-2 rounded-full", {
                              "text-orange-500 bg-red-100 dark:bg-red-900/20":
                                product.isTracked,
                              "text-gray-400 hover:text-orange-500 hover:bg-red-100 dark:hover:bg-red-900/20":
                                !product.isTracked,
                            })}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTracking(product.id);
                            }}
                          >
                            {product.isTracked ? (
                              <ShoppingCart className="h-5 w-5" />
                            ) : (
                              <ShoppingCart className="h-5 w-5" />
                            )}
                          </button>
                        </div>

                        <Link
                          to={`/product/${product.id}`}
                          className="p-2 rounded-md bg-orange-500 text-white hover:bg-[#FF5252]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-5 w-5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Product Details */}
            {selectedProduct && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold">Product Details</h3>
                </div>
                <div className="p-4">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <img
                          src={selectedProduct.image || "/placeholder.svg"}
                          alt={selectedProduct.name}
                          className="w-20 h-20 rounded-md object-cover"
                        />
                        <div className="ml-4">
                          <h4 className="font-medium text-lg">
                            {selectedProduct.name}
                          </h4>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <span>{selectedProduct.category}</span>
                            <span className="mx-2">•</span>
                            <span>{selectedProduct.store}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <span className="text-sm line-through text-gray-500">
                              ₹{selectedProduct.originalPrice}
                            </span>
                            <span className="mx-2 text-lg font-bold">
                              ₹{selectedProduct.currentPrice}
                            </span>
                            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full">
                              {selectedProduct.discount}% Off
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h5 className="font-medium mb-2">
                          Why We Recommend This
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {selectedProduct.reason}
                        </p>

                        <div className="mt-3 flex items-center">
                          <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                            Is this recommendation helpful?
                          </span>
                          <button
                            className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900/20 text-gray-500 hover:text-green-500 mr-2"
                            onClick={() => handleFeedback("helpful")}
                          >
                            <ThumbsUp className="h-4 w-4" />
                          </button>
                          <button
                            className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900/20 text-gray-500 hover:text-red-500"
                            onClick={() => handleFeedback("not_helpful")}
                          >
                            <ThumbsDown className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h5 className="font-medium mb-2">Deal Quality</h5>
                        <div className="flex items-center">
                          <span
                            className={clsx(
                              "font-medium",
                              getDealQualityColor(selectedProduct.dealQuality)
                            )}
                          >
                            {selectedProduct.dealQuality}
                          </span>
                          <div className="ml-2 flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={clsx("h-full", {
                                "bg-green-500":
                                  selectedProduct.dealQuality === "Excellent",
                                "bg-blue-500":
                                  selectedProduct.dealQuality === "Good",
                                "bg-yellow-500":
                                  selectedProduct.dealQuality === "Fair",
                              })}
                              style={{
                                width: `${
                                  selectedProduct.dealQuality === "Excellent"
                                    ? "100%"
                                    : selectedProduct.dealQuality === "Good"
                                    ? "66%"
                                    : "33%"
                                }`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {selectedProduct.dealQuality === "Excellent"
                            ? "This is an exceptional deal, better than 90% of historical prices."
                            : selectedProduct.dealQuality === "Good"
                            ? "This is a good deal, better than average historical prices."
                            : "This is a fair deal, close to average historical prices."}
                        </p>
                      </div>

                      {selectedProduct.expectedPriceDrop && (
                        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/10 text-blue-800 dark:text-blue-300 rounded-md flex items-start">
                          <Clock className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Price Drop Expected</p>
                            <p className="text-sm">
                              Based on historical data, we expect the price to
                              drop further in the next 30 days. Consider waiting
                              or setting a price alert.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="w-full md:w-64 h-48">
                      <p className="text-sm font-medium mb-2">Price History</p>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={selectedProduct.priceHistory}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis domain={["auto", "auto"]} />
                          <Tooltip
                            formatter={(value) => [`₹${value}`, "Price"]}
                            contentStyle={{
                              backgroundColor: "rgba(255, 255, 255, 0.9)",
                              border: "none",
                              borderRadius: "4px",
                              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#FF6B6B"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>

                      <div className="mt-4 flex justify-between">
                        <Link
                          to={`/product/${selectedProduct.id}`}
                          className="text-sm text-orange-500 hover:underline flex items-center"
                        >
                          View Details
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Link>
                        <button
                          className={clsx(
                            "text-sm hover:underline flex items-center",
                            {
                              "text-orange-500": !selectedProduct.isTracked,
                              "text-gray-500 dark:text-gray-400":
                                selectedProduct.isTracked,
                            }
                          )}
                          onClick={() => toggleTracking(selectedProduct.id)}
                        >
                          {selectedProduct.isTracked ? (
                            <>
                              <ShoppingCart className="h-3 w-3 mr-1" />
                              Tracking
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="h-3 w-3 mr-1" />
                              Track
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Similar Products */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold">
                  Similar Products You Might Like
                </h3>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedProducts.slice(0, 3).map((product) => (
                  <div
                    key={product.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:border-orange-500 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex items-center mb-2">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <div className="ml-3">
                        <h4 className="font-medium text-sm">{product.name}</h4>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <span>{product.store}</span>
                          <span className="mx-1">•</span>
                          <span className="text-green-500">
                            -{product.discount}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs text-gray-500 line-through">
                          ₹{product.originalPrice}
                        </span>
                        <span className="ml-1 font-bold">
                          ₹{product.currentPrice}
                        </span>
                      </div>
                      <Link
                        to={`/product/${product.id}`}
                        className="text-xs text-orange-500 hover:underline flex items-center"
                      >
                        View
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Your Preferences */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold">Your Preferences</h3>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">
                    Favorite Categories
                  </h4>
                  <div className="space-y-2">
                    {userPreferences.categories.map((category) => (
                      <div
                        key={category.name}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{category.name}</span>
                        <div className="flex items-center">
                          <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-orange-500"
                              style={{ width: `${category.weight}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                            {category.weight}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Price Ranges</h4>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={userPreferences.priceRanges.map((item) => ({
                          name: item.range,
                          value: item.percentage,
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Preference"]}
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            border: "none",
                            borderRadius: "4px",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
                          }}
                        />
                        <Bar dataKey="value" fill="#FF6B6B" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Favorite Stores</h4>
                  <div className="space-y-2">
                    {userPreferences.stores.map((store) => (
                      <div
                        key={store.name}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{store.name}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {store.count} items
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendation Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold">
                  Recommendation Settings
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                        checked
                      />
                      <span className="ml-2 text-sm">Show price drops</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                        checked
                      />
                      <span className="ml-2 text-sm">
                        Show similar to tracked items
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                        checked
                      />
                      <span className="ml-2 text-sm">
                        Show based on browsing history
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm">
                        Show popular in my area
                      </span>
                    </label>
                  </div>
                </div>

                <button className="mt-4 w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-[#FF5252] focus:outline-none">
                  Update Preferences
                </button>
              </div>
            </div>

            {/* Special Deals */}
            <div className="bg-gradient-to-r from-orange-500 to-[#FFB4B4] rounded-lg shadow text-white">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Zap className="h-6 w-6 mr-2" />
                  <h3 className="text-lg font-semibold">
                    Special Deals For You
                  </h3>
                </div>
                <p className="text-white/90 mb-4">
                  We've found exclusive deals on products you might be
                  interested in. Check them out before they expire!
                </p>
                <Link
                  to="/best-deals"
                  className="inline-flex items-center px-4 py-2 bg-white text-orange-500 rounded-md hover:bg-gray-100 focus:outline-none"
                >
                  View Special Deals
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
