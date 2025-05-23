import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Github } from "lucide-react";

const Footer = () => {
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowFooter(scrollY < 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {showFooter && (
        <motion.footer
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 w-full bg-[var(--lighter-text)] backdrop-blur-md border-t border-white/10 px-4 py-1.5 flex justify-between items-center z-50 text-xs md:text-sm"
        >
          <motion.a
            href="https://github.com/vipulsc"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.85 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="opacity-80 hover:opacity-100 transition-all"
          >
            <Github className="w-6 h-6" />
          </motion.a>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="px-2 py-0.5 border border-[var(--gradienta)]/20 rounded-full text-[0.65rem] md:text-xs opacity-80 backdrop-blur-sm hover:opacity-100 hover:border-white/40 transition-all"
          >
            v1.0
          </motion.div>

          <motion.a
            href="https://x.com/vipulsc1"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: -2 }}
            whileTap={{ scale: 0.85 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="opacity-80 hover:opacity-100 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              className="w-6 h-6"
              fill="currentColor"
            >
              <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z" />
            </svg>
          </motion.a>
        </motion.footer>
      )}
    </AnimatePresence>
  );
};

export default Footer;
