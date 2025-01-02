import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const TeamMember = ({ name, role, image, profileLink }) => (
  <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
    <img
      src={image}
      alt={name}
      className="w-40 h-40 rounded-full mx-auto mb-4 object-cover shadow-lg"
    />
    <h3 className="text-xl font-semibold mb-1 text-gray-800 dark:text-gray-200">
      <span className="flex items-center justify-center">
        {name}
        <a
          href={profileLink}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300"
        >
          <ExternalLink className="w-4 h-4 ml-1" />
        </a>
      </span>
    </h3>
    <p className="text-gray-600 dark:text-gray-300">{role}</p>
  </motion.div>
);

export default TeamMember;
