import React, { useState, useEffect, useContext } from "react";
import { IndianRupee, Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../utils/ThemeContext";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "./ui/Button";
import { Switch } from "./ui/Switch";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

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
      className={`sticky top-0 left-0 right-0 z-40 backdrop-blur-md border-b transition-transform duration-300 ease-in-out
        ${
          scrolled
            ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            : "bg-white/80 dark:bg-gray-800/80 border-transparent"
        } ${visible ? "md:translate-y-0" : "md:-translate-y-full"}`}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <IndianRupee className="h-6 w-6 text-orange-500" />
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
                className="text-gray-800 dark:text-gray-200 bg-transparent hover:bg-transparent hover:text-orange-500 dark:hover:text-orange-400 transform transition-all duration-300 ease-in-out rounded-full p-2"
              >
                <Link to={to}>{label}</Link>
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
                className="text-gray-800 p-2 hover:text-gray-100 dark:hover:text-gray-200"
              >
                Sign Out
              </Button>
            </motion.div>
          )}

          {/* Get Started Button */}
          {!isAuthenticated && (
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
          )}

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
            " "
          ) : (
            <Menu className="h-6 w-6 text-gray-800 dark:text-gray-200" />
          )}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="w-3/4 fixed top-0 right-0 z-30 bg-gray-50 dark:bg-gray-700 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <nav
              className="container h-screen pl-4 pr-2 py-4 flex flex-col space-y-2 border-gray-200 dark:border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between mx-4 mt-2 mb-3 rounded-md gap-2">
                <div className="flex flex-col grow space-y-2">
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    MENU
                  </h2>
                  {links.map(({ to, label }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-gray-800 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400 pb-2 rounded-md text-base font-medium"
                    >
                      {label}
                    </Link>
                  ))}
                  {isAuthenticated ? (
                    <Link
                      to="/signin"
                      onClick={() => {
                        handleSignout();
                        setMobileMenuOpen(false);
                      }}
                      className="text-gray-800 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400 rounded-md text-base font-medium"
                    >
                      Sign Out
                    </Link>
                  ) : (
                    <Link
                      to="/signin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-gray-800 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400 rounded-md text-base font-medium"
                    >
                      Sign In
                    </Link>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close Menu"
                  className="self-start"
                >
                  <X className="h-6 w-6 text-gray-800 dark:text-gray-200" />
                </Button>
              </div>
              <hr className="border-t-2 dark:border-gray-600 border-gray-200 m-3" />
              <div className="flex items-center justify-center space-x-2 pt-2">
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
