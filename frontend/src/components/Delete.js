import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, AlertTriangle } from "lucide-react";

const Delete = ({ productId, productTitle, onClose, onDelete }) => {
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.REACT_APP_CC_API}/trackinglist/delete/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        if (onDelete) {
          onDelete(productId);
        }
        if (onClose) onClose();
        setTimeout(() => {
          navigate("/trackinglist");
        }, 500);
      } else {
        setError(result.message || "Deletion failed");
      }
    } catch (error) {
      console.error("Error", error);
      setError("Error while deleting the product");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center text-center">
        <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
          <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
        </div>
      </div>

      <p className="text-center text-gray-700 dark:text-gray-300">
        Are you sure you want to delete{" "}
        <span className="font-semibold">{productTitle}</span>? This action
        cannot be undone.
      </p>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col space-y-2">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          {isDeleting ? "Deleting..." : "Delete Product"}
        </button>
      </div>
    </div>
  );
};

export default Delete;
