import React from "react";
import { motion } from "motion/react";

const HomePage = () => {
  return (
    <div className="flex flex-col mt-6.5 md:flex-row  justify-center px-4">
      <motion.div
        className="w-full  md:w-2/5 flex items-center justify-center p-4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div className="w-full z-999 flex justify-center overflow-hidden">
          <motion.img
            src="src/asset/wallet.png"
            alt="wallet"
            className="w-60 z-999 sm:w-72 md:w-4/5 lg:w-5/5 h-auto object-contain"
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            dragSnapToOrigin
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
            whileDrag={{ scale: 1.05 }}
            whileHover={{ scale: 1.02 }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: [0, 0.5, 1], y: 0 }}
        transition={{ duration: 1.2 }}
        className="w-full md:w-3/5 flex flex-col justify-center items-center p-6 tracking-widest"
      >
        <div className="flex justify-center items-center lora-italic">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">
            <span className="text-[var(--text-color)]">k</span>
            <span className="text-[var(--accent)]">i</span>
            <span className="text-[var(--text-color)]">n</span>
            <span className="text-[var(--accent)]">K</span>
            <span className="text-[var(--text-color)]">o</span>
          </h1>
        </div>

        <div className="pt-4 text-lg md:text-xl lg:text-2xl text-center font-bold text-[var(--text-color)]">
          Your Wallet, Your Gateway to Web3 Wealth
        </div>

        <motion.div className="pt-6 flex flex-col sm:flex-row gap-3">
          <motion.button
            type="button"
            className="group relative text-[var(--dark-text)] px-12 py-4 rounded-3xl bg-[var(--accent)]
        shadow-[0_4px_14px_rgba(0,0,0,0.3),inset_0px_1px_2px_rgba(255,255,255,0.15),inset_0px_-1px_2px_rgba(0,0,0,0.25)]
        hover:shadow-[0_6px_20px_rgba(0,0,0,0.4),inset_0px_1px_3px_rgba(255,255,255,0.2),inset_0px_-1px_3px_rgba(0,0,0,0.3)]
        transition-all duration-300 ease-out font-medium tracking-wide"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0.97 }}
            animate={{ opacity: 1 }}
          >
            <span className="relative z-10 flex items-center justify-center">
              Create a new wallet
            </span>
            <span className="absolute inset-x-0 bottom-0 h-px w-3/4 mx-auto bg-[var(--text-color)] opacity-70"></span>
            <span className="absolute inset-x-0 -bottom-1 h-2 w-4/5 mx-auto opacity-0 group-hover:opacity-80 transition-all duration-500 blur-md bg-[var(--text-color)]"></span>
          </motion.button>

          <motion.button
            type="button"
            className="group relative text-[var(--dark-text)] px-12 py-4 rounded-3xl bg-[var(--accent)]
        shadow-[0_4px_14px_rgba(0,0,0,0.3),inset_0px_1px_2px_rgba(255,255,255,0.15),inset_0px_-1px_2px_rgba(0,0,0,0.25)]
        hover:shadow-[0_6px_20px_rgba(0,0,0,0.4),inset_0px_1px_3px_rgba(255,255,255,0.2),inset_0px_-1px_3px_rgba(0,0,0,0.3)]
        transition-all duration-300 ease-out font-medium tracking-wide"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0.97 }}
            animate={{ opacity: 1 }}
          >
            <span className="relative z-10 flex items-center justify-center">
              Import an existing wallet
            </span>
            <span className="absolute inset-x-0 bottom-0 h-px w-3/4 mx-auto bg-[var(--text-color)] opacity-70"></span>
            <span className="absolute inset-x-0 -bottom-1 h-2 w-4/5 mx-auto opacity-0 group-hover:opacity-80 transition-all duration-500 blur-md bg-[var(--text-color)]"></span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;
