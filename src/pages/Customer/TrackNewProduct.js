import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft, LinkIcon, ShoppingBag, ExternalLink } from "lucide-react";
import Avatar from "react-avatar";

const TrackNewProduct = () => {
  const [productLink, setProductLink] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);
  const navigate = useNavigate();

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setProductLink(value);

    // Only validate if there's input
    if (value.length > 0) {
      setIsValidUrl(validateUrl(value));
    } else {
      setIsValidUrl(true); // Reset validation when empty
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productLink || !validateUrl(productLink)) {
      setIsValidUrl(false);
      return;
    }

    // Navigate to the next page and pass the product link via query params ...
    navigate(
      `/addProduct/verifyProduct?productLink=${encodeURIComponent(productLink)}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/dashboard" className="mr-4">
                <ArrowLeft className="h-5 w-5 text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 focus:outline-none" />
              </Link>
              <h1 className="text-2xl font-bold">Track New Product</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 mb-6">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-500 mr-3">
                <LinkIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Add a Product to Track
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Paste the product URL from any supported e-commerce website
                </p>
              </div>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="productLink"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Product URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ExternalLink className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="productLink"
                      type="text"
                      placeholder="https://www.example.com/product/123"
                      value={productLink}
                      onChange={handleInputChange}
                      className={`pl-10 w-full p-3 border ${
                        isValidUrl
                          ? "border-gray-300 dark:border-gray-600"
                          : "border-red-500 dark:border-red-500"
                      } rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                      required
                    />
                  </div>
                  {!isValidUrl && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      Please enter a valid URL (e.g.,
                      https://www.example.com/product)
                    </p>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-[#ff5252] text-white font-medium py-3 px-4 rounded-md transition duration-200 flex items-center justify-center"
                  >
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Track This Product
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-gray-100 dark:bg-gray-600 p-4 rounded-b-lg border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Supported Websites
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  Amazon
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  Flipkart
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  Myntra
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  Nykaa
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  Ajio
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">How It Works</h3>
              <ol className="space-y-4 ml-5 list-decimal text-gray-700 dark:text-gray-300">
                <li className="pl-2">
                  <span className="font-medium">Paste the product URL</span>{" "}
                  from any supported e-commerce website.
                </li>
                <li className="pl-2">
                  <span className="font-medium">
                    Verify the product details
                  </span>{" "}
                  on the next screen.
                </li>
                <li className="pl-2">
                  <span className="font-medium">Set your target price</span> to
                  get notified when the price drops.
                </li>
                <li className="pl-2">
                  <span className="font-medium">Track price changes</span> and
                  save money on your purchases.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrackNewProduct;
