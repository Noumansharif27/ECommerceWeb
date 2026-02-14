import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 5173,
    allowedHosts: [
      "testingly-erective-sofia.ngrok-free.dev",
      "uncongruous-shiveringly-linwood.ngrok-free.dev",
      "https://biuniquely-nonconstrictive-chery.ngrok-free.dev",
    ],
  },
});
