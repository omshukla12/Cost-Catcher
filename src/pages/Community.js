import React from 'react'
import { motion } from 'framer-motion'
import { Users, MessageSquare, Award, Calendar, ArrowRight } from 'lucide-react'


export default function Community() {
  const discussionTopics = [
    { title: "Best deals this week", replies: 42, views: 1200 },
    { title: "How I saved $500 on my new laptop", replies: 38, views: 950 },
    { title: "Price tracking strategies for Black Friday", replies: 56, views: 1500 },
    { title: "Feature request: Multi-currency support", replies: 27, views: 800 },
  ]

  const topContributors = [
    { name: "Alice Johnson", points: 1250, avatar: "/placeholder.svg?height=50&width=50" },
    { name: "Bob Smith", points: 980, avatar: "/placeholder.svg?height=50&width=50" },
    { name: "Carol Williams", points: 875, avatar: "/placeholder.svg?height=50&width=50" },
    { name: "David Brown", points: 720, avatar: "/placeholder.svg?height=50&width=50" },
  ]

  const upcomingEvents = [
    { title: "Virtual Meetup: Maximizing Savings with Cost-Catcher", date: "July 15, 2023" },
    { title: "Webinar: Advanced Price Tracking Techniques", date: "July 22, 2023" },
    { title: "AMA with Cost-Catcher Founders", date: "August 5, 2023" },
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
          <div className="inline-block p-4 bg-orange-100 rounded-full mb-6">
            <Users className="h-12 w-12 text-orange-500" />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
            Cost-Catcher Community
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Connect with fellow deal-hunters, share your experiences, and learn from others in our vibrant community.
          </p>
          <button className="bg-orange-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors duration-300">
            Join the Discussion
          </button>
        </motion.section>

        {/* Popular Discussions Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <MessageSquare className="mr-2 text-orange-500" />
            Popular Discussions
          </h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-orange-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Replies</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {discussionTopics.map((topic, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a href="#" className="text-orange-500 hover:underline">{topic.title}</a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{topic.replies}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{topic.views}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <a href="#" className="text-orange-500 hover:underline inline-flex items-center">
              View all discussions
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        </section>

        {/* Top Contributors Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <Award className="mr-2 text-orange-500" />
            Top Contributors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topContributors.map((contributor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-lg flex items-center"
              >
                <img src={contributor.avatar} alt={contributor.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h3 className="font-semibold">{contributor.name}</h3>
                  <p className="text-orange-500">{contributor.points} points</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <Calendar className="mr-2 text-orange-500" />
            Upcoming Community Events
          </h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {upcomingEvents.map((event, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 hover:bg-orange-50 transition-colors duration-300"
                >
                  <h3 className="font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600">{event.date}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-orange-100 rounded-lg p-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl text-gray-600 mb-6">Share your experiences, learn from others, and become a savvy shopper with Cost-Catcher.</p>
          <button className="bg-orange-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-orange-600 transition-colors duration-300">
            Create an Account
          </button>
        </motion.section>
      </main>
     
    </div>
  )
}