import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/resume/to do list/pro-4-with-vite/',
  plugins: [react()],
})
