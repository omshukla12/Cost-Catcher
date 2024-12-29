import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Eye, FileText } from 'lucide-react'


export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, use our services, or communicate with us. This may include your name, email address, and usage data.",
      icon: Eye
    },
    {
      title: "How We Use Your Information",
      content: "We use your information to provide, maintain, and improve our services, to communicate with you, and to personalize your experience with Cost-Catcher.",
      icon: FileText
    },
    {
      title: "Data Security",
      content: "We implement appropriate technical and organizational measures to protect the security of your personal information against unauthorized access, disclosure, alteration, and destruction.",
      icon: Lock
    },
    {
      title: "Your Rights and Choices",
      content: "You have the right to access, correct, or delete your personal information. You can also object to or restrict certain processing of your data.",
      icon: Shield
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
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At Cost-Catcher, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
          </p>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-8 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <section.icon className="h-6 w-6 text-orange-500" />
                </div>
                <h2 className="text-2xl font-bold">{section.title}</h2>
              </div>
              <p className="text-gray-600">{section.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6">Detailed Privacy Policy</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">1. Information Collection and Use</h3>
              <p className="text-gray-600">
                We collect several different types of information for various purposes to provide and improve our Service to you.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">2. Log Data</h3>
              <p className="text-gray-600">
                We collect information that your browser sends whenever you visit our Service ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">3. Cookies</h3>
              <p className="text-gray-600">
                We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">4. Service Providers</h3>
              <p className="text-gray-600">
                We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">5. Changes to This Privacy Policy</h3>
              <p className="text-gray-600">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Questions or Concerns?</h2>
          <p className="text-xl text-gray-600 mb-8">
            If you have any questions or concerns about our Privacy Policy, please contact us.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-orange-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors duration-300"
          >
            Contact Us
          </motion.a>
        </motion.section>
      </main>
      
    </div>
  )
}