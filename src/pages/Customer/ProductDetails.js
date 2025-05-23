import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import {
  ArrowLeft,
  Pencil,
  Trash2,
  ExternalLink,
  ShoppingBag,
  Tag,
  TrendingDown,
  TrendingUp,
  Calendar,
  AlertCircle,
} from "lucide-react";
import placeholder from "../../components/assets/placeholder.svg";

import Edit from "../../components/Edit";
import Delete from "../../components/Delete";
import Loading from "../../components/Loading";

import { AuthContext } from "../../context/AuthContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_CC_API}/tracklist/products/${id}`
        );
        const data = await response.json();

        if (response.ok) {
          setProduct(data);
        } else {
          setError(data.message || "Failed to fetch product details");
        }
      } catch (err) {
        setError("Error fetching product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleEdit = async (productId, newHitPrice) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_CC_API}/tracklist/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newHitPrice }),
        }
      );
      const result = await response.json();

      if (response.ok) {
        setProduct((prev) => ({
          ...prev,
          hitPrice: newHitPrice,
        }));
        setShowEditModal(false);
      } else {
        setError(result.message || "Failed to update hit price.");
      }
    } catch (err) {
      setError("Error editing product.");
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_CC_API}/tracklist/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();

      if (response.ok) {
        setShowDeleteModal(false);
        navigate("/");
      } else {
        setError(result.message || "Failed to delete product.");
      }
    } catch (err) {
      setError("Error deleting product.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
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
            {error}
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 w-full bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-medium py-2 px-4 rounded-md"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  if (!product) return null;
  const imageUrl = product.imageLink || placeholder;

  // Product statistics ...
  const priceDifference = product.currentPrice - product.hitPrice;
  const isPriceHigher = priceDifference > 0;
  const pricePercentage = Math.round(
    (Math.abs(priceDifference) / product.currentPrice) * 100
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/allproducts" className="mr-4">
                <ArrowLeft className="h-5 w-5 text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 focus:outline-none" />
              </Link>
              <h1 className="text-2xl font-bold">Product Details</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold">Product Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Product Image */}
            <div className="flex justify-center items-center">
              <img
                src={imageUrl || "../../components/assets/pageHolder.svg"}
                alt={product.productTitle}
                className="max-h-96 w-full object-contain rounded-lg shadow-md"
                onError={(e) =>
                  (e.target.src = "../../components/assets/pageHolder.png")
                }
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-2xl font-bold">{product.productTitle}</h1>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Current Price
                  </div>
                  <div className="text-3xl font-bold flex items-center">
                    ₹{product.currentPrice.toLocaleString()}
                    {isPriceHigher ? (
                      <TrendingDown className="h-5 w-5 text-green-500 ml-2" />
                    ) : (
                      <TrendingUp className="h-5 w-5 text-red-500 ml-2" />
                    )}
                  </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Target Price
                  </div>
                  <div className="text-3xl font-bold text-[#FF6B6B]">
                    ₹{product.hitPrice.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-500 mr-3">
                    <Tag className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Price Difference
                    </div>
                    <div
                      className={`font-medium ${
                        isPriceHigher ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {isPriceHigher
                        ? "₹" + priceDifference.toLocaleString() + " above"
                        : "₹" +
                          Math.abs(priceDifference).toLocaleString() +
                          " below"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-500 mr-3">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Savings Potential
                    </div>
                    <div className="font-medium">
                      {pricePercentage}%{" "}
                      {isPriceHigher ? "potential savings" : "below target"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => setShowEditModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Target Price
                </button>

                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Product
                </button>

                <a
                  href={product.productLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF6B6B] hover:bg-[#ff5252] focus:outline-none"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Website
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Price History Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold">Price History</h3>
          </div>
          <div className="p-6">
            <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-center">
                <Calendar className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price history coming soon
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  We're tracking price changes for this product
                </p>
              </div>
            </div>
          </div>
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
              productId={product._id}
              onEdit={handleEdit}
              onClose={() => setShowEditModal(false)}
            />
            <button
              onClick={() => setShowEditModal(false)}
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
              productId={product._id}
              productTitle={product.productTitle}
              onClose={() => setShowDeleteModal(false)}
              onDelete={handleDelete}
            />
            <button
              onClick={() => setShowDeleteModal(false)}
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

export default ProductDetails;
