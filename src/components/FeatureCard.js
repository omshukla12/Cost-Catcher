import React from "react";
import { motion } from "framer-motion";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
    whileHover={{ y: -5 }}
  >
    <Icon className="w-12 h-12 text-orange-500 mb-4" />
    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
);

export default FeatureCard;
