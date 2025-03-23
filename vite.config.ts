import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import env from 'dotenv'
import tailwindcss from '@tailwindcss/vite'

env.config()

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss()
  ],
  server: {
    port: Number(process.env.PORT) || 3000,
    host: process.env.HOST || '0.0.0.0',
  }
})
