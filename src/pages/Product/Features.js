import { motion } from "framer-motion";
import {
  Zap,
  Bell,
  Search,
  BarChart,
  ShieldCheck,
  IndianRupee,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Search,
      title: "Advanced Price Tracking",
      description:
        "Track prices across multiple retailers with real-time updates. Set custom tracking parameters and receive notifications when prices match your criteria.",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description:
        "Set custom price alerts and receive instant notifications when prices drop or match your criteria. Choose from email, SMS, or push notifications to stay informed about the best deals.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Data",
      description:
        "Your data is encrypted and protected with industry-leading security measures. We use bank-level encryption to ensure your personal and financial information remains confidential.",
    },
    {
      icon: Zap,
      title: "Fast Performance",
      description:
        "Experience lightning-fast load times and real-time updates across all devices. Our optimized infrastructure ensures you get the information you need without any delays.",
    },
    {
      icon: IndianRupee,
      title: "Price Comparison",
      description:
        "Easily compare prices across multiple retailers to ensure you're getting the best deal. Our tool aggregates prices from various sources, saving you time and effort in your search for the best value.",
    },
    {
      icon: BarChart,
      title: "Analytics Dashboard",
      description:
        "Access a comprehensive analytics dashboard to visualize your savings over time. Track your shopping habits, identify spending patterns, and set budget goals to maximize your savings.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <main className="container mx-auto px-4 py-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400">
            Powerful Features
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Discover how{" "}
            <span className="text-orange-500 font-semibold">CostCatcher</span>{" "}
            empowers you to make smarter purchasing decisions and save money
            effortlessly. Our comprehensive suite of features is designed to
            give you the edge in online shopping.
          </p>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <feature.icon className="w-12 h-12 text-orange-500 dark:text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 text-center"
        ></motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">
            How <span className="text-orange-500">CostCatcher</span> Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                For Shoppers
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Sign up for a free CostCatcher account.</li>
                <li>Start tracking prices for your favorite products.</li>
                <li>Setup Telegram notifications for recieving alerts.</li>
                <li>Make informed purchasing decisions and save money.</li>
              </ol>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                For Developers
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Sign up for a CostCatcher API key.</li>
                <li>
                  Integrate our powerful price tracking features into your app.
                </li>
                <li>Use our comprehensive API documentation.</li>
                <li>Access real-time pricing data and historical trends.</li>
              </ol>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
