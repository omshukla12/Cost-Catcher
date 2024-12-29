import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Shield, Users, AlertTriangle } from 'lucide-react'


const Section = ({ icon: Icon, title, content }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-8"
  >
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mr-4">
        <Icon className="h-6 w-6 text-orange-500 dark:text-orange-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
    </div>
    <div className="pl-14">
      <p className="text-gray-600 dark:text-gray-300">{content}</p>
    </div>
  </motion.div>
)

export default function TermsOfService() {
  const sections = [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content: "By accessing or using Cost-Catcher, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our service."
    },
    {
      icon: Shield,
      title: "Privacy Policy",
      content: "Your use of Cost-Catcher is also governed by our Privacy Policy, which is incorporated into these Terms of Service by reference. Please review our Privacy Policy to understand our practices."
    },
    {
      icon: Users,
      title: "User Accounts",
      content: "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account."
    },
    {
      icon: AlertTriangle,
      title: "Prohibited Activities",
      content: "You agree not to engage in any activity that interferes with or disrupts the services or servers and networks connected to Cost-Catcher."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF5] to-[#F8E8D8] dark:from-gray-900 dark:to-gray-800">
      
      <main className="container mx-auto px-4 py-16">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Please read these terms carefully before using Cost-Catcher.
          </p>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg"
        >
          {sections.map((section, index) => (
            <Section key={index} {...section} />
          ))}
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            If you have any questions about these Terms of Service, please contact us.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-orange-500 dark:bg-orange-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors duration-300"
          >
            Contact Us
          </motion.a>
        </motion.section>
      </main>
      
    </div>
  )
}