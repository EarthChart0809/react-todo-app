import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const repositoryName = "react-todo-app";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.NODE_ENV === "production" ? `/${repositoryName}/` : "/",
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(dirname, "index.html"),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});