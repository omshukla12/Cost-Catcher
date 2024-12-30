import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Feature({ feature, index }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="h-full hover:shadow-lg transition-shadow duration-300 rounded-lg bg-white dark:bg-gray-800 p-6">
        <div>
          <motion.div
            className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mb-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <feature.icon className="h-6 w-6 text-orange-500" />
          </motion.div>
          <h3 className="text-xl font-semibold">{feature.title}</h3>
        </div>
        <div className="mt-4">
          <p className="text-gray-600 dark:text-gray-300">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Feature;