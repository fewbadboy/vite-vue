import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import { resolve } from "node:path";
import { base } from "./src/settings";

// https://vitejs.dev/config/
export default defineConfig({
  base,
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
  assetsInclude: ["**/*.glb"],
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
  ],
  server: {
    // host: '0.0.0.0',
    proxy: {
      "/review": {
        target: "http://172.21.9.194:7861",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/review/, "/review"),
      },
      "/socket.io": {
        target: "ws://172.21.9.194:7861/review/ws",
        ws: true,
      },
    },
  },
});
