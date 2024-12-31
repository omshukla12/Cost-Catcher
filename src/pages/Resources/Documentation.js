import React from "react";
import { motion } from "framer-motion";
import { Book, Key, Code, Database } from "lucide-react";

export default function Documentation() {
  const sections = [
    {
      icon: Key,
      title: "Authentication",
      description:
        "Learn how to authenticate your requests to the Cost-Catcher API.",
      content: `
        To authenticate your requests, you need to include your API key in the header of each request:

        \`\`\`
        Authorization: Bearer YOUR_API_KEY
        \`\`\`

        You can obtain an API key from your Cost-Catcher dashboard.
      `,
    },
    {
      icon: Database,
      title: "Endpoints",
      description:
        "Explore the various endpoints available in the Cost-Catcher API.",
      content: `
        - GET /api/products: Retrieve a list of tracked products
        - POST /api/products: Add a new product to track
        - GET /api/products/{id}: Get details of a specific product
        - PUT /api/products/{id}: Update a product's tracking settings
        - DELETE /api/products/{id}: Stop tracking a product
        - GET /api/price-history/{id}: Retrieve price history for a product
      `,
    },
    {
      icon: Code,
      title: "Example Usage",
      description: "See how to use the Cost-Catcher API in your applications.",
      content: `
        Here's an example of how to fetch the price history for a product:

        \`\`\`javascript
        const fetchPriceHistory = async (productId) => {
          const response = await fetch(\`https://api.costcatcher.com/price-history/\${productId}\`, {
            headers: {
              'Authorization': 'Bearer YOUR_API_KEY'
            }
          });
          const data = await response.json();
          return data;
        };
        \`\`\`
      `,
    },
  ];

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
            <Book className="h-12 w-12 text-orange-500" />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
            API Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Integrate Cost-Catcher's powerful price tracking capabilities into
            your own applications with our comprehensive API.
          </p>
        </motion.section>

        {/* API Sections */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-lg p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <section.icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
                <p className="text-gray-600 mb-4">{section.description}</p>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  <code>{section.content}</code>
                </pre>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Additional Resources */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Additional Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "API Reference",
                description:
                  "Detailed information about all API endpoints and parameters.",
              },
              {
                title: "SDKs & Libraries",
                description:
                  "Official SDKs and libraries for popular programming languages.",
              },
              {
                title: "Webhooks",
                description:
                  "Learn how to receive real-time updates for price changes.",
              },
            ].map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-lg p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                <p className="text-gray-600">{resource.description}</p>
                <a
                  href="#"
                  className="text-orange-500 hover:underline mt-4 inline-block"
                >
                  Learn more
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-orange-100 rounded-lg p-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-6">
            Sign up for a free API key and start integrating Cost-Catcher into
            your applications today.
          </p>
          <button className="bg-orange-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-orange-600 transition-colors duration-300">
            Get Your API Key
          </button>
        </motion.section>
      </main>
    </div>
  );
}
