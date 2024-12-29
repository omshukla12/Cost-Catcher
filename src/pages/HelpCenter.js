import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HelpCircle, Search, ChevronRight, MessageCircle, Phone, Mail } from 'lucide-react'


export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search functionality here
    console.log('Searching for:', searchQuery)
  }

  const categories = [
    { title: "Getting Started", icon: ChevronRight, articles: ["How to create an account", "Setting up your first price alert", "Understanding the dashboard"] },
    { title: "Account Management", icon: ChevronRight, articles: ["Changing your password", "Updating payment information", "Deleting your account"] },
    { title: "Price Tracking", icon: ChevronRight, articles: ["How to add a product to track", "Setting price thresholds", "Exporting price history data"] },
    { title: "Troubleshooting", icon: ChevronRight, articles: ["Why isn't my price alert working?", "App crashes on startup", "Unable to log in"] },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF5] to-[#F8E8D8]">
    
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <div className="inline-block p-4 bg-orange-100 rounded-full mb-6">
            <HelpCircle className="h-12 w-12 text-orange-500" />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
            Help Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Find answers to your questions and learn how to make the most of Cost-Catcher.
          </p>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-full border-2 border-orange-300 focus:outline-none focus:border-orange-500 pl-12"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors duration-300"
              >
                Search
              </button>
            </div>
          </form>
        </motion.section>

        {/* Categories Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <category.icon className="mr-2 text-orange-500" />
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex}>
                      <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-300">
                        {article}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Support Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-orange-100 rounded-lg p-8 text-center mb-20"
        >
          <h2 className="text-3xl font-bold mb-6">Can't find what you're looking for?</h2>
          <p className="text-xl text-gray-600 mb-8">Our support team is here to help. Reach out to us through any of the following channels:</p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            <a href="#" className="flex items-center text-orange-500 hover:text-orange-600 transition-colors duration-300">
              <MessageCircle className="mr-2" />
              Live Chat
            </a>
            <a href="tel:+1234567890" className="flex items-center text-orange-500 hover:text-orange-600 transition-colors duration-300">
              <Phone className="mr-2" />
              +1 (234) 567-890
            </a>
            <a href="mailto:support@costcatcher.com" className="flex items-center text-orange-500 hover:text-orange-600 transition-colors duration-300">
              <Mail className="mr-2" />
              support@costcatcher.com
            </a>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { question: "How accurate are the price predictions?", answer: "Our AI-powered price predictions are highly accurate, with a typical margin of error less than 5%. We continuously refine our algorithms to improve accuracy." },
              { question: "Can I track prices from any online store?", answer: "Cost-Catcher supports price tracking for most major online retailers. If you find a store that's not supported, please let us know, and we'll work on adding it." },
              { question: "How often are prices updated?", answer: "Prices are typically updated every 6 hours. For high-demand items or during sales events, we may increase the frequency to ensure you don't miss any deals." },
              { question: "Is there a limit to how many items I can track?", answer: "Free accounts can track up to 10 items simultaneously. Premium accounts have unlimited tracking capabilities." },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
  
    </div>
  )
}