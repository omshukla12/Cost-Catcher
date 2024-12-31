import React from "react";
import { motion } from "framer-motion";

function Calculator({ savings, setSavings }) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white/10 backdrop-blur-md rounded-lg">
      <div className="mb-6">
        <label htmlFor="savings-slider" className="text-white mb-2 block">
          Estimated Monthly Spending
        </label>
        <input
          type="range"
          id="savings-slider"
          min="100"
          max="10000"
          step="100"
          value={savings}
          onChange={(e) => setSavings(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold mb-2 text-white">
          Potential Annual Savings
        </p>
        <motion.p
          className="text-5xl font-bold mb-4 text-white"
          key={savings}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          ₹{Math.round(savings * 0.15 * 12)}
        </motion.p>
        <p className="text-sm text-white/80">
          Based on an average savings of 15% per purchase
        </p>
      </div>
    </div>
  );
}

export default Calculator;
