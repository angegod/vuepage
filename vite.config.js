import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import VitePluginPrerender from 'vite-plugin-prerender';

export default defineConfig({
  base: '/vuepage/', // 設定基礎路徑
  plugins: [
    vue(),
    VitePluginPrerender({
      staticDir: path.resolve(__dirname, 'dist'), // 指定輸出目錄
      routes: [
        '/', 
        '/about', 
        '/battle', 
        '/card', 
        '/King'
      ]
    })
  ],
  build: {
    rollupOptions: {
      output: {
        // 啟用文件名哈希
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
