import React, { useState, useEffect, useContext } from "react";
import { DollarSign, Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../utils/ThemeContext";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../components/ui/Button";
import { Switch } from "../components/ui/Switch";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext); // 'setSystemTheme' TBD
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Handle scroll to toggle navbar background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [mobileMenuOpen]);

  const handleSignout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/signin");
  };

  const links = isAuthenticated
    ? [
        { to: "/home", label: "Home" },
        { to: "/trackinglist", label: "My Tracklist" },
        { to: "/addProduct", label: "Track New" },
        { to: "/account", label: "Account" },
        { to: "/contact", label: "Contact" },
      ]
    : [
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact" },
      ];

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-40 backdrop-blur-md border-b 
        ${
          scrolled
            ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            : "bg-white/80 dark:bg-gray-800/80 border-transparent"
        }`}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DollarSign className="h-6 w-6 text-orange-500" />
          <Link to="/" className="font-bold text-2xl">
            CostCatcher
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {links.map(({ to, label }) => (
            <motion.div
              key={to}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                variant="ghost"
                onClick={() => navigate(to)}
                aria-label={label}
                className="text-gray-800 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400"
              >
                {label}
              </Button>
            </motion.div>
          ))}
          {isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                onClick={handleSignout}
                className="text-gray-800 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400"
              >
                Sign Out
              </Button>
            </motion.div>
          )}

          {/* Get Started Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              onClick={() => navigate("/signup")}
              className="text-white bg-orange-500 hover:bg-orange-400 transform transition-all duration-300 ease-in-out rounded-full px-6 py-2"
            >
              Get Started
            </Button>
          </motion.div>

          {/* Dark Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <Sun className="h-5 w-5" />
            <Switch
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
              aria-label="Toggle Dark Mode"
            />
            <Moon className="h-5 w-5" />
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-white dark:bg-gray-800 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <nav
              className="container mx-auto px-4 py-8 flex flex-col space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              {links.map(({ to, label }) => (
                <Button
                  key={to}
                  variant="ghost"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate(to);
                  }}
                  aria-label={label}
                  className="text-gray-800 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400"
                >
                  {label}
                </Button>
              ))}
              {isAuthenticated && (
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleSignout();
                  }}
                  className="text-gray-800 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400"
                >
                  Sign Out
                </Button>
              )}
              <div className="flex items-center justify-center space-x-2">
                <Sun className="h-5 w-5" />
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={toggleTheme}
                  aria-label="Toggle Dark Mode"
                />
                <Moon className="h-5 w-5" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
