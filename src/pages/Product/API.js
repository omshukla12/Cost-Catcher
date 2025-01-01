import React from 'react'
import { motion } from 'framer-motion'
import { Code, Database, Shield, Zap, Book, Cpu } from 'lucide-react'

export default function API() {
  const features = [
    {
      icon: Code,
      title: "RESTful API",
      description: "Easy-to-use RESTful API with comprehensive documentation for seamless integration."
    },
    {
      icon: Database,
      title: "Real-time Data",
      description: "Access real-time pricing data and historical trends for millions of products."
    },
    {
      icon: Shield,
      title: "Secure",
      description: "Bank-level encryption and authentication to keep your data safe and secure."
    },
    {
      icon: Zap,
      title: "High Performance",
      description: "Optimized for speed with 99.9% uptime guarantee and low-latency responses."
    },
    {
      icon: Book,
      title: "Comprehensive Docs",
      description: "Detailed documentation with examples and guides for quick integration."
    },
    {
      icon: Cpu,
      title: "Multiple SDKs",
      description: "Official SDKs available for popular programming languages and frameworks."
    }
  ]

  const codeSnippet = `
import axios from 'axios';

const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://api.costcatcher.com/v1';

async function getProductPrice(productId) {
  try {
    const response = await axios.get(\`\${BASE_URL}/products/\${productId}/price\`, {
      headers: { 'Authorization': \`Bearer \${API_KEY}\` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching product price:', error);
  }
}

// Usage
getProductPrice('ABC123').then(priceData => {
  console.log('Current price:', priceData.currentPrice);
  console.log('Historical low:', priceData.historicalLow);
});
  `.trim();

  const pricingTiers = [
    { name: "Basic", requests: "1,000", price: "$0" },
    { name: "Pro", requests: "100,000", price: "$49" },
    { name: "Business", requests: "1,000,000", price: "$199" },
    { name: "Enterprise", requests: "Custom", price: "Contact us" }
  ]

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
            Cost-Catcher API
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Integrate powerful price tracking and analysis capabilities into your applications with our robust API.
          </p>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
            >
              <feature.icon className="w-12 h-12 text-orange-500 dark:text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg mb-20"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Getting Started</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Follow these steps to start using the Cost-Catcher API:
          </p>
          <ol className="list-decimal list-inside space-y-4 text-gray-600 dark:text-gray-300 mb-8">
            <li>Sign up for a Cost-Catcher account at <a href="#" className="text-orange-500 hover:underline">https://costcatcher.com/signup</a></li>
            <li>Navigate to the API section in your dashboard</li>
            <li>Generate your API key</li>
            <li>Install our official SDK or use direct API calls</li>
            <li>Read our comprehensive documentation at <a href="#" className="text-orange-500 hover:underline">https://docs.costcatcher.com</a></li>
            <li>Make your first API call</li>
          </ol>
          <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Example API Call</h3>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">{codeSnippet}</code>
          </pre>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">API Pricing Tiers</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-6 py-3 text-left text-gray-800 dark:text-gray-200">Tier</th>
                  <th className="px-6 py-3 text-center text-gray-800 dark:text-gray-200">Monthly Requests</th>
                  <th className="px-6 py-3 text-center text-gray-800 dark:text-gray-200">Price</th>
                </tr>
              </thead>
              <tbody>
                {pricingTiers.map((tier, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-gray-800'}>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{tier.name}</td>
                    <td className="px-6 py-4 text-center text-gray-800 dark:text-gray-200">{tier.requests}</td>
                    <td className="px-6 py-4 text-center text-gray-800 dark:text-gray-200">{tier.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Available SDKs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['JavaScript', 'Python', 'Ruby', 'PHP', 'Java', 'Go'].map((lang, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{lang}</h3>
                <a href="#" className="text-orange-500 hover:underline">View Documentation</a>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Ready to get started?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Explore our API documentation and start building today.</p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300">
            View Full API Documentation
          </button>
        </motion.section>
      </main>
    </div>
  )
}