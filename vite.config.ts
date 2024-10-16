/// <reference types="vite/client" />

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

import { loadEnv } from "vite";

export default defineConfig((env) => {
  const viteEnv = loadEnv(env.mode, process.cwd()) as unknown as ImportMetaEnv;
  return {
    plugins: [
      vue({
        script: {
          defineModel: true,
          propsDestructure: true,
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // ... 其他配置
    server: {
      host: "0.0.0.0",
      port: 3062,
      proxy: {
        "/api": {
          target: viteEnv.VITE_API_BASE_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
