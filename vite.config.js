import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [react(), tailwindcss(), nodePolyfills()],
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  define: {
    "process.env": {},
  },
  optimizeDeps: {
    include: ["buffer", "process"],
  },
});
