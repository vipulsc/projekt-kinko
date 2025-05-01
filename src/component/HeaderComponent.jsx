import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  const [rotated, setRotated] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  const navigate = useNavigate();

  const toggleTheme = () => {
    setRotated((prev) => !prev);
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div>
      <div className="w-full flex items-center justify-between px-8 pt-8 md:px-20 absolute top-0 z-50">
        <motion.div
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8 }}
          drag
          dragConstraints={{ left: 0, right: 300 }}
          dragElastic={0.2}
          dragTransition={{ bounceStiffness: 900, bounceDamping: 15 }}
          dragSnapToOrigin
          onClick={() => navigate("/")}
          className="japanese-text cursor-pointer tracking-wider text-[var(--accent)] text-4xl md:text-5xl lg:text-6xl shizuru-regular"
        >
          金庫
        </motion.div>
        <motion.div
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex items-center gap-2 bg-[var(--lighter-text)] text-[var(--text-color)] px-4 py-1 rounded-full text-xs md:text-sm font-medium border border-[#9945FF]/40 shadow-[0_0_10px_#9945FF33]"
        >
          <span className="flex items-center gap-1">
            <img
              src="/solana.svg"
              color="white"
              alt="Solana"
              width={16}
              height={16}
              className="inline-block"
            />
            Solana
          </span>
          <span className="opacity-40 text-[var(--text-color)]">Only</span>
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
    </div>
  );
};

export default HeaderComponent;
