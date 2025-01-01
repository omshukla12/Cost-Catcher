import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export const Accordion = ({
  children,
  type = "single",
  collapsible = true,
}) => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (value) => {
    if (type === "single") {
      setOpenItems(new Set(openItems.has(value) ? [] : [value]));
    } else {
      const newOpenItems = new Set(openItems);
      if (newOpenItems.has(value)) {
        newOpenItems.delete(value);
      } else {
        newOpenItems.add(value);
      }
      setOpenItems(newOpenItems);
    }
  };

  return (
    <div className="space-y-2">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          isOpen: openItems.has(child.props.value),
          onToggle: () => toggleItem(child.props.value),
        })
      )}
    </div>
  );
};

export const AccordionItem = ({ value, children, isOpen, onToggle }) => {
  return (
    <div className="border rounded-lg border-gray-200 dark:border-gray-800">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { isOpen, onToggle })
      )}
    </div>
  );
};

export const AccordionTrigger = ({ children, isOpen, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="flex justify-between w-full px-4 py-4 text-left"
    >
      <span className="font-medium">{children}</span>
      <span
        className={`transform transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
      >
        {/* ▼ */}
        <ChevronDown size={24} />
      </span>
    </button>
  );
};

export const AccordionContent = ({ children, isOpen }) => {
  return (
    <div
      className={`px-4 transition-all duration-200 overflow-hidden ${
        isOpen ? "max-h-96 pb-4" : "max-h-0"
      }`}
    >
      {children}
    </div>
  );
};
