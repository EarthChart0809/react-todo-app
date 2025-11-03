import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// ESM では dirname を自作する必要あり
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./", 
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(dirname, "index.html"),
        ...(fs.existsSync(path.resolve(dirname, "404.html"))
          ? { "404": path.resolve(dirname, "404.html") }
        : {}),
      },
    },
  },
  server: {
    port: 3000,
    strictPort: false,
    open: true,
  },
});