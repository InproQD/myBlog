import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      react(),
      eslintPlugin({
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/*.ts', 'src/*.tsx']
      })
    ],
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  }
})
