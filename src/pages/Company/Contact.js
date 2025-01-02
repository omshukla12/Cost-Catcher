import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function Contact() {
  // const contactMethods = [
  //   { icon: Mail, title: "Email", content: "support@costcatcher.com" },
  //   { icon: Phone, title: "Phone", content: "+1 (800) 123-4567" },
  //   {
  //     icon: MapPin,
  //     title: "Address",
  //     content: "123 Price St, Savings City, SC 12345",
  //   },
  //   { icon: MessageSquare, title: "Live Chat", content: "Available 24/7" },
  // ];

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      content: "support@costcatcher.com",
      link: "mailto:support@costcatcher.com",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (800) 123-4567",
      link: "tel:+18001234567",
    },
    {
      icon: MapPin,
      title: "Address",
      content: "123 Price St, Savings City, SC 12345",
      link: "https://www.google.com/maps?q=123+Price+St,+Savings+City,+SC+12345",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      content: "Available 24/7",
      link: "/livechat",
    },
  ];

  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        "You can reset your password by clicking on the 'Forgot Password' link on the login page and following the instructions sent to your email.",
    },
    {
      question: "How often are prices updated?",
      answer:
        "We update prices multiple times a day for most products. The exact frequency can vary depending on the product and retailer.",
    },
    {
      question: "Can I track prices from any online store?",
      answer:
        "Cost-Catcher supports price tracking for most major online retailers. If you find a store that's not supported, please let us know, and we'll consider adding it to our system.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Yes, we have mobile apps available for both iOS and Android devices. You can download them from the App Store or Google Play Store.",
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
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            We're here to help! Reach out to us through any of the following
            methods.
          </p>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
              Get in Touch
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
                >
                  <method.icon className="w-8 h-8 text-orange-500 dark:text-orange-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {method.content}
                  </p>
                </div>
              ))}
            </div> */}
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
              Get in Touch
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactMethods.map(({ icon: Icon, title, content, link }) => (
                <div
                  key={title}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
                >
                  <Icon className="w-8 h-8 text-orange-500 dark:text-orange-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    {title}
                  </h3>
                  <a
                    href={link}
                    className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300"
                  >
                    {content}
                  </a>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
              Send Us a Message
            </h2>
            <form className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </motion.section>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Still have questions?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Check out our comprehensive Help Center for more information and
            tutorials.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300">
            <Link to="/help">Visit Help Center</Link>
          </button>
        </motion.section>
      </main>
    </div>
  );
}
