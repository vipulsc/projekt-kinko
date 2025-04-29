import React from "react";
import { motion } from "motion/react";
const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: [0.5, 1], y: 0 }}
      transition={{ duration: 1.2 }}
      className="flex flex-col justify-center items-center mt-33 min-h-96 tracking-widest"
    >
      <div className="flex justify-center items-center lora-italic">
        <h1 className="text-5xl font-bold text-center">
          <span className="text-[var(--text-color)]">k</span>
          <span className="text-[var(--accent)]">i</span>
          <span className="text-[var(--text-color)]">n</span>
          <span className="text-[var(--accent)]">K</span>
          <span className="text-[var(--text-color)]">o</span>
        </h1>
      </div>
      <div className="text-2xl font-bold text-[var(--text-color)]">
        Your Wallet, Your Gateway to Web3 Wealth
      </div>
    </motion.div>
  );
};

export default HomePage;
