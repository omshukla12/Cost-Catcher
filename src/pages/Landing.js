import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Bell,
  Users,
  BarChart,
  ArrowRight,
  IndianRupee,
  ShoppingCart,
  TrendingDown,
} from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "../components/ui/Accordion";

import {
  StatCard,
  FeatureCard,
  TestimonialCard,
} from "../components/LandingComponents";

const features = [
  {
    title: "Real-Time Tracking",
    description: "Monitor price changes across multiple platforms.",
    icon: TrendingDown,
  },
  {
    title: "Smart Notifications",
    description: "Get instant alerts when prices drop.",
    icon: Bell,
  },
  {
    title: "Price History",
    description: "Track past prices to spot the best deals.",
    icon: BarChart,
  },
];

const stats = [
  { title: "Active Users", value: "15", icon: Users },
  { title: "Money Saved", value: "₹50k+", icon: IndianRupee },
  { title: "Products Tracked", value: "1k+", icon: ShoppingCart },
];

const testimonials = [
  {
    name: "Mohit D.",
    role: "Software Engineer",
    content:
      "I was skeptical at first, but CostCatcher actually caught a ₹3,000 price drop on the laptop I'd been eyeing for months. Set it up once and forgot about it until I got the notification. Definitely worth it.",
  },
  {
    name: "Rahul P.",
    role: "College Student",
    content:
      "Being on a tight budget, every rupee counts. CostCatcher helped me save ₹1,200 on textbooks last semester. The alerts are spot-on and I don't have to constantly check multiple sites anymore.",
  },
  {
    name: "John D.",
    role: "Working Parent",
    content:
      "Between work and kids, I barely have time to hunt for deals. CostCatcher does the heavy lifting for me. Saved ₹800 on my daughter's school supplies without lifting a finger. It's like having a personal shopping assistant.",
  },
];

const faqs = [
  {
    question: "How does CostCatcher work?",
    answer:
      "CostCatcher tracks prices across different online stores, notifying users of any changes.",
  },
  {
    question: "Is CostCatcher free?",
    answer:
      "Yes, we offer a free basic plan at the moment.",
  },
  {
    question: "Which stores are supported?",
    answer:
      "We support major retailers like Amazon, Flipkart, Myntra, and more. Our list is constantly expanding.",
  },
  {
    question: "How accurate is the price tracking?",
    answer:
      "Our system continuously scans retailers for price changes to ensure accurate and up-to-date tracking.",
  },
  {
    question: "Can I set custom alerts?",
    answer:
      "Yes, you can set price alerts for any tracked product and get notified when it reaches your desired price.",
  },
  {
    question: "Is there a mobile app?",
    answer:
      "No, CostCatcher currently does not offer a mobile app for any platform, but we're working on it.",
  },
];

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
              Track prices in real time and never miss out on the best deals
              across the digital marketplace.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to="/signup"
                className="inline-flex items-center px-8 py-3 bg-white text-orange-500 rounded-full hover:bg-gray-100 transition-colors font-semibold text-lg"
              >
                Start Saving Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              How <span className="text-orange-500">CostCatcher</span> Works
            </h2>
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
            <h2 className="text-3xl font-bold mb-12 text-center">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Frequently Asked Questions
            </h2>
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
            <h2 className="text-3xl font-bold mb-4">
              Ready to Revolutionize Your Shopping?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Start saving today. It's free
              to get started!
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
  );
}
