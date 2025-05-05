// import { Keypair } from "@solana/web3.js";
// import * as bip39 from "bip39";
// import * as ed25519 from "ed25519-hd-key";

// // Generate 12-word mnemonic (128-bit strength)
// export const generateMnemonic = () => {
//   return bip39.generateMnemonic(128);
// };

// export const generateWalletFromMnemonic = async (mnemonic, index) => {
//   if (!bip39.validateMnemonic(mnemonic)) {
//     throw new Error("Invalid mnemonic phrase");
//   }

//   const seed = await bip39.mnemonicToSeed(mnemonic);
//   const path = `m/44'/501'/${index}'/0'`;
//   const derivedKey = ed25519.derivePath(path, seed.toString("hex"));
//   const keypair = Keypair.fromSeed(derivedKey.key);

//   return {
//     index,
//     publicKey: keypair.publicKey.toBase58(),
//     secretKey: Buffer.from(keypair.secretKey).toString("hex"),
//     derivePath: path,
//   };
// };

// export const copyToClipboard = async (text) => {
//   try {
//     await navigator.clipboard.writeText(text);
//     return true;
//   } catch (error) {
//     console.error("Clipboard write failed:", error);
//     return false;
//   }
// };
// {not used }
