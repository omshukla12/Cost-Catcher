import React from 'react'
import { motion } from 'framer-motion'
import { TrendingDown, Bell, BarChart, Search, Star, Zap } from 'lucide-react'


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

export default function Features() {
  const features = [
    {
      icon: TrendingDown,
      title: "AI-Powered Price Tracking",
      description: "Our advanced algorithms monitor price fluctuations across multiple retailers in real-time, ensuring you never miss a deal."
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Receive instant, personalized alerts when prices hit your target or when we predict an imminent price drop."
    },
    {
      icon: BarChart,
      title: "Comprehensive Analytics",
      description: "Gain valuable insights into price trends, seasonal patterns, and potential savings opportunities."
    },
    {
      icon: Search,
      title: "One-Click Price Comparison",
      description: "Effortlessly compare prices across multiple stores to find the best deal with a single click."
    },
    {
      icon: Star,
      title: "Customizable Watchlists",
      description: "Create and manage multiple watchlists for different product categories or shopping goals."
    },
    {
      icon: Zap,
      title: "Lightning-Fast Deal Alerts",
      description: "Be the first to know about flash sales and limited-time offers with our rapid alert system."
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
            Cost-Catcher Features
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our cutting-edge features can revolutionize your online shopping experience and help you save money effortlessly.
          </p>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Start Saving?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of smart shoppers who are already saving money with Cost-Catcher.
          </p>
          <motion.a
            href="/signup"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-orange-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors duration-300"
          >
            Get Started for Free
          </motion.a>
        </motion.section>
      </main>
      
    </div>
  )
}