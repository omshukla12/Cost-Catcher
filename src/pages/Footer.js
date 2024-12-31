import React from "react";
import { Link } from "react-router-dom";
import { DollarSign } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-12 px-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/features"
                  className="hover:text-orange-500 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="hover:text-orange-500 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/api"
                  className="hover:text-orange-500 transition-colors"
                >
                  API
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="hover:text-orange-500 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-orange-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-orange-500 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/docs"
                  className="hover:text-orange-500 transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="hover:text-orange-500 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="hover:text-orange-500 transition-colors"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-orange-500 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-orange-500 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/cookie"
                  className="hover:text-orange-500 transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <DollarSign className="h-6 w-6 text-orange-500" />
            <span className="font-bold text-xl">CostCatcher</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 CostCatcher. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
