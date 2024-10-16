import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // ... 其他配置
  server: {
    host: '0.0.0.0',
    port: 3062,
    proxy: {
      '/api': {
        target: 'http://localhost:9090',
        changeOrigin: true,
      }
    }
  }
})
