import { motion } from "framer-motion";
import { FileText, UserCheck, AlertTriangle, HelpCircle } from "lucide-react";

export default function TermsOfService() {
  const sections = [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content:
        "By accessing or using CostCatcher's services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.",
    },
    {
      icon: UserCheck,
      title: "User Responsibilities",
      content:
        "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password.",
    },
    {
      icon: AlertTriangle,
      title: "Limitations of Liability",
      content:
        "CostCatcher shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.",
    },
    {
      icon: HelpCircle,
      title: "Governing Law",
      content:
        "These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <main className="container mx-auto px-4 py-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Please read these Terms of Service carefully before using the{" "}
            <span className="text-orange-500 font-bold">CostCatcher</span>{" "}
            website and services.
          </p>
        </motion.section>

        <div className="space-y-12 mb-20">
          {sections.map((section, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <section.icon className="w-8 h-8 text-orange-500 dark:text-orange-400 mr-4" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {section.title}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {section.content}
              </p>
            </motion.section>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-20"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Changes to These Terms
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. We will provide notice of any significant
            changes by posting the new Terms on this page.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Your continued use of the Service after we post any modifications to
            the Terms will constitute your acknowledgment of the modifications
            and your consent to abide and be bound by the modified Terms.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        ></motion.section>
      </main>
    </div>
  );
}
