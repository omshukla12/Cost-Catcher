import React, { useState } from "react";
import {
  Search,
  Tag,
  ArrowLeft,
  Star,
  StarOff,
  ExternalLink,
  ArrowRight,
  Percent,
  DollarSign,
  Clock,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import clsx from "clsx";

// Sample data for best deals
const bestDeals = [
  {
    id: 1,
    name: "Sony WH-1000XM4",
    price: 279,
    oldPrice: 349,
    image: "/placeholder.svg?height=120&width=120",
    store: "Amazon",
    discount: 20,
    rating: 4.8,
    reviews: 12500,
    category: "Electronics",
    description:
      "Industry-leading noise cancellation with premium sound quality.",
    dealEnds: "2 days",
    isFavorite: true,
    url: "#",
    couponCode: "SUMMER20",
  },
  {
    id: 2,
    name: 'Samsung 55" QLED TV',
    price: 799,
    oldPrice: 999,
    image: "/placeholder.svg?height=120&width=120",
    store: "Best Buy",
    discount: 20,
    rating: 4.7,
    reviews: 8300,
    category: "Electronics",
    description:
      "Quantum Dot technology for over a billion colors with incredible brightness.",
    dealEnds: "3 days",
    isFavorite: false,
    url: "#",
    couponCode: null,
  },
  {
    id: 3,
    name: "Dyson V11 Absolute",
    price: 599,
    oldPrice: 699,
    image: "/placeholder.svg?height=120&width=120",
    store: "Dyson",
    discount: 14,
    rating: 4.9,
    reviews: 5600,
    category: "Home Appliances",
    description:
      "Powerful cordless vacuum with intelligent suction and up to 60 minutes of run time.",
    dealEnds: "1 week",
    isFavorite: true,
    url: "#",
    couponCode: "DYSON100",
  },
  {
    id: 4,
    name: "MacBook Air M1",
    price: 899,
    oldPrice: 999,
    image: "/placeholder.svg?height=120&width=120",
    store: "Apple Store",
    discount: 10,
    rating: 4.9,
    reviews: 15200,
    category: "Computers",
    description:
      "Apple's thinnest and lightest notebook with the powerful M1 chip.",
    dealEnds: "5 days",
    isFavorite: true,
    url: "#",
    couponCode: null,
  },
  {
    id: 5,
    name: "Bose QuietComfort Earbuds",
    price: 279,
    oldPrice: 299,
    image: "/placeholder.svg?height=120&width=120",
    store: "Bose",
    discount: 7,
    rating: 4.6,
    reviews: 3800,
    category: "Audio",
    description:
      "Noise cancelling earbuds with high-fidelity audio and comfortable fit.",
    dealEnds: "3 days",
    isFavorite: false,
    url: "#",
    couponCode: "BOSE20",
  },
  {
    id: 6,
    name: "LG C1 OLED TV",
    price: 1299,
    oldPrice: 1499,
    image: "/placeholder.svg?height=120&width=120",
    store: "Amazon",
    discount: 13,
    rating: 4.8,
    reviews: 9200,
    category: "Electronics",
    description:
      "Self-lit OLED pixels for perfect black and infinite contrast.",
    dealEnds: "1 day",
    isFavorite: false,
    url: "#",
    couponCode: null,
  },
];

// Sample data for upcoming sales events
const upcomingSales = [
  {
    id: 1,
    name: "Amazon Prime Day",
    date: "July 12-13",
    description: "Annual sales event with deep discounts for Prime members",
    stores: ["Amazon"],
    categories: ["Electronics", "Home", "Fashion", "Books"],
  },
  {
    id: 2,
    name: "Back to School Sale",
    date: "August 1-15",
    description: "Discounts on laptops, tablets, and school supplies",
    stores: ["Best Buy", "Apple", "Walmart", "Target"],
    categories: ["Computers", "Tablets", "Office Supplies"],
  },
  {
    id: 3,
    name: "Labor Day Sale",
    date: "September 2-5",
    description: "End of summer savings across multiple categories",
    stores: ["Multiple Retailers"],
    categories: ["Home Appliances", "Furniture", "Outdoor"],
  },
];

export default function BestDeals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStore, setFilterStore] = useState("All");
  const [sortBy, setSortBy] = useState("discount");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Filter and sort deals
  const filteredDeals = bestDeals
    .filter(
      (deal) =>
        deal.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterCategory === "All" || deal.category === filterCategory) &&
        (filterStore === "All" || deal.store === filterStore) &&
        (!showFavoritesOnly || deal.isFavorite)
    )
    .sort((a, b) => {
      if (sortBy === "discount") {
        return b.discount - a.discount;
      } else if (sortBy === "price") {
        return a.price - b.price;
      } else if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });

  const categories = [
    "All",
    "Electronics",
    "Computers",
    "Home Appliances",
    "Audio",
  ];
  const stores = ["All", "Amazon", "Best Buy", "Apple Store", "Dyson", "Bose"];

  const toggleFavorite = (id) => {
    // In a real app, this would update the state or call an API
    console.log(`Toggle favorite for product ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4">
              <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-orange-500 focus:outline-none" />
            </Link>
            <h1 className="text-2xl font-bold">Best Deals</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search deals..."
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
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="discount">Highest Discount</option>
              <option value="price">Lowest Price</option>
              <option value="rating">Highest Rating</option>
            </select>

            <button
              className={clsx("px-4 py-2 border rounded-md flex items-center", {
                "border-orange-500 bg-orange-500/10 text-orange-500":
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
              <h2 className="text-xl font-semibold mb-4">Today's Top Deals</h2>

              {filteredDeals.length === 0 ? (
                <div className="text-center py-8">
                  <Tag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                    No deals found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Try adjusting your filters or search term
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-center justify-center w-full md:w-32 h-32">
                        <img
                          src={deal.image || "/placeholder.svg"}
                          alt={deal.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">
                              {deal.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {deal.store}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <button
                              className="p-1 hover:text-orange-500"
                              onClick={() => toggleFavorite(deal.id)}
                            >
                              {deal.isFavorite ? (
                                <Star className="h-5 w-5 text-orange-500" />
                              ) : (
                                <StarOff className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        <p className="text-sm mt-2">{deal.description}</p>

                        <div className="flex items-center mt-2">
                          <div className="flex items-center">
                            <span className="text-yellow-400">★</span>
                            <span className="ml-1 text-sm">{deal.rating}</span>
                            <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                              ({deal.reviews.toLocaleString()})
                            </span>
                          </div>
                          <span className="mx-2 text-gray-300 dark:text-gray-600">
                            |
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {deal.category}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center justify-between mt-4">
                          <div className="flex items-center">
                            <span className="text-2xl font-bold text-orange-500">
                              ₹{deal.price}
                            </span>
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              ₹{deal.oldPrice}
                            </span>
                            <span className="ml-2 px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-md flex items-center">
                              <Percent className="h-3 w-3 mr-1" />
                              {deal.discount}% OFF
                            </span>
                          </div>

                          <div className="flex items-center mt-2 md:mt-0">
                            <Clock className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-sm text-gray-500">
                              Ends in {deal.dealEnds}
                            </span>
                          </div>
                        </div>

                        {deal.couponCode && (
                          <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-between">
                            <div className="flex items-center">
                              <Tag className="h-4 w-4 text-orange-500 mr-2" />
                              <span className="text-sm font-medium">
                                Use code:{" "}
                                <span className="font-bold">
                                  {deal.couponCode}
                                </span>
                              </span>
                            </div>
                            <button className="text-xs text-orange-500 hover:underline">
                              Copy
                            </button>
                          </div>
                        )}

                        <div className="mt-4 flex space-x-2">
                          <Link
                            to={`/product/${deal.id}`}
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 text-sm"
                          >
                            View Details
                          </Link>
                          <a
                            href={deal.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-[#FF5252] text-sm flex items-center"
                          >
                            Shop Now
                            <ExternalLink className="h-4 w-4 ml-1" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {/* Upcoming Sales Events */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold">Upcoming Sales Events</h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {upcomingSales.map((sale) => (
                    <div
                      key={sale.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:shadow-sm transition-shadow duration-200"
                    >
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-orange-500 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">{sale.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {sale.date}
                          </p>
                          <p className="text-sm mt-1">{sale.description}</p>

                          <div className="mt-2">
                            <div className="flex flex-wrap gap-1 mb-1">
                              {sale.stores.map((store, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded-full"
                                >
                                  {store}
                                </span>
                              ))}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {sale.categories.map((category, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full"
                                >
                                  {category}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Deal Statistics */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold">Deal Statistics</h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/20 text-orange-500 mr-3">
                        <Percent className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Average Discount
                        </p>
                        <p className="text-lg font-bold">14%</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 mr-3">
                        <DollarSign className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Potential Savings
                        </p>
                        <p className="text-lg font-bold">₹2,500+</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium mb-2">
                      Top Deal Categories
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Electronics</span>
                        <span className="text-sm font-medium">42%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: "42%" }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Home Appliances</span>
                        <span className="text-sm font-medium">28%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: "28%" }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Computers</span>
                        <span className="text-sm font-medium">18%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: "18%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Deal Alert CTA */}
            <div className="bg-gradient-to-r from-orange-500 to-[#FFB4B4] rounded-lg shadow text-white">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">
                  Never Miss a Deal
                </h3>
                <p className="text-sm mb-4">
                  Set up price alerts and get notified when prices drop on your
                  favorite products.
                </p>
                <Link
                  to="/price-alerts"
                  className="w-full px-4 py-2 bg-white text-orange-500 rounded-md hover:bg-gray-100 focus:outline-none flex items-center justify-center"
                >
                  Set Up Alerts
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
