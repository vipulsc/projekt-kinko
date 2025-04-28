import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

export default function ThemeToggler() {
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
    <>
      <div className="flex items-center  pt-8 px-7 lg:px-20 md:px-16">
        <motion.div
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          drag
          dragConstraints={{ left: 0, right: 300 }}
          dragElastic={0.2}
          dragTransition={{ bounceStiffness: 900, bounceDamping: 15 }}
          dragSnapToOrigin
          className="flex-1 text-[var(--accent)] text-5xl lg:text-6xl"
        >
          金庫
        </motion.div>
        <div>
          <motion.button
            onClick={toggleTheme}
            initial={{ x: 1000 }}
            animate={{ rotate: rotated ? 720 : 0, x: 0 }}
            transition={{
              x: { duration: 0.5 },
              rotate: { duration: 1 },
            }}
            Hover={{ scale: 1.2, rotate: [0, 15, -15, 0] }}
            className="p-0 bg-transparent  cursor-pointer"
          >
            <img
              src={theme === "dark" ? "light.svg" : "dark.svg"}
              width={48}
              height={48}
              alt={theme}
            />
          </motion.button>
        </div>
      </div>
    </>
  );
}
