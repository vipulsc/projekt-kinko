import React, { useState, useRef } from "react";
import HeaderComponent from "./HeaderComponent";
import { recoverMultipleWallets } from "../services/import";
import {
  EyeIcon,
  EyeOffIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

const SeedPhraseInput = ({ onSeedReady }) => {
  const [words, setWords] = useState(Array(12).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    const updatedWords = [...words];
    updatedWords[index] = value.trim();
    setWords(updatedWords);
    const joined = updatedWords.join(" ").trim();
    if (onSeedReady) onSeedReady(joined);
  };

  const handlePaste = (e, index) => {
    e.preventDefault();
    const pasteText = e.clipboardData.getData("text").trim();
    processPastedText(pasteText, index);
  };

  const processPastedText = (pasteText, startIndex = 0) => {
    const splitWords = pasteText.split(/\s+/).slice(0, 12);
    const updatedWords = [...words];
    splitWords.forEach((word, i) => {
      if (startIndex + i < 12) {
        updatedWords[startIndex + i] = word;
        if (inputRefs.current[startIndex + i]) {
          inputRefs.current[startIndex + i].value = word;
        }
      }
    });
    setWords(updatedWords);
    if (onSeedReady) onSeedReady(updatedWords.join(" "));
  };

  const handlePasteButtonClick = async () => {
    try {
      const text = await navigator.clipboard.readText();
      processPastedText(text, 0);
    } catch (error) {
      console.error("Failed to read clipboard: ", error);
      alert(
        "Unable to access clipboard. Please check your browser permissions."
      );
    }
  };

  return (
    <div className="p-4 w-full">
      <div className="flex justify-center mb-4">
        <button
          onClick={handlePasteButtonClick}
          className="px-4 py-2 text-sm bg-[var(--accent)] text-[var(--dark-text)] rounded-md hover:opacity-90 focus:outline-none focus:ring-1 focus:ring-opacity-50 shadow-sm cursor-pointer font-medium"
        >
          Paste Seed Phrase
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {words.slice(0, 6).map((word, index) => (
          <input
            key={index}
            type="text"
            value={word}
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleChange(index, e.target.value)}
            onPaste={(e) => handlePaste(e, index)}
            placeholder={`${index + 1} .`}
            className="px-2 py-2 text-center text-sm border border-[var(--dark-text)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)] bg-[var(--lighter-text)]  text-[var(--text-color)]"
          />
        ))}

        {words.slice(6).map((word, index) => (
          <input
            key={index + 6}
            type="text"
            value={word}
            ref={(el) => (inputRefs.current[index + 6] = el)}
            onChange={(e) => handleChange(index + 6, e.target.value)}
            onPaste={(e) => handlePaste(e, index + 6)}
            placeholder={`${index + 7} .`}
            className="px-2 py-2 text-center text-sm border border-[var(--dark-text)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)] bg-[var(--lighter-text)]  text-[var(--text-color)]"
          />
        ))}
      </div>
    </div>
  );
};

const ImportWalletPage = () => {
  const [seed, setSeed] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentWalletIndex, setCurrentWalletIndex] = useState(0);
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState({});

  const handleSeedChange = (combinedSeed) => {
    setSeed(combinedSeed);
  };

  const togglePrivateKeyVisibility = (index) => {
    setShowPrivateKey((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleSubmit = async () => {
    if (!seed || seed.trim().split(/\s+/).length < 12) {
      setErrorDisplay(true);
      return;
    }

    setLoading(true);
    setErrorDisplay(false);

    try {
      const results = await recoverMultipleWallets(seed, 5);
      setResult(results);
      setCurrentWalletIndex(0);
      console.log("Recovered wallets:", results);
    } catch (error) {
      console.error("Error recovering wallets:", error);
      setErrorDisplay(true);
    } finally {
      setLoading(false);
    }
  };

  const goToPreviousWallet = () => {
    if (currentWalletIndex > 0) {
      setCurrentWalletIndex(currentWalletIndex - 1);
    }
  };

  const goToNextWallet = () => {
    if (currentWalletIndex < result.length - 1) {
      setCurrentWalletIndex(currentWalletIndex + 1);
    }
  };

  const currentWallet = result[currentWalletIndex];

  return (
    <div>
      <HeaderComponent />
      <div className="min-h-screen pt-35 items-center justify-center flex flex-col">
        <div className="flex-1 flex flex-col items-center  px-1 py-4">
          <div className="w-full max-w-7xl border-2 border-[var(--accent)] text-[var(--text-color)] shadow-xl rounded-xl overflow-hidden mb-8">
            <div className="px-6 py-8">
              <h2 className="text-2xl font-bold mb-6 text-[var(--text-color)] text-center">
                Import Your Wallet
              </h2>
              <p className="text-[var(--text-color)] mb-6 text-center">
                Enter your 12-word seed phrase to recover your wallet
              </p>

              <div
                className={`flex flex-col ${
                  result.length > 0 ? "md:flex-row gap-10" : ""
                } transition-all duration-500`}
              >
                <div className="md:w-2/5 w-full">
                  <SeedPhraseInput onSeedReady={handleSeedChange} />

                  {errorDisplay && (
                    <div className="mt-4 p-3 text-center bg-red-200 border border-red-400 text-red-800 rounded-md text-sm italic">
                      Invalid seed phrase. Please check your input and try
                      again.
                    </div>
                  )}

                  <div className="flex justify-center mt-6">
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className={`px-6 py-3 cursor-pointer bg-amber-500  text-[var(--text-color)] rounded-xl font-semibold shadow-md hover:bg-amber-600 transition flex items-center justify-center min-w-40 ${
                        loading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {loading ? (
                        <span className="inline-block animate-spin mr-2">
                          ⟳
                        </span>
                      ) : null}
                      {loading ? "Recovering..." : "Import Wallet"}
                    </button>
                  </div>
                </div>

                {result.length > 0 && (
                  <div className="md:w-3/5 w-full border-t md:border-t-0 md:border-l border-gray-300 dark:border-gray-700 pt-6 md:pt-0 md:pl-6">
                    <h3 className="text-lg font-semibold mb-4 tracking-wide  text-[--text-color">
                      Recovered Wallets{" "}
                      <span className="text-sm font-normal text-[var(--accent)]">
                        ({currentWalletIndex + 1} of {result.length})
                      </span>
                    </h3>

                    <div className="bg-[var(--dark-text)] p-4 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <button
                          onClick={goToPreviousWallet}
                          disabled={currentWalletIndex === 0}
                          className={`p-2 rounded-full cursor-pointer ${
                            currentWalletIndex === 0
                              ? "text-[gray-400] cursor-not-allowed"
                              : "text-amber-500 hover:bg-gray-200 dark:hover:bg-gray-600"
                          }`}
                        >
                          <ChevronLeftIcon size={24} />
                        </button>
                        <div className="text-center text-[var(--text-color)] font-medium">
                          Wallet {currentWallet?.index}
                        </div>
                        <button
                          onClick={goToNextWallet}
                          disabled={currentWalletIndex === result.length - 1}
                          className={`p-2 cursor-pointer rounded-full ${
                            currentWalletIndex === result.length - 1
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-amber-500 hover:bg-gray-200 dark:hover:bg-gray-600"
                          }`}
                        >
                          <ChevronRightIcon size={24} />
                        </button>
                      </div>

                      {currentWallet && (
                        <div className="space-y-4">
                          <div className="bg-[var(--lighter-text)] p-4 rounded-lg shadow">
                            <div className="flex justify-between items-center mb-2">
                              <div className="text-sm font-medium text-[var(--text-color)]">
                                Public Key
                              </div>
                            </div>
                            <div className="font-mono selection:bg-[var(--accent)] text-[var(--dark-text)] tracking-wide text-sm break-all bg-[var(--box-shade)] p-2 rounded border border-[--text-color]">
                              {currentWallet.publicKey}
                            </div>
                          </div>

                          <div className="bg-[var(--lighter-text)] p-4 rounded-lg shadow">
                            <div className="flex justify-between items-center mb-2">
                              <div className="text-sm font-medium text-[var(--text-color)]">
                                Private Key
                              </div>
                              <button
                                onClick={() =>
                                  togglePrivateKeyVisibility(currentWalletIndex)
                                }
                                className="text-[var(--accent)] hover:text-gray-700  focus:outline-none"
                              >
                                {showPrivateKey[currentWalletIndex] ? (
                                  <EyeOffIcon size={16} />
                                ) : (
                                  <EyeIcon size={16} />
                                )}
                              </button>
                            </div>
                            <div className="font-mono selection:bg-[var(--accent)] text-[var(--dark-text)] tracking-wide text-sm break-all bg-[var(--box-shade)] p-2 rounded border border-[--text-color]">
                              {showPrivateKey[currentWalletIndex]
                                ? currentWallet.privateKey
                                : "••••••••••••••••••••••••••••••••"}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportWalletPage;
