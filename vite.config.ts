import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
const globalShim = `globalThis.global = globalThis;`
export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  define: {
    global: 'globalThis'
  },
  esbuild: {
    banner: globalShim
  },
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: 'dist/stats.html', // đường dẫn xuất file HTML
      open: true, // tự động mở file sau khi build xong
      gzipSize: true, // hiển thị thêm kích thước sau nén gzip
      brotliSize: true // hiển thị thêm kích thước sau nén brotli
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
