import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate, Link } from "react-router-dom";

import {
  ArrowLeft,
  AlertCircle,
  Check,
  DollarSign,
  Target,
} from "lucide-react";
import Avatar from "react-avatar";

import Loading from "../../components/Loading";
import PriceInput from "../../components/PriceInput";
import ProductCard from "../../components/ProductCard";

import { extractProductID } from "../../utils/productUtils";
import { fetchProductData, saveProductTracking } from "../../api/productAPI";

function VerifyProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const productLink = queryParams.get("productLink");

  const [productData, setProductData] = useState(null);
  const [hitPrice, setHitPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProductData = async () => {
      if (!productLink) {
        setError("No product link provided");
        setLoading(false);
        return;
      }

      const productId = extractProductID(productLink);

      if (!productId) {
        setError("Invalid product link format");
        setLoading(false);
        return;
      }

      const { data, error } = await fetchProductData(productId);

      if (error) {
        setError(error);
      } else {
        setProductData(data);
      }

      setLoading(false);
    };

    getProductData();
  }, [productLink]);

  const handleTrackProduct = async () => {
    if (!hitPrice) {
      toast.error("Please enter a target price.");
      return;
    }

    if (parseFloat(hitPrice) >= parseFloat(productData.deal_price)) {
      toast.warning("Target price should be lower than the current price.");
      return;
    }

    const { success, error } = await saveProductTracking(productData, hitPrice);

    if (success) {
      toast.success("Product tracking successful!");

      setTimeout(() => {
        navigate("/allproducts");
      }, 2000);
    } else {
      toast.error(error || "Failed to track product");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link to="/addProduct" className="mr-4">
                  <ArrowLeft className="h-5 w-5 text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 focus:outline-none" />
                </Link>
                <h1 className="text-2xl font-bold">Verify Product</h1>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center mb-4 text-red-500 dark:text-red-400">
                <AlertCircle className="h-6 w-6 mr-2" />
                <h2 className="text-xl font-semibold">Error Occurred</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">{error}</p>
              <button
                onClick={() => navigate("/addProduct")}
                className="w-full bg-orange-500 hover:bg-[#ff5252] text-white font-medium py-3 px-4 rounded-md transition duration-200 flex items-center justify-center"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        toastClassName="dark:bg-gray-800 dark:text-white"
      />

      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/addProduct" className="mr-4">
                <ArrowLeft className="h-5 w-5 text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 focus:outline-none" />
              </Link>
              <h1 className="text-2xl font-bold">Verify Product</h1>
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
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 mb-6">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20 text-green-500 mr-3">
                <Check className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Product Details</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Verify the product information before tracking
                </p>
              </div>
            </div>

            <div className="p-6">
              <ProductCard productData={productData} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-500 mr-3">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Set Target Price</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  We'll notify you when the price drops to your target
                </p>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <label
                  htmlFor="hit-price"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[120px]"
                >
                  Target Price :
                </label>
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400 dark:text-gray-400" />
                  </div>
                  <PriceInput
                    value={hitPrice}
                    onChange={setHitPrice}
                    className="pl-10 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleTrackProduct}
                  className="w-full bg-orange-500 hover:bg-[#ff5252] text-white font-medium py-3 px-4 rounded-md transition duration-200 flex items-center justify-center"
                >
                  <Target className="h-5 w-5 mr-2" />
                  Track This Product
                </button>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-600 p-4 rounded-b-lg border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">Note:</span> Target price must be
                lower than the current price. You'll receive notifications when
                the price drops to or below your target.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default VerifyProduct;
