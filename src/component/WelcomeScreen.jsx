import { motion } from "motion/react";
export default function WelcomeScreen() {
  return (
    <>
      <div>
        <motion.div
          initial={{ opacity: [0, 0.5] }}
          animate={{ opacity: [1, 0.5, 1] }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-[var(--light-bg)] dark:bg-[var(--dark-bg)] text-white flex items-center justify-center"
        >
          <motion.div
            initial={{ y: -500 }}
            animate={{ y: -50 }}
            transition={{ duration: 1.2 }}
            drag
            dragConstraints={{ left: 0, right: 300 }}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 900, bounceDamping: 15 }}
            dragSnapToOrigin
            className="text-[var(--text-color)] text-center text-5xl lg:text-6xl"
          >
            <span>
              Welcome to{" "}
              <span className="japanese-text text-[var(--accent)]">金庫</span>
            </span>

            <p className="text-xl text-[var(--text-color)] lg:text-2xl mt-4">
              Your assets, safeguarded.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
