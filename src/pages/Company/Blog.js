import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Blog() {
  

  const featuredPost = {
    title: "The Future of E-commerce: AI-Powered Price Predictions",
    excerpt: "Discover how artificial intelligence is revolutionizing the way we predict and track prices in online retail. Learn about the latest advancements in AI technology and how they're being applied to e-commerce.",
    author: "Dr. Emily Chen",
    date: "June 15, 2023",
    image: "/placeholder.svg?height=400&width=800",
    category: "Technology"
  }

  const blogPosts = [
    {
      title: "10 Tips for Smarter Online Shopping",
      excerpt: "Learn how to save money and make informed decisions when shopping online with these expert tips.",
      author: "Alice Johnson",
      date: "June 10, 2023",
      image: "/placeholder.svg?height=200&width=400",
      category: "Shopping Tips"
    },
    {
      title: "Understanding Price Fluctuations in the Electronics Market",
      excerpt: "Dive deep into the factors that influence price changes in the electronics industry and how to take advantage of them.",
      author: "Michael Lee",
      date: "June 5, 2023",
      image: "/placeholder.svg?height=200&width=400",
      category: "Market Analysis"
    },
    {
      title: "Maximizing Savings: A Guide to Price Tracking Tools",
      excerpt: "Explore the best price tracking tools available and learn how to use them effectively to save money on your purchases.",
      author: "Carol Williams",
      date: "May 30, 2023",
      image: "/placeholder.svg?height=200&width=400",
      category: "Tools & Resources"
    },
    {
      title: "The Psychology of Pricing: Why We Buy What We Buy",
      excerpt: "Uncover the psychological factors that influence our purchasing decisions and how retailers use this knowledge.",
      author: "Dr. Sarah Thompson",
      date: "May 25, 2023",
      image: "/placeholder.svg?height=200&width=400",
      category: "Consumer Behavior"
    },
    {
      title: "Sustainable Shopping: Balancing Cost and Environmental Impact",
      excerpt: "Learn how to make eco-friendly purchasing decisions without breaking the bank.",
      author: "David Green",
      date: "May 20, 2023",
      image: "/placeholder.svg?height=200&width=400",
      category: "Sustainability"
    },
    {
      title: "The Rise of Dynamic Pricing in Online Retail",
      excerpt: "Explore how dynamic pricing algorithms are changing the e-commerce landscape and what it means for consumers.",
      author: "Jennifer Wu",
      date: "May 15, 2023",
      image: "/placeholder.svg?height=200&width=400",
      category: "E-commerce Trends"
    }
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <main className="container mx-auto px-4 py-16">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400 pb-4">
            Cost-Catcher Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Stay informed with the latest insights, tips, and trends in online shopping and price tracking.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">Featured Article</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-64 object-cover" />
            <div className="p-6">
              <span className="inline-block bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full px-3 py-1 text-sm font-semibold mb-2">
                {featuredPost.category}
              </span>
              <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{featuredPost.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{featuredPost.excerpt}</p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                <User className="w-4 h-4 mr-1" />
                <span>{featuredPost.author}</span>
                <span className="mx-2">•</span>
                <Calendar className="w-4 h-4 mr-1" />
                <span>{featuredPost.date}</span>
              </div>
              <a href="#" className="inline-flex items-center text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300">
                Read More
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <span className="inline-block bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full px-3 py-1 text-sm font-semibold mb-2">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <User className="w-4 h-4 mr-1" />
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <a href="#" className="inline-flex items-center text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Want more insights?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Subscribe to our newsletter for weekly tips and trends.</p>
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-gray-200"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-r-full transition-colors duration-300"
            >
             <Link to="/signup">
              Subscribe
              </Link>
            </button>
          </form>
        </motion.section>
      </main>
    </div>
  )
}