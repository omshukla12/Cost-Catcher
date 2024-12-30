import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const faqs = [
    {
      question: "What are your support hours?",
      answer:
        "Our support team is available Monday through Friday, 9 AM to 6 PM PST. We typically respond to all inquiries within 24 hours.",
    },
    {
      question: "How can I report a technical issue?",
      answer:
        "You can report technical issues through this contact form or by emailing support@costcatcher.com. Please include as much detail as possible.",
    },
    {
      question: "Do you offer phone support?",
      answer:
        "Yes, phone support is available for premium users. Free users can reach us via email or through this contact form.",
    },
    {
      question: "What information should I include in my message?",
      answer:
        "Please include your account email, a detailed description of your inquiry or issue, and any relevant screenshots or error messages.",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Our team is
            always here to help.
          </p>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <Mail className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">support@costcatcher.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <Phone className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <MapPin className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Office</h3>
                  <p className="text-gray-600">
                    123 Innovation Drive
                    <br />
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors duration-300"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
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
  );
}
