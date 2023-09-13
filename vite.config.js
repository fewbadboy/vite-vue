import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/vite/",
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
    modules: {
      localsConvention: "camelCase",
    },
  },
  assetsInclude: ["**/*.glb"],
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: "",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/socket.io": {
        target: "ws://localhost:8000",
        ws: true,
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {},
  },
  build: {
    rollupOptions: {
      // https://rollupjs.org/configuration-options/
    },
    commonjsOptions: {
      // convert CommonJS modules to ES6
    },
    dynamicImportVarsOptions: {
      // support variables in dynamic imports
    },
  },
});
