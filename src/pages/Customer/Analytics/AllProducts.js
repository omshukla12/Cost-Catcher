import { useEffect, useState, useContext } from "react";
import {
  ArrowLeft,
  Calendar,
  Download,
  Filter,
  ChevronDown,
  Pencil,
  Trash2,
  ShoppingBag,
  Plus,
  DollarSign,
  Tag,
  ExternalLink,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";

import Loading from "../../../components/Loading";
import Delete from "../../../components/Delete";
import Edit from "../../../components/Edit";

import { AuthContext } from "../../../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user, token, isAuthenticated } = useContext(AuthContext);

  const [trackingItems, setTrackingItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [currentProduct, setCurrentProduct] = useState(null);
  const [timeRange, setTimeRange] = useState("All Time");

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [navigate, isAuthenticated]);

  useEffect(() => {
    const fetchTrackingList = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_CC_API}/trackinglist`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (response.ok) {
          setTrackingItems(result.trackinglist);
        } else {
          setError(result.message || "Failed to fetch tracking list.");
        }
      } catch (err) {
        console.error("Error fetching tracking list:", err);
        setError("Error fetching tracking list.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrackingList();
  }, []);

  const handleEditProduct = async (productId, newHitPrice) => {
    try {
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
        setTrackingItems((prevItems) =>
          prevItems.map((item) =>
            item._id === productId ? { ...item, hitPrice: newHitPrice } : item
          )
        );
        setShowEditModal(false);
      } else {
        setError(result.message || "Failed to edit product.");
      }
    } catch (err) {
      console.error("Error editing product:", err);
      setError("Error editing product.");
    }
  };

  const handleEditClick = (productId) => {
    setCurrentProduct(productId);
    setShowEditModal(true);
  };

  const handleDeleteClick = (productId, productTitle) => {
    setCurrentProduct({ id: productId, title: productTitle });
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  // Calculate stats
  const totalProducts = trackingItems.length;
  const totalSavings = trackingItems.reduce((sum, item) => {
    const saving = item.currentPrice - item.hitPrice;
    return sum + (saving > 0 ? saving : 0);
  }, 0);
  const avgDiscount =
    totalProducts > 0
      ? Math.round(
          (totalSavings /
            trackingItems.reduce((sum, item) => sum + item.currentPrice, 0)) *
            100
        )
      : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/dashboard" className="mr-4">
                <ArrowLeft className="h-5 w-5 text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 focus:outline-none" />
              </Link>
              <h1 className="text-2xl font-bold">Tracking List</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">
              Hello <span className="text-orange-500">{user?.name}</span>!
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Track all of your products and monitor price changes.
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
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Products List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 mb-6">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Your Tracking List</h3>
            <Link
              to="/addProduct"
              className="inline-flex items-center px-3 py-1.5 rounded-md text-sm bg-orange-500 text-white hover:bg-[#ff5252]"
            >
              <Plus className="h-4 w-4 mr-1" />
              Track New Product
            </Link>
          </div>

          {trackingItems.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Current Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Target Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Potential Savings
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {trackingItems.map((item) => {
                    const potentialSavings = Math.max(
                      0,
                      item.currentPrice - item.hitPrice
                    );
                    return (
                      <tr
                        key={item._id}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <td className="px-4 py-4">
                          <div
                            className="flex flex-col cursor-pointer"
                            onClick={() => handleProductClick(item._id)}
                          >
                            <div className="text-sm font-medium">
                              {item.productTitle}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">
                              {item.productLink}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm">₹{item.currentPrice}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm">₹{item.hitPrice}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-orange-500">
                            ₹{potentialSavings}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditClick(item._id)}
                              className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
                              title="Edit Target Price"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteClick(item._id, item.productTitle)
                              }
                              className="p-2 rounded-md bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-800/30 text-red-600 dark:text-red-400"
                              title="Delete Product"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleProductClick(item._id)}
                              className="p-2 rounded-md bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-200 dark:hover:bg-blue-800/30 text-blue-600 dark:text-blue-400"
                              title="View Details"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-3" />
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
                No products tracked yet
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Start tracking products to see price changes
              </p>
              <Link
                to="/addProduct"
                className="inline-flex items-center px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-[#ff5252]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Track Your First Product
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6 border border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4 text-center">
              Edit Target Price
            </h2>
            <Edit
              productId={currentProduct}
              onEdit={handleEditProduct}
              onClose={handleCloseModal}
            />
            <button
              onClick={handleCloseModal}
              className="w-full mt-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6 border border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4 text-center text-red-600 dark:text-red-400">
              Delete This Product?
            </h2>
            <Delete
              productId={currentProduct.id}
              productTitle={currentProduct.title}
              onClose={handleCloseModal}
            />
            <button
              onClick={handleCloseModal}
              className="w-full mt-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
