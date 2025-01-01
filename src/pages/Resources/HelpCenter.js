import React from 'react'
import { motion } from 'framer-motion'
import { HelpCircle, Book, PenToolIcon as Tool, MessageCircle, Mail, Phone } from 'lucide-react'

export default function HelpCenter() {
  const sections = [
    {
      icon: HelpCircle,
      title: "FAQs",
      description: "Find answers to the most commonly asked questions about Cost-Catcher."
    },
    {
      icon: Book,
      title: "User Guides",
      description: "Step-by-step guides to help you make the most of Cost-Catcher's features."
    },
    {
      icon: Tool,
      title: "Troubleshooting",
      description: "Solutions to common issues and technical problems you might encounter."
    },
    {
      icon: MessageCircle,
      title: "Community Forum",
      description: "Connect with other users, share tips, and get help from the Cost-Catcher community."
    }
  ]

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "To reset your password, click on the 'Forgot Password' link on the login page. Follow the instructions sent to your email to create a new password."
    },
    {
      question: "How accurate are the price predictions?",
      answer: "Our price predictions are based on historical data and market trends. While we strive for high accuracy, please note that predictions are estimates and may not always reflect exact future prices."
    },
    {
      question: "Can I track prices from any online store?",
      answer: "Cost-Catcher supports price tracking for most major online retailers. If you find a store that's not supported, please let us know, and we'll consider adding it to our system."
    },
    {
      question: "How often are prices updated?",
      answer: "We update prices multiple times a day for most products. The exact frequency can vary depending on the product and retailer."
    }
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
            Help Center
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Find answers, get support, and make the most of your Cost-Catcher experience.
          </p>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
            >
              <section.icon className="w-12 h-12 text-orange-500 dark:text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{section.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{section.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <Mail className="w-12 h-12 text-orange-500 dark:text-orange-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Email Support</h3>
              <p className="text-gray-600 dark:text-gray-300">support@costcatcher.com</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <Phone className="w-12 h-12 text-orange-500 dark:text-orange-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Phone Support</h3>
              <p className="text-gray-600 dark:text-gray-300">+91 123 456 789</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <MessageCircle className="w-12 h-12 text-orange-500 dark:text-orange-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Live Chat</h3>
              <p className="text-gray-600 dark:text-gray-300">Only available during business hours </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center"
        >
          
        </motion.section>
      </main>
    </div>
  )
}