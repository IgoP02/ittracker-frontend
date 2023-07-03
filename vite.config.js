import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactRefreshPlugin from "eslint-plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), "react-refresh"],
  rules: {
    "react-refresh/only-export-components": "warn",
  },
  server: {
    port: "3000",
    host: "ittracker.test",
  },
});
