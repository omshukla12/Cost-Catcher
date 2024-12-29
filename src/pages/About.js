import React from 'react'
import { motion } from 'framer-motion'
import { Users, Target, Shield } from 'lucide-react'


export default function About() {
  const teamMembers = [
    {
      name: "Om Shukla",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=400&width=400",
      bio: "With over 15 years of experience in e-commerce and price analytics"
    },
    {
      name: "Nirmit Mishra",
      role: "Chief Technology Officer",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Former AI researcher with a passion for making technology accessible"
    },
    {
      name: "Anurag Dubey",
      role: "Head of Customer Success",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Dedicated to ensuring the best experience for our users"
    }
  ]

  const values = [
    {
      icon: Users,
      title: "Customer First",
      description: "Everything we do is driven by our users' needs and feedback"
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Constantly pushing boundaries to provide cutting-edge solutions"
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Your data privacy and security are our top priorities"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF5] to-[#F8E8D8]">
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
            About Cost-Catcher
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to revolutionize how people shop online by providing intelligent price tracking and analytics, helping consumers make smarter purchasing decisions.
          </p>
        </motion.section>

        {/* Values Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-lg p-6 shadow-lg"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-orange-500 mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white rounded-lg p-12 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-4xl font-bold text-orange-500 mb-2">1M+</h3>
              <p className="text-gray-600">Active Users</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-4xl font-bold text-orange-500 mb-2">$50M+</h3>
              <p className="text-gray-600">User Savings</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-4xl font-bold text-orange-500 mb-2">100+</h3>
              <p className="text-gray-600">Supported Retailers</p>
            </motion.div>
          </div>
        </section>
      </main>
      
    </div>
  )
}