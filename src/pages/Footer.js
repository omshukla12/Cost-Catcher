import React from 'react'
import { DollarSign } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="/features" className="hover:text-orange-500 transition-colors">Features</a></li>
              <li><a href="/pricing" className="hover:text-orange-500 transition-colors">Pricing</a></li>
              <li><a href="/api" className="hover:text-orange-500 transition-colors">API</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-orange-500 transition-colors">About</a></li>
              <li><a href="/contact" className="hover:text-orange-500 transition-colors">Contact</a></li>
              <li><a href="/blog" className="hover:text-orange-500 transition-colors">Blog</a></li>
              
            </ul>
          </div>
           <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/documentation" className="hover:text-orange-500 transition-colors">Documentation</a></li>
              <li><a href="/help" className="hover:text-orange-500 transition-colors">Help Center</a></li>
              <li><a href="/community" className="hover:text-orange-500 transition-colors">Community</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-orange-500 transition-colors">Terms of Service</a></li>
              <li><a href="/cookie" className="hover:text-orange-500 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <DollarSign className="h-6 w-6 text-orange-500" />
            <span className="font-bold text-xl">CostCatcher</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 CostCatcher. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}