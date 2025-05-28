const ProductCard = ({ productData }) => {
  if (!productData) return null;

  const {
    title,
    deal_price: currentPrice,
    original_price: originalPrice,
    discount: currentDiscount,
    product_url: productLink,
  } = productData;

  return (
    <div className="bg-slate-50 dark:bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-md transition-colors duration-300">
      <h2 className="text-xl font-semibold mb-4 line-clamp-2 text-gray-900 dark:text-gray-100">
        {title}
      </h2>

      <div className="space-y-2 text-left">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">
            Current Price:
          </span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            ₹{currentPrice}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">
            Original Price:
          </span>
          <span className="line-through text-gray-500 dark:text-gray-400">
            ₹{originalPrice}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Discount:</span>
          <span className="text-green-600 dark:text-green-400 font-medium">
            {currentDiscount}%
          </span>
        </div>
      </div>

      {productLink && (
        <div className="mt-4 text-sm truncate">
          <a
            href={productLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            View on Amazon
          </a>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
