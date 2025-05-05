import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import * as ed25519 from "ed25519-hd-key";
import {
  EyeIcon,
  EyeOffIcon,
  ClipboardIcon,
  PlusIcon,
  AlertCircleIcon,
  XIcon,
} from "lucide-react";
import HeaderComponent from "./HeaderComponent";

const generateMnemonic = () => bip39.generateMnemonic(128);

const generateWalletFromMnemonic = async (mnemonic, index) => {
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const path = `m/44'/501'/${index}'/0'`;
  const derived = ed25519.derivePath(path, seed.toString("hex"));
  return Keypair.fromSeed(derived.key);
};

const WalletGenerator = () => {
  const [mnemonic, setMnemonic] = useState("");
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [revealMnemonic, setRevealMnemonic] = useState(false);
  const [notification, setNotification] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);

  const showMessage = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 2500);
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const phrase = generateMnemonic();
      setMnemonic(phrase);
      setRevealMnemonic(false);
      const keypair = await generateWalletFromMnemonic(phrase, 0);
      setWallets([
        {
          index: 0,
          publicKey: keypair.publicKey.toBase58(),
          secretKey: Buffer.from(keypair.secretKey).toString("hex"),
          path: `m/44'/501'/0'/0'`,
        },
      ]);
      setActiveIndex(0);
    } catch {
      showMessage("Error generating wallet");
    } finally {
      setLoading(false);
    }
  };

  const handleNewWallet = async () => {
    if (!mnemonic) return;
    if (wallets.length >= 6) {
      showMessage("⚠️ Max 6 wallets allowed per mnemonic.");
      return;
    }
    setLoading(true);
    try {
      const nextIndex = wallets.length;
      const keypair = await generateWalletFromMnemonic(mnemonic, nextIndex);
      setWallets((prev) => [
        ...prev,
        {
          index: nextIndex,
          publicKey: keypair.publicKey.toBase58(),
          secretKey: Buffer.from(keypair.secretKey).toString("hex"),
          path: `m/44'/501'/${nextIndex}'/0'`,
        },
      ]);
      setActiveIndex(nextIndex);
    } catch {
      showMessage("Error generating new wallet");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    try {
      navigator.clipboard.writeText(text);
      showMessage("Copied to clipboard!");
    } catch (err) {
      showMessage("Failed to copy. Try manually.");
    }
  };

  const ConfirmRevealModal = () => (
    <AnimatePresence>
      {confirmModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white dark:bg-[var(--lighter-text)] p-6 rounded-2xl shadow-2xl w-[90%] max-w-md"
          >
            <div className="flex items-start gap-3">
              <AlertCircleIcon className="text-red-500" />
              <div>
                <h2 className="text-lg font-semibold text-[var(--text-color)] mb-1">
                  Reveal Recovery Phrase?
                </h2>
                <p className="text-sm text-[var(--text-color)]">
                  ⚠️ Make sure no one is watching your screen before proceeding.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setConfirmModal(false)}
                className="text-sm px-4 py-2 rounded-xl bg-gray-300 dark:bg-[var(--box-shade)] text-black dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setRevealMnemonic(true);
                  setConfirmModal(false);
                }}
                className="text-sm px-4 py-2 rounded-xl bg-[var(--accent)] text-[var(--dark-text)] hover:opacity-90"
              >
                Reveal
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const NotificationToast = () => (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="fixed top-4 right-4 z-[9999] bg-[var(--accent)] text-[var(--dark-text)] px-5 py-2 rounded-xl shadow-lg max-w-[90vw] text-sm"
        >
          {notification}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <HeaderComponent />
      <ConfirmRevealModal />
      <NotificationToast />

      <div className="mx-auto mt-20 px-5 md:px-40 lg:px-60 py-20 font-lora">
        <div className="text-center mb-10">
          <motion.button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-[var(--accent)] text-[var(--dark-text)] px-6 py-3 rounded-xl text-lg font-medium hover:opacity-90 transition-all disabled:opacity-50"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Generating..." : "Create New Wallet"}
          </motion.button>
        </div>

        {mnemonic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[var(--lighter-text)] p-6 rounded-2xl shadow-xl mb-10 backdrop-blur-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recovery Phrase</h2>
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    revealMnemonic
                      ? setRevealMnemonic(false)
                      : setConfirmModal(true)
                  }
                  className="text-[var(--text-color)] cursor-pointer hover:text-[var(--accent)] focus:outline-none"
                >
                  {revealMnemonic ? (
                    <EyeOffIcon size={20} />
                  ) : (
                    <EyeIcon size={20} />
                  )}
                </button>
                <button
                  onClick={() => copyToClipboard(mnemonic)}
                  className="text-[var(--text-color)] cursor-pointer hover:text-[var(--accent)] focus:outline-none"
                >
                  <ClipboardIcon size={20} />
                </button>
              </div>
            </div>

            {revealMnemonic ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {mnemonic.split(" ").map((word, i) => (
                  <div
                    key={i}
                    className="bg-[var(--text-color)] text-[var(--dark-text)] px-3 py-2 rounded-lg text-md flex items-center"
                  >
                    <span className="mr-2">{i + 1}.</span> {word}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[var(--box-shade)] py-8 rounded-lg text-center text-[var(--dark-text)]">
                Click eye icon to reveal phrase
              </div>
            )}
          </motion.div>
        )}

        {wallets.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[var(--lighter-text)] text-[var(--dark-text)] p-6 rounded-2xl shadow-xl space-y-8 backdrop-blur-sm"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {wallets.map((wallet, i) => (
                <button
                  key={wallet.index}
                  onClick={() => setActiveIndex(i)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium ${
                    i === activeIndex
                      ? "bg-[var(--accent)] text-[var(--dark-color)] "
                      : "bg-[var(--dark-text)]  text-[var(--text-color)] cursor-pointer"
                  }`}
                >
                  Wallet #{wallet.index}
                </button>
              ))}
              <button
                onClick={handleNewWallet}
                disabled={loading || wallets.length >= 6}
                className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  wallets.length >= 6
                    ? "text-red-400 cursor-not-allowed"
                    : "bg-[var(--accent)] text-white hover:bg-blue-700 cursor-pointer "
                }`}
              >
                <PlusIcon size={16} />
                Add
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-[var(--text-color)]">
                    Public Key
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(wallets[activeIndex].publicKey)
                    }
                    className="text-[var(--text-color)] hover:text-[var(--accent)] cursor-pointer transition-colors"
                  >
                    Copy
                  </button>
                </div>
                <div className="font-mono text-sm break-all bg-[var(--box-shade)] p-2 rounded border border-[--text-color]">
                  {wallets[activeIndex].publicKey}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-[var(--text-color)]">
                    Private Key
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowSecret(!showSecret)}
                      className="text-[var(--text-color)] hover:text-[var(--accent)] cursor-pointer"
                    >
                      {showSecret ? (
                        <EyeOffIcon size={20} />
                      ) : (
                        <EyeIcon size={20} />
                      )}
                    </button>
                    <button
                      onClick={() =>
                        copyToClipboard(wallets[activeIndex].secretKey)
                      }
                      className="text-[var(--text-color)] hover:text-[var(--accent)] cursor-pointer"
                    >
                      <ClipboardIcon size={20} />
                    </button>
                  </div>
                </div>
                <div className="font-mono text-sm break-all bg-[var(--box-shade)] p-2 rounded border border-[--text-color]">
                  {showSecret ? (
                    wallets[activeIndex].secretKey
                  ) : (
                    <span className="select-none block overflow-hidden text-ellipsis text-[var(--dark-text)]">
                      ••••••••••••••••••••••••••••••••••••••••
                    </span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-[var(--text-color)] font-medium block mb-2">
                  Derivation Path
                </span>
                <div className="font-mono text-sm break-all bg-[var(--box-shade)] p-2 rounded border border-[--text-color]">
                  {wallets[activeIndex].path}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default WalletGenerator;
