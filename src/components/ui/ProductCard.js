import { Eye, Bookmark } from "lucide-react"; // Icons used in the component

const ProductCard = ({ product }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
    <div className="p-4">
      <div className="flex items-center space-x-4">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-16 h-16 rounded-md object-cover"
        />
        <div className="flex-1">
          <h3 className="font-medium text-sm text-gray-900 dark:text-white">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {product.store}
          </p>
          <div className="flex items-center mt-1">
            <span className="text-lg font-bold text-[#FF6B6B]">
              ₹{product.price}
            </span>
            <span className="text-sm text-gray-500 line-through ml-2">
              ₹{product.oldPrice}
            </span>
            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded">
              -{product.discount}%
            </span>
          </div>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between">
        <button className="text-xs text-[#FF6B6B] hover:underline flex items-center">
          <Eye className="h-3 w-3 mr-1" /> View Details
        </button>
        <button className="text-xs text-gray-600 dark:text-gray-400 hover:underline flex items-center">
          <Bookmark className="h-3 w-3 mr-1" /> Save
        </button>
      </div>
    </div>
  </div>
);

export default ProductCard;
