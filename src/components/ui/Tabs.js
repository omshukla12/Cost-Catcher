import React, { useState } from "react";

export const Tabs = ({ children, defaultValue, className }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={`tabs ${className}`}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

export const TabsList = ({ children, className }) => (
  <div className={`tabs-list flex ${className}`}>{children}</div>
);

export const TabsTrigger = ({
  value,
  children,
  activeTab,
  setActiveTab,
  className,
}) => (
  <button
    className={`tabs-trigger px-4 py-2 ${
      activeTab === value ? "active" : ""
    } ${className}`}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
);

export const TabsContent = ({ value, children, activeTab, className }) =>
  activeTab === value ? (
    <div className={`tabs-content ${className}`}>{children}</div>
  ) : null;
