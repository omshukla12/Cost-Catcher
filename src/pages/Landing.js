import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { DollarSign, ArrowRight, TrendingDown, Bell, Search, Star, BarChart, Zap } from 'lucide-react';

// Simple custom accordion components
const Accordion = ({ children, type = "single", collapsible = true }) => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (value) => {
    if (type === "single") {
      setOpenItems(new Set(openItems.has(value) ? [] : [value]));
    } else {
      const newOpenItems = new Set(openItems);
      if (newOpenItems.has(value)) {
        newOpenItems.delete(value);
      } else {
        newOpenItems.add(value);
      }
      setOpenItems(newOpenItems);
    }
  };

  return (
    <div className="space-y-2">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { 
          isOpen: openItems.has(child.props.value),
          onToggle: () => toggleItem(child.props.value)
        })
      )}
    </div>
  );
};

const AccordionItem = ({ value, children, isOpen, onToggle }) => {
  return (
    <div className="border rounded-lg border-gray-200 dark:border-gray-800">
      {React.Children.map(children, child => 
        React.cloneElement(child, { isOpen, onToggle })
      )}
    </div>
  );
};

const AccordionTrigger = ({ children, isOpen, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="flex justify-between w-full px-4 py-4 text-left"
    >
      <span className="font-medium">{children}</span>
      <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
        ▼
      </span>
    </button>
  );
};

const AccordionContent = ({ children, isOpen }) => {
  return (
    <div
      className={`px-4 transition-all duration-200 overflow-hidden ${
        isOpen ? 'max-h-96 pb-4' : 'max-h-0'
      }`}
    >
      {children}
    </div>
  );
};

// Feature Component
function Feature({ feature, index }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="h-full hover:shadow-lg transition-shadow duration-300 rounded-lg bg-white dark:bg-gray-800 p-6">
        <div>
          <motion.div 
            className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mb-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <feature.icon className="h-6 w-6 text-orange-500" />
          </motion.div>
          <h3 className="text-xl font-semibold">{feature.title}</h3>
        </div>
        <div className="mt-4">
          <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Calculator Section Component
function Calculator({ savings, setSavings }) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white/10 backdrop-blur-md rounded-lg">
      <div className="mb-6">
        <label htmlFor="savings-slider" className="text-white mb-2 block">
          Estimated Monthly Spending
        </label>
        <input
          type="range"
          id="savings-slider"
          min="100"
          max="10000"
          step="100"
          value={savings}
          onChange={(e) => setSavings(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold mb-2 text-white">Potential Annual Savings</p>
        <motion.p 
          className="text-5xl font-bold mb-4 text-white"
          key={savings}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          ₹{Math.round(savings * 0.15 * 12)}
        </motion.p>
        <p className="text-sm text-white/80">Based on an average savings of 15% per purchase</p>
      </div>
    </div>
  );
}

export default function Landing() {
  const [darkMode, setDarkMode] = useState(false);
  const [savings, setSavings] = useState(500);
  const [email, setEmail] = useState("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF5] to-[#F8E8D8] dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-orange-500 z-50"
        style={{ scaleX }}
      />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Revolutionize Your Shopping Experience
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Harness the power of AI to track prices, catch unbeatable deals, and maximize your savings across the digital marketplace.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Start Saving Now <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              How CostCatcher Transforms Your Shopping
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Feature key={index} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-500">
          <div className="container mx-auto px-4">
            <Calculator savings={savings} setSavings={setSavings} />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Frequently Asked Questions
            </motion.h2>
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
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">
              Ready to Revolutionize Your Shopping?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join the CostCatcher community and start saving today. It's free to get started!
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
                <button
                  type="submit"
                  className="px-8 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Get Started
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

const features = [
  {
    title: "AI-Powered Price Tracking",
    description: "Our advanced algorithms monitor price fluctuations across multiple retailers in real-time, ensuring you never miss a deal.",
    icon: TrendingDown,
  },
  {
    title: "Smart Notifications",
    description: "Receive instant, personalized alerts when prices hit your target or when we predict an imminent price drop.",
    icon: Bell,
  },
  {
    title: "Comprehensive Analytics",
    description: "Gain valuable insights into price trends, seasonal patterns, and potential savings opportunities.",
    icon: BarChart,
  },
  {
    title: "One-Click Price Comparison",
    description: "Effortlessly compare prices across multiple stores to find the best deal with a single click.",
    icon: Search,
  },
  {
    title: "Customizable Watchlists",
    description: "Create and manage multiple watchlists for different product categories or shopping goals.",
    icon: Star,
  },
  {
    title: "Lightning-Fast Deal Alerts",
    description: "Be the first to know about flash sales and limited-time offers with our rapid alert system.",
    icon: Zap,
  },
];

const faqs = [
  {
    question: "How does CostCatcher's AI-powered price tracking work?",
    answer: "CostCatcher utilizes advanced machine learning algorithms to continuously monitor product prices across multiple online retailers. Our AI analyzes historical price data, seasonal trends, and market conditions to predict price fluctuations and identify the best times to make a purchase."
  },
  {
    question: "Is CostCatcher free to use?",
    answer: "Yes, CostCatcher offers a free basic plan that allows you to track up to 10 items simultaneously. For power users and serious bargain hunters, we also offer premium plans with additional features such as unlimited item tracking, advanced analytics, and priority notifications."
  },
  {
    question: "Which online stores does CostCatcher support?",
    answer: "CostCatcher supports a wide range of popular online retailers, including Amazon, Walmart, Best Buy, Target, eBay, and many more. We're constantly expanding our list of supported stores to provide you with the most comprehensive price tracking experience possible. If there's a specific store you'd like us to add, please let us know through our feedback form.",
  },
  {
    question: "How accurate are CostCatcher's price predictions?",
    answer: "Our price predictions are highly accurate, thanks to our sophisticated AI algorithms and vast historical price data. However, it's important to note that market conditions can change rapidly, and some factors may be unpredictable. We continuously refine our models to improve accuracy and provide you with the most reliable price predictions possible.",
  },
  {
    question: "Can I set custom price alerts for specific products?",
    answer: "CostCatcher allows you to set custom price alerts for any product you're tracking. You can choose to be notified when the price drops below a certain threshold, when there's a percentage decrease, or when we predict an upcoming price drop. You can receive these alerts via email, push notifications on our mobile app, or browser notifications, depending on your preferences.",
  },
  {
    question: "Does CostCatcher offer a mobile app?",
    answer: "Yes, CostCatcher offers mobile apps for both iOS and Android devices. Our mobile apps provide all the features of the web version, plus the convenience of on-the-go price tracking and instant mobile notifications. You can download the app from the App Store or Google Play Store.",
  }
];