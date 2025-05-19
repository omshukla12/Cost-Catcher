import React, { useState, useEffect, useContext, useRef } from "react";
import {
  IndianRupee,
  Menu,
  X,
  Moon,
  Sun,
  Mail,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  User,
  ChevronRight,
  Bell,
  Home,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
// import clsx from "clsx";

import { getUserFromToken } from "../services/authService";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

import { Button } from "./ui/Button";
import { Switch } from "./ui/Switch";

const recentAlerts = [
  {
    id: 1,
    product: "Sony WH-1000XM4",
    message: "Price dropped by 15%",
    time: "1 hour ago",
    type: "drop",
  },
  {
    id: 2,
    product: "MacBook Air M1",
    message: "Back in stock",
    time: "3 hours ago",
    type: "stock",
  },
  {
    id: 3,
    product: "PlayStation 5",
    message: "Price increased by 5%",
    time: "1 day ago",
    type: "increase",
  },
  {
    id: 4,
    product: "Nintendo Switch OLED",
    message: "Price dropped by 10%",
    time: "2 days ago",
    type: "drop",
  },
  {
    id: 5,
    product: 'iPad Pro 12.9"',
    message: "Price match found",
    time: "3 days ago",
    type: "match",
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const initialRenderDone = useRef(false);

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  // Handle opening/closing user menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }

    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  useEffect(() => {
    if (!initialRenderDone.current) {
      initialRenderDone.current = true;
      setUserMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    // Keep menu closed on auth changes
    setUserMenuOpen(false);
  }, [isAuthenticated]);

  const toggleMenu = () => {
    setUserMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

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
    logout();
    navigate("/signin");
  };

  const links = isAuthenticated
    ? [
        { to: "/dashboard", label: "Dashboard" },
        // { to: "/contact", label: "Contact" },
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

          {/* Get Started Button */}
          {!isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                onClick={() => navigate("/signin")}
                className="text-white bg-orange-500 hover:bg-orange-400 transform transition-all duration-300 ease-in-out rounded-full px-6 py-2"
              >
                Login
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
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-800" />
              )}
            </button>
          </motion.div>

          {/* User */}

          {isAuthenticated && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={toggleMenu}
                className="relative h-8 w-8 rounded-full focus:outline-none"
              >
                <Avatar name="User" size="32" round={true} color="#FF6B6B" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    {(() => {
                      const { name, email } = getUserFromToken() || {};
                      return name && email ? (
                        <>
                          <p className="text-sm font-medium">{name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {email}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          User details not available
                        </p>
                      );
                    })()}
                  </div>
                  <div className="py-1">
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <User className="inline-block w-4 h-4 mr-2" />
                      Profile
                    </Link>
                    {/* <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Home className="inline-block w-4 h-4 mr-2" />
                      Dashboard
                    </Link> */}
                    <Link
                      to="/contact"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Mail className="inline-block w-4 h-4 mr-2" />
                      Contact
                    </Link>
                    <Link
                      to="/help"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <HelpCircle className="inline-block w-4 h-4 mr-2" />
                      Help Center
                    </Link>
                  </div>
                  <div className="py-1 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      onClick={handleSignout}
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut className="inline-block w-4 h-4 mr-2" />
                      Log out
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* {isAuthenticated && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={toggleMenu}
                className="relative h-8 w-8 rounded-full focus:outline-none"
              >
                <Avatar name="User" size="32" round={true} color="#FF6B6B" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium">{ }</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Free Plan
                    </p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <User className="inline-block w-4 h-4 mr-2" />
                      Profile
                    </Link>
                    <Link
                      to="/home"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Home className="inline-block w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                    <Link
                      to="/pricing"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <CreditCard className="inline-block w-4 h-4 mr-2" />
                      Billing
                    </Link>
                    <Link
                      to="/help"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <HelpCircle className="inline-block w-4 h-4 mr-2" />
                      Help Center
                    </Link>
                  </div>
                  <div className="py-1 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      onClick={handleSignout}
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut className="inline-block w-4 h-4 mr-2" />
                      Log out
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div> */}

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
