import React from "react";

const PriceInput = ({
  value,
  onChange,
  className = "",
  currencySymbol = "₹",
}) => {
  return (
    <div className="flex items-center">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500">{currencySymbol}</span>
        </div>
        <input
          type="number"
          // className="pl-7 p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          className={`p-2 w-full outline-none text-gray-900 dark:text-gray-100 ${className}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min="0"
          step="0.01"
          placeholder="0.00"
        />
      </div>
    </div>
  );
};

export default PriceInput;
