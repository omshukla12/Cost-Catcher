import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Eye, UserCheck } from 'lucide-react'

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: Shield,
      title: "Data Collection",
      content: "We collect personal information that you provide to us, such as your name, email address, and payment information when you create an account or make a purchase. We also collect data about your usage of our services, including your search history and price alerts."
    },
    {
      icon: Lock,
      title: "Data Protection",
      content: "We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems."
    },
    {
      icon: Eye,
      title: "Use of Information",
      content: "We use the information we collect to provide, maintain, and improve our services, to process your transactions, to send you notifications about price changes, and to communicate with you about our services."
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: "You have the right to access, correct, or delete your personal information at any time. You can also opt-out of certain data collection practices. To exercise these rights, please contact us through the methods provided at the end of this policy."
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
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            At Cost-Catcher, we are committed to protecting your privacy and ensuring the security of your personal information.
          </p>
        </motion.section>

        <div className="space-y-12 mb-20">
          {sections.map((section, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <section.icon className="w-8 h-8 text-orange-500 dark:text-orange-400 mr-4" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{section.title}</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{section.content}</p>
            </motion.section>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-20"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Changes to This Policy</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          
        </motion.section>
      </main>
    </div>
  )
}