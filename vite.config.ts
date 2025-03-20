import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import env from 'dotenv'

env.config()

export default defineConfig({
  plugins: [vue()],
  server: {
    port: Number(process.env.PORT) || 3000,
    host: process.env.HOST || '0.0.0.0',
  }
})
