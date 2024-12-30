import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PricingTier = ({ name, price, features, isPopular }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`bg-white rounded-lg p-8 shadow-lg ${
      isPopular ? "border-2 border-orange-500" : ""
    }`}
  >
    {isPopular && (
      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
        Most Popular
      </span>
    )}
    <h3 className="text-2xl font-bold mb-4">{name}</h3>
    <p className="text-4xl font-bold mb-6">
      ${price}
      <span className="text-lg font-normal text-gray-600">/month</span>
    </p>
    <ul className="space-y-3 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <Check className="h-5 w-5 text-green-500 mr-2" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`w-full py-2 px-4 rounded-md text-lg font-semibold ${
        isPopular
          ? "bg-orange-500 text-white hover:bg-orange-600"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      } transition-colors duration-300`}
    >
      Choose Plan
    </motion.button>
  </motion.div>
);

export default function Pricing() {
  const pricingTiers = [
    {
      name: "Basic",
      price: 0,
      features: [
        "Track up to 10 items",
        "Daily price updates",
        "Email notifications",
        "Basic price history charts",
      ],
    },
    {
      name: "Pro",
      price: 9.99,
      features: [
        "Track up to 100 items",
        "Real-time price updates",
        "Email and SMS notifications",
        "Advanced price history charts",
        "Price drop predictions",
      ],
      isPopular: true,
    },
    {
      name: "Enterprise",
      price: 29.99,
      features: [
        "Unlimited item tracking",
        "Real-time price updates",
        "Priority notifications",
        "Advanced analytics",
        "API access",
        "Dedicated support",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF5] to-[#F8E8D8]">
      <main className="container mx-auto px-4 py-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your needs. Upgrade, downgrade, or cancel
            anytime.
          </p>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <PricingTier key={index} {...tier} />
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Can I change my plan later?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade, downgrade, or cancel your plan at any time
                from your account settings.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                We offer a 14-day free trial for our Pro plan. No credit card
                required.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers for
                Enterprise plans.
              </p>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
