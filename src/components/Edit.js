import { useState, useContext } from "react";

import { Save } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const Edit = ({ productId, currentHitPrice, onEdit, onClose }) => {
  const [newHitPrice, setNewHitPrice] = useState(currentHitPrice || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const { token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newHitPrice || newHitPrice <= 0) {
      setError("Please enter a valid price");
      return;
    }

    setIsUpdating(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_CC_API}/trackinglist/${productId}`,
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
        if (onEdit) {
          onEdit(productId, newHitPrice);
        }
        if (onClose) onClose();
      } else {
        setError(result.message || "Failed to update target price.");
      }
    } catch (err) {
      console.error("Error updating price : ", err);
      setError("Error updating target price.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="newHitPrice"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            New Target Price
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400">₹</span>
            </div>
            <input
              id="newHitPrice"
              type="number"
              value={newHitPrice}
              onChange={(e) => setNewHitPrice(e.target.value)}
              className="pl-8 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
              placeholder="Enter target price"
              min="1"
              required
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            You'll be notified when the price drops to or below this amount.
          </p>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isUpdating}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="h-4 w-4 mr-2" />
          {isUpdating ? "Updating..." : "Update Target Price"}
        </button>
      </form>
    </div>
  );
};

export default Edit;
