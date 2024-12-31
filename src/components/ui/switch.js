import React from "react";

export const Switch = ({ checked, onCheckedChange, className }) => {
  return (
    <label
      className={`relative inline-flex items-center cursor-pointer ${className}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="sr-only peer"
      />
      <div
        className={`w-10 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full 
        peer-checked:bg-orange-500 peer-checked:after:translate-x-4 after:content-[''] after:absolute 
        after:top-[2px] after:left-[2px] after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-transform`}
      ></div>
    </label>
  );
};
