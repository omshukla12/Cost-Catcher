import React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight, TrendingDown, Bell, Search, Star, BarChart, Zap, IndianRupee, ShoppingCart, Users } from 'lucide-react'
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "../components/ui/Accordion"

const features = [
  { title: "AI-Powered Tracking", description: "Real-time price monitoring across multiple retailers", icon: TrendingDown },
  { title: "Smart Notifications", description: "Instant alerts for price drops and predictions", icon: Bell },
  { title: "Comprehensive Analytics", description: "Insights into price trends and savings opportunities", icon: BarChart },
  { title: "One-Click Comparison", description: "Effortlessly compare prices across stores", icon: Search },
  { title: "Custom Watchlists", description: "Manage multiple lists for different categories", icon: Star },
  { title: "Rapid Deal Alerts", description: "Be first to know about flash sales and offers", icon: Zap },
]

const stats = [
  { title: "Active Users", value: "500K+", icon: Users },
  { title: "Money Saved", value: "₹10Cr+", icon: IndianRupee },
  { title: "Products Tracked", value: "5Cr+", icon: ShoppingCart },
]

const testimonials = [
  { name: "Sarah L.", role: "Savvy Shopper", content: "CostCatcher has revolutionized the way I shop online. I've saved hundreds on my purchases!" },
  { name: "Mike R.", role: "Tech Enthusiast", content: "The AI-powered predictions are incredibly accurate. It's like having a personal shopping assistant." },
  { name: "Emily T.", role: "Busy Mom", content: "As a mom of three, CostCatcher helps me find the best deals without spending hours searching." },
]

const faqs = [
  { question: "How does CostCatcher work?", answer: "CostCatcher uses AI to monitor prices across retailers, analyzing data to predict fluctuations and identify the best times to buy." },
  { question: "Is CostCatcher free?", answer: "Yes, we offer a free basic plan. Premium plans with advanced features are also available for power users." },
  { question: "Which stores are supported?", answer: "We support major retailers like Amazon, Walmart, Best Buy, Target, eBay, and many more. Our list is constantly expanding." },
  { question: "How accurate are the predictions?", answer: "Our AI-driven predictions are highly accurate, based on extensive historical data and market analysis." },
  { question: "Can I set custom alerts?", answer: "Yes, you can set custom price alerts for any tracked product, with flexible notification options." },
  { question: "Is there a mobile app?", answer: "No, CostCatcher currently does not offer a mobile app for any platform, but we're working on it." },
]

const FeatureCard = ({ feature, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    <feature.icon className="w-12 h-12 text-orange-500 mb-4" />
    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
  </motion.div>
)

const StatCard = ({ stat, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="flex flex-col items-center"
  >
    <stat.icon className="w-12 h-12 text-pink-500 mb-2" />
    <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
    <p className="text-lg text-gray-600 dark:text-gray-300">{stat.title}</p>
  </motion.div>
)

const TestimonialCard = ({ testimonial, index }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
  >
    <p className="text-gray-600 dark:text-gray-300 mb-4">"{testimonial.content}"</p>
    <div className="font-semibold">{testimonial.name}</div>
    <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
  </motion.div>
)

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-500 to-pink-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Shop Smarter, Save More
            </motion.h1>
            <motion.p
              className="text-xl mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Harness AI-powered price tracking to catch unbeatable deals across the digital marketplace.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link to="/signup"
                className="inline-flex items-center px-8 py-3 bg-white text-orange-500 rounded-full hover:bg-gray-100 transition-colors font-semibold text-lg">
                Start Saving Now 
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">How CostCatcher Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-orange-100 to-pink-100 dark:from-gray-800 dark:to-gray-700">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <StatCard key={index} stat={stat} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-orange-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible>
                {faqs.map((faq, index) => (
                  <AccordionItem key={`item-${index}`} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Revolutionize Your Shopping?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join the CostCatcher community and start saving today. It's free to get started!
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-3 bg-white text-orange-500 rounded-full hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}