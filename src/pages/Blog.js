import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight } from 'lucide-react'


const BlogPost = ({ title, excerpt, date, author, image }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg overflow-hidden shadow-lg"
  >
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{excerpt}</p>
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <Calendar className="h-4 w-4 mr-2" />
        <span>{date}</span>
        <User className="h-4 w-4 ml-4 mr-2" />
        <span>{author}</span>
      </div>
      <motion.a
        href="#"
        className="inline-flex items-center text-orange-500 hover:text-orange-600"
        whileHover={{ x: 5 }}
      >
        Read more <ArrowRight className="h-4 w-4 ml-2" />
      </motion.a>
    </div>
  </motion.div>
)

export default function Blog() {
  const blogPosts = [
    {
      title: "5 Ways to Save Money on Your Online Shopping",
      excerpt: "Discover insider tips and tricks to maximize your savings when shopping online.",
      date: "May 15, 2023",
      author: "Jane Doe",
      image: "/placeholder.svg?height=300&width=400"
    },
    {
      title: "The Future of E-commerce: AI-Driven Price Predictions",
      excerpt: "Learn how artificial intelligence is revolutionizing the way we predict and track prices online.",
      date: "May 10, 2023",
      author: "John Smith",
      image: "/placeholder.svg?height=300&width=400"
    },
    {
      title: "Mastering the Art of Price Tracking: A Beginner's Guide",
      excerpt: "Everything you need to know to start tracking prices like a pro and save big on your purchases.",
      date: "May 5, 2023",
      author: "Emily Johnson",
      image: "/placeholder.svg?height=300&width=400"
    },
    {
      title: "The Psychology of Online Shopping: Why We Buy What We Buy",
      excerpt: "Explore the psychological factors that influence our online shopping decisions and how to make smarter choices.",
      date: "April 30, 2023",
      author: "Michael Brown",
      image: "/placeholder.svg?height=300&width=400"
    },
    {
      title: "Sustainable Shopping: How Price Tracking Can Help the Environment",
      excerpt: "Discover how smart price tracking can contribute to more sustainable shopping habits and reduce waste.",
      date: "April 25, 2023",
      author: "Sarah Green",
      image: "/placeholder.svg?height=300&width=400"
    },
    {
      title: "The Rise of Dynamic Pricing: What It Means for Consumers",
      excerpt: "Understanding dynamic pricing strategies and how to use them to your advantage as a savvy online shopper.",
      date: "April 20, 2023",
      author: "David Lee",
      image: "/placeholder.svg?height=300&width=400"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF5] to-[#F8E8D8]">
     
      <main className="container mx-auto px-4 py-16">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
            Cost-Catcher Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest tips, trends, and insights in online shopping and price tracking.
          </p>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogPost key={index} {...post} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors duration-300"
          >
            Load More Posts
          </motion.button>
        </motion.div>
      </main>
      
    </div>
  )
}