import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      react({
        include: [/\.tsx$/, /\.md$/]
      }),
      eslintPlugin({
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/*.ts', 'src/*.tsx', 'src/*.md']
      })
    ],
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    // server: {
    //   proxy: {
    //     '/api': {
    //       target: 'http://123.207.40.28',
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/api/, '')
    //     }
    //   }
    // },
    assetsInclude: ['**/*.md']
  }
})
