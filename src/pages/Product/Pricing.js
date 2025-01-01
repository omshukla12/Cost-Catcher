import React from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "₹0",
      period: "Forever",
      features: [
        "Track up to 50 items",
        "Basic price alerts",
        "30-day price history",
        "Community access",
        "Email support",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "₹150",
      period: "per month",
      features: [
        "Track unlimited items",
        "Advanced price alerts",
        "Full price history",
        "Price predictions",
        "Priority support",
        "API access (100 requests/day)",
        "Browser extension",
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "Contact us",
      features: [
        "All Pro features",
        "Unlimited API access",
        "Dedicated account manager",
        "Custom integrations",
        "Volume discounts",
        "On-premise deployment option",
        "24/7 phone support",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  const comparisonFeatures = [
    "Number of tracked items",
    "Price alerts",
    "Price history",
    "Community access",
    "Support",
    "Price predictions",
    "API access",
    "Browser extension",
    "Custom integrations",
    "On-premise deployment",
  ];

  const faqItems = [
    {
      question: "Can I upgrade or downgrade my plan at any time?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
    },
    {
      question: "Is there a free trial for the Pro plan?",
      answer:
        "Yes, we offer a 14-day free trial for our Pro plan. You can cancel anytime during the trial period without being charged.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers for Enterprise customers.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 30-day money-back guarantee for Pro plan subscriptions. If you're not satisfied, contact our support team for a full refund.",
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
          <h1 className="text-5xl font-bold p-4 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your needs. Upgrade, downgrade, or cancel
            anytime. All plans come with our 30-day money-back guarantee.
          </p>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg ${
                plan.highlighted
                  ? "ring-2 ring-orange-500 dark:ring-orange-400"
                  : ""
              }`}
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                {plan.name}
              </h3>
              <p className="text-4xl font-bold mb-2 text-orange-500 dark:text-orange-400">
                {plan.price}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {plan.period}
              </p>
              <ul className="mb-8 space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-gray-600 dark:text-gray-300"
                  >
                    <Check className="w-5 h-5 mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 px-4 rounded-full font-bold transition-colors duration-300 ${
                  plan.highlighted
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">
            Feature Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-6 py-3 text-left text-gray-800 dark:text-gray-200">
                    Feature
                  </th>
                  <th className="px-6 py-3 text-center text-gray-800 dark:text-gray-200">
                    Basic
                  </th>
                  <th className="px-6 py-3 text-center text-gray-800 dark:text-gray-200">
                    Pro
                  </th>
                  <th className="px-6 py-3 text-center text-gray-800 dark:text-gray-200">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0
                        ? "bg-gray-50 dark:bg-gray-900"
                        : "bg-white dark:bg-gray-800"
                    }
                  >
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                      {feature}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {index < 4 ? (
                        <Check className="w-5 h-5 mx-auto text-green-500" />
                      ) : (
                        <X className="w-5 h-5 mx-auto text-red-500" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {index < 8 ? (
                        <Check className="w-5 h-5 mx-auto text-green-500" />
                      ) : (
                        <X className="w-5 h-5 mx-auto text-red-500" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 mx-auto text-green-500" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  {item.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Ready to start saving?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Choose the plan that's right for you and start saving money today.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300">
            <Link to="/signup">
            Get Started
            </Link>
          </button>
        </motion.section>
      </main>
    </div>
  );
}
