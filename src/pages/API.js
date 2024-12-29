import React from 'react'
import { motion } from 'framer-motion'
import { Code, Database, Lock, Zap } from 'lucide-react'


const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg p-6 shadow-lg"
  >
    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-orange-500" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
)

export default function API() {
  const features = [
    {
      icon: Database,
      title: "Comprehensive Data Access",
      description: "Get access to our extensive database of product prices, historical trends, and real-time updates."
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Receive instant notifications about price changes and deals through our websocket connections."
    },
    {
      icon: Lock,
      title: "Secure Authentication",
      description: "Our API uses industry-standard OAuth 2.0 for secure authentication and authorization."
    },
    {
      icon: Code,
      title: "Easy Integration",
      description: "Well-documented endpoints and SDKs for popular programming languages make integration a breeze."
    }
  ]

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
            Cost-Catcher API
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Harness the power of our price tracking technology in your own applications with our robust and flexible API.
          </p>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-lg p-8 shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-6">Quick Start Guide</h2>
          <ol className="list-decimal list-inside space-y-4">
            <li className="text-lg">
              <span className="font-semibold">Sign up for an API key:</span>
              <p className="text-gray-600 ml-6 mt-2">
                Create an account and obtain your API key from the developer dashboard.
              </p>
            </li>
            <li className="text-lg">
              <span className="font-semibold">Choose your endpoint:</span>
              <p className="text-gray-600 ml-6 mt-2">
                Select the appropriate endpoint for your needs (e.g., /products, /prices, /alerts).
              </p>
            </li>
            <li className="text-lg">
              <span className="font-semibold">Make your first request:</span>
              <p className="text-gray-600 ml-6 mt-2">
                Use your preferred programming language to make an HTTP request to our API.
              </p>
            </li>
            <li className="text-lg">
              <span className="font-semibold">Handle the response:</span>
              <p className="text-gray-600 ml-6 mt-2">
                Process the JSON response and integrate the data into your application.
              </p>
            </li>
          </ol>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore our comprehensive API documentation and start building powerful price tracking features into your applications today.
          </p>
          <motion.a
            href="/documentation"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-orange-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors duration-300"
          >
            View API Documentation
          </motion.a>
        </motion.section>
      </main>
      
    </div>
  )
}