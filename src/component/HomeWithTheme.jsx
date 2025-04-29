import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

const HomeWithTheme = () => {
  const [rotated, setRotated] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  const toggleTheme = () => {
    setRotated((prev) => !prev);
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Header Section (logo and toggler) */}
      <div className="w-full flex items-center justify-between px-8 pt-8 absolute top-0 z-50">
        <motion.div
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8 }}
          drag
          dragConstraints={{ left: 0, right: 300 }}
          dragElastic={0.2}
          dragTransition={{ bounceStiffness: 900, bounceDamping: 15 }}
          dragSnapToOrigin
          className="japanese-text tracking-wider text-[var(--accent)] text-4xl md:text-5xl lg:text-6xl shizuru-regular"
        >
          金庫
        </motion.div>
        <motion.button
          onClick={toggleTheme}
          initial={{ x: -1000, y: -100 }}
          animate={{ rotate: rotated ? 720 : 0, x: 0, y: 0 }}
          transition={{ x: { duration: 0.5 }, rotate: { duration: 1 } }}
          className="cursor-pointer"
        >
          <img
            src={theme === "dark" ? "light.svg" : "dark.svg"}
            width={40}
            height={40}
            alt={theme}
          />
        </motion.button>
      </div>

      {/* Main Content Section (centered) */}
      <div className="flex  flex-col md:flex-row items-center justify-center min-h-screen px-4">
        {/* Left - Image */}
        <motion.div
          className="w-full md:w-2/5 flex items-center justify-center p-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src="src/asset/wallet.png"
            alt="wallet"
            className="w-60 z-999 sm:w-72 md:w-4/5 lg:w-5/5 h-auto object-contain"
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            dragSnapToOrigin
            dragElastic={0.4}
            dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
            whileDrag={{ scale: 1.05 }}
            whileHover={{ scale: 1.02 }}
          />
        </motion.div>

        {/* Right - Text Content */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: [0, 0.5, 1], y: 0 }}
          transition={{ duration: 1.2 }}
          className="w-full md:w-3/5 flex flex-col justify-center items-center p-6 tracking-widest"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center lora-italic">
            <span className="text-[var(--text-color)]">k</span>
            <span className="text-[var(--accent)]">i</span>
            <span className="text-[var(--text-color)]">n</span>
            <span className="text-[var(--accent)]">K</span>
            <span className="text-[var(--text-color)]">o</span>
          </h1>

          <p className="pt-4 text-lg md:text-xl lg:text-2xl text-center font-bold text-[var(--text-color)]">
            Your Wallet, Your Gateway to Web3 Wealth
          </p>

          <motion.div className="pt-6 flex flex-col sm:flex-row gap-3">
            {["Create a new wallet", "Import an existing wallet"].map(
              (text, idx) => (
                <motion.button
                  key={idx}
                  type="button"
                  className="group relative text-[var(--dark-text)] px-12 py-4 rounded-3xl bg-[var(--accent)]
                  shadow-[0_4px_14px_rgba(0,0,0,0.3),inset_0px_1px_2px_rgba(255,255,255,0.15),inset_0px_-1px_2px_rgba(0,0,0,0.25)]
                  hover:shadow-[0_6px_20px_rgba(0,0,0,0.4),inset_0px_1px_3px_rgba(255,255,255,0.2),inset_0px_-1px_3px_rgba(0,0,0,0.3)]
                  transition-all duration-300 ease-out font-medium tracking-wide"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {text}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 h-px w-3/4 mx-auto bg-[var(--text-color)] opacity-70"></span>
                  <span className="absolute inset-x-0 -bottom-1 h-2 w-4/5 mx-auto opacity-0 group-hover:opacity-80 transition-all duration-500 blur-md bg-[var(--text-color)]"></span>
                </motion.button>
              )
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeWithTheme;
