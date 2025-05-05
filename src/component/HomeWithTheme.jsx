import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import HeaderComponent from "./HeaderComponent";

const HomeWithTheme = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );
  const [isLoading, setIsLoading] = useState({ import: false, create: false });

  const navigate = useNavigate();

  const handleClick = (path) => {
    setIsLoading({ ...isLoading, [path]: true });

    setTimeout(() => {
      navigate(`/${path}`);
      setIsLoading({ import: false, create: false });
    }, 1000);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <HeaderComponent />

      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-4">
        <motion.div
          className="w-full md:w-2/5 flex items-center justify-center p-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src="/wallet.webp"
            alt="wallet"
            className="w-60 cursor-grabbing sm:w-72 md:w-4/5 lg:w-full h-auto object-contain"
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            dragSnapToOrigin
            dragElastic={0.4}
            dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
            whileDrag={{ scale: 1.05 }}
            whileHover={{ scale: 1.02 }}
          />
        </motion.div>

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
            {[
              { text: "Create a new wallet", path: "create" },
              { text: "Import an existing wallet", path: "import" },
            ].map((item, idx) => {
              const isButtonLoading = isLoading[item.path];

              return (
                <motion.button
                  key={idx}
                  type="button"
                  className={`group cursor-pointer relative text-[var(--dark-text)] rounded-3xl bg-[var(--accent)]
                    shadow-[0_4px_14px_rgba(0,0,0,0.3),inset_0px_1px_2px_rgba(255,255,255,0.15),inset_0px_-1px_2px_rgba(0,0,0,0.25)]
                    hover:shadow-[0_6px_20px_rgba(0,0,0,0.4),inset_0px_1px_3px_rgba(255,255,255,0.2),inset_0px_-1px_3px_rgba(0,0,0,0.3)]
                    transition-all duration-300 ease-out font-medium tracking-wide
                    ${
                      isButtonLoading
                        ? "px-16 py-5 text-xl"
                        : "px-12 py-4 text-base"
                    }`}
                  onClick={() => handleClick(item.path)}
                  disabled={isButtonLoading}
                  aria-label={item.text}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isButtonLoading ? (
                      <>
                        <ClipLoader
                          color="#2a0040"
                          loading={true}
                          size={20}
                          aria-label="Loading"
                          className="mr-2"
                        />
                        Loading...
                      </>
                    ) : (
                      item.text
                    )}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 h-px w-3/4 mx-auto bg-[var(--text-color)] opacity-70"></span>
                  <span className="absolute inset-x-0 -bottom-1 h-2 w-4/5 mx-auto opacity-0 group-hover:opacity-80 transition-all duration-500 blur-md bg-[var(--text-color)]"></span>
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeWithTheme;
