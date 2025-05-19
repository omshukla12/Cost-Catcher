import React from "react";

const ProductDetails = ({ productData }) => {
  if (!productData) return null;

  const {
    title,
    deal_price: currentPrice,
    original_price: originalPrice,
    discount: currentDiscount,
    product_url: productLink,
  } = productData;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 line-clamp-2">{title}</h2>

      <div className="space-y-2 text-left">
        <div className="flex justify-between">
          <span className="text-gray-600">Current Price:</span>
          <span className="font-medium">₹{currentPrice}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Original Price:</span>
          <span className="line-through text-gray-500">₹{originalPrice}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Discount:</span>
          <span className="text-green-600 font-medium">{currentDiscount}%</span>
        </div>
      </div>

      {productLink && (
        <div className="mt-4 text-sm truncate">
          <a
            href={productLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View on Amazon
          </a>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
