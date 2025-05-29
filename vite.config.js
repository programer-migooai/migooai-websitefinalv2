import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  build: {
    // Prevent inlining of large assets to avoid OOM during build
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        // Emit all assets under a dedicated folder for clarity
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  },
  plugins: [
    // React support
    react(),
    // Import SVGs in src/components as React components
    svgr({
      include: 'src/components/**/*.svg',
      exclude: 'src/assets/images/**/*.svg',
      exportAsDefault: true
    }),
    // Emit all other images (PNG/JPG/large SVGs) as files
    imagetools()
  ]
});
