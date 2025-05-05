import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import * as ed25519 from "ed25519-hd-key";

export async function recoverSolanaWallet(mnemonic, accountIndex) {
  console.log(mnemonic);
  const words = mnemonic.trim().split(" ");

  if (words.length !== 12 && words.length !== 24) {
    throw new Error(`Invalid word count: ${words.length}`);
  }

  const invalidWords = words.filter(
    (word) => !bip39.wordlists.english.includes(word)
  );

  if (invalidWords.length > 0) {
    throw new Error(`Invalid BIP-39 words: ${invalidWords.join(", ")}`);
  }

  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error("Invalid mnemonic phrase");
  }

  const seed = await bip39.mnemonicToSeed(mnemonic);
  const derivePath = `m/44'/501'/${accountIndex}'/0'`;
  const derived = ed25519.derivePath(derivePath, seed.toString("hex"));
  const derivedKey = Buffer.from(derived.key, "hex");
  const solanaSeed = derivedKey.subarray(0, 32);
  const keypair = Keypair.fromSeed(solanaSeed);

  return {
    index: accountIndex,
    publicKey: keypair.publicKey.toString(),
    privateKey: Buffer.from(keypair.secretKey).toString("hex"),
  };
}
export async function recoverMultipleWallets(mnemonic, endIndex) {
  console.log(mnemonic);
  const cleanedMnemonic = mnemonic
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\s+/g, " ")
    .replace(/[^a-z ]/g, "");

  const words = cleanedMnemonic.split(" ");
  const invalidWords = words.filter(
    (word) => !bip39.wordlists.english.includes(word)
  );

  if (words.length !== 12 && words.length !== 24) {
    throw new Error(`Invalid mnemonic length: ${words.length}`);
  }

  if (invalidWords.length > 0) {
    throw new Error(`Invalid BIP-39 words: ${invalidWords.join(", ")}`);
  }

  if (!bip39.validateMnemonic(cleanedMnemonic)) {
    throw new Error("Invalid mnemonic phrase");
  }

  const wallets = [];
  for (let i = 0; i <= endIndex; i++) {
    const wallet = await recoverSolanaWallet(cleanedMnemonic, i);
    wallets.push(wallet);
  }

  return wallets;
}

// const testkey =
//   "ripple question flag nest snake weapon lamp orange carry entire twice knock";
// const result = await recoverMultipleWallets(testkey, 0);
// console.log(result);
