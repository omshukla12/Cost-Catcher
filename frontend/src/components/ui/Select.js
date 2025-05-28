import React from "react";

export const Select = ({ children, className, ...props }) => (
  <div className={`relative ${className}`} {...props}>
    {children}
  </div>
);

export const SelectTrigger = ({ className, ...props }) => (
  <button className={`form-select-trigger ${className}`} {...props} />
);

export const SelectValue = ({ className, ...props }) => (
  <span className={`form-select-value ${className}`} {...props} />
);

export const SelectContent = ({ className, ...props }) => (
  <div className={`form-select-content ${className}`} {...props} />
);

export const SelectItem = ({ value, className, children, ...props }) => (
  <div
    className={`form-select-item ${className}`}
    data-value={value}
    {...props}
  >
    {children}
  </div>
);
