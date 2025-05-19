import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { extractProductID } from "../utils/productUtils";

const ProductForm = ({
  initialValue = "",
  buttonText = "Submit",
  onSubmit,
}) => {
  const [productLink, setProductLink] = useState(initialValue);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!productLink.trim()) {
      setError("Please enter a product link");
      return;
    }

    // Validate if it's a proper Amazon link
    const productId = extractProductID(productLink);
    if (!productId) {
      setError("Invalid Amazon product link. Please check the URL format.");
      return;
    }

    onSubmit(productLink, productId);
  };

  return (
    <form className="py-2 w-full max-w-md" onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          className="p-2 border border-gray-300 rounded w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          type="text"
          placeholder="Paste Amazon product link here..."
          value={productLink}
          onChange={(e) => setProductLink(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      <div>
        <button
          type="submit"
          className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
