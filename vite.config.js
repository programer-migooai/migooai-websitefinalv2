import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  build: {
    assetsInlineLimit: 0,              // לא ינסה inline קבצים כבדים
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  plugins: [
    react(),
    svgr({
      include: 'src/components/**/*.svg',
      exclude: 'src/assets/images/**/*.svg',
      exportAsDefault: true,
    }),
    imagetools(),
  ],
});
