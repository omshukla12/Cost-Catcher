import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IndianRupee, ExternalLink, ChevronRight } from "lucide-react";

const footerLinks = [
  { name: "About", href: "/about" },
  { name: "Features", href: "/features" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-12 px-6">
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <motion.div
            className="flex items-center space-x-2 mb-8 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-700 p-3 rounded-full shadow-lg">
              <IndianRupee className="h-8 w-8 text-orange-500" />
            </div>
            <span className="font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
              <Link to="/">CostCatcher</Link>
            </span>
          </motion.div>
          <motion.nav
            className="flex md:flex-row flex-col items-center flex-wrap justify-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 flex items-center group"
              >
                {link.name}
                <ChevronRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            ))}
          </motion.nav>
        </div>
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-orange-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} CostCatcher. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              to="/privacy"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <a
              href="https://github.com/omshukla12/Cost-Catcher"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 flex items-center"
            >
              GitHub <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
