import React from "react";
import clsx from "clsx";

export const Button = ({ children, variant = "default", className, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition";
  const variantClasses = {
    default: "bg-orange-500 text-white hover:bg-orange-600",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-800",
  };

  return (
    <button className={clsx(baseClasses, variantClasses[variant], className)} {...props}>
      {children}
    </button>
  );
};
