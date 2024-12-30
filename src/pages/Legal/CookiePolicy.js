import React from "react";
import { motion } from "framer-motion";
import { Cookie, Shield, Settings, Info } from "lucide-react";

export default function CookiePolicy() {
  const cookieTypes = [
    {
      icon: Shield,
      title: "Essential Cookies",
      description:
        "These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services.",
      examples: ["Authentication", "Security", "Load Balancing"],
    },
    {
      icon: Settings,
      title: "Functional Cookies",
      description:
        "These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages.",
      examples: [
        "Language Preferences",
        "Location Settings",
        "Personalized UI",
      ],
    },
    {
      icon: Info,
      title: "Analytics Cookies",
      description:
        "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular.",
      examples: ["Visit Statistics", "Traffic Sources", "User Behavior"],
    },
  ];

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
            <Cookie className="h-12 w-12 text-orange-500" />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
            Cookie Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We use cookies to enhance your browsing experience and analyze our
            traffic. Learn more about how we use cookies and how you can control
            them.
          </p>
        </motion.section>

        {/* Last Updated Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12 text-gray-600"
        >
          Last Updated: December 29, 2023
        </motion.div>

        {/* Cookie Types Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Types of Cookies We Use
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cookieTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-lg p-6 shadow-lg"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <type.icon className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <div className="space-y-2">
                  {type.examples.map((example, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-2" />
                      <span className="text-gray-600">{example}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Detailed Policy Section */}
        <section className="max-w-4xl mx-auto space-y-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
            <p className="text-gray-600 mb-4">
              Cookies are small text files that are placed on your computer or
              mobile device when you visit a website. They are widely used to
              make websites work more efficiently and provide a better browsing
              experience. Cookies also provide information to the website
              owners.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">How We Use Cookies</h2>
            <p className="text-gray-600 mb-4">
              We use cookies for various purposes including:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Understanding how you use our website</li>
              <li>Authentication and maintaining your login session</li>
              <li>Remembering your preferences and settings</li>
              <li>Improving our website's performance and speed</li>
              <li>Providing personalized content and recommendations</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Managing Cookies</h2>
            <p className="text-gray-600 mb-4">
              Most web browsers allow you to control cookies through their
              settings preferences. However, if you limit the ability of
              websites to set cookies, you may worsen your overall user
              experience, since it will no longer be personalized to you.
            </p>
            <div className="mt-6">
              <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300">
                Cookie Settings
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-lg p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about our Cookie Policy, please contact
              us:
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>Email: privacy@costcatcher.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Innovation Drive, San Francisco, CA 94105</li>
            </ul>
          </motion.div>
        </section>

        {/* Cookie Consent Banner */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 md:p-6"
        >
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-600 text-sm md:text-base">
              We use cookies to enhance your browsing experience and analyze our
              traffic. By clicking "Accept All", you consent to our use of
              cookies.
            </div>
            <div className="flex gap-4">
              <button className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300">
                Manage Preferences
              </button>
              <button className="px-4 py-2 text-sm bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-300">
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
