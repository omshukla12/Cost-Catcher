import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TrackNewProduct = () => {
  const [productLink, setProductLink] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to the next page and pass the product link via query params
    navigate(
      `/addProduct/verifyProduct?productLink=${encodeURIComponent(productLink)}`
    );
  };

  return (
    <div className="p-4 font-inter flex flex-col items-center gap-4">
      <h1 className="text-3xl font-semibold">Track New Product</h1>
      <form className="py-2" onSubmit={handleSubmit}>
        <input
          className="p-2 border border-gray-700 rounded my-4 w-96"
          type="text"
          placeholder="Product Link..."
          value={productLink}
          onChange={(e) => setProductLink(e.target.value)}
          required
        />
        <div>
          <button
            type="submit"
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Continue!
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrackNewProduct;
