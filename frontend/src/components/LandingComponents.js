import { motion } from "framer-motion";

export const TestimonialCard = ({ testimonial, index }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
  >
    <p className="text-gray-600 dark:text-gray-300 mb-4">
      "{testimonial.content}"
    </p>
    <div className="font-semibold">{testimonial.name}</div>
    <div className="text-sm text-gray-500 dark:text-gray-400">
      {testimonial.role}
    </div>
  </motion.div>
);

export const StatCard = ({ stat, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="flex flex-col items-center"
  >
    <stat.icon className="w-12 h-12 text-pink-500 mb-2" />
    <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
    <p className="text-lg text-gray-600 dark:text-gray-300">{stat.title}</p>
  </motion.div>
);

export const FeatureCard = ({ feature, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    <feature.icon className="w-12 h-12 text-orange-500 mb-4" />
    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
  </motion.div>
);
