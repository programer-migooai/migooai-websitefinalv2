import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from '@svgr/rollup'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  build: {
    // 0 = never inline any asset; always emit as separate file
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        // put them under /assets so you can see them in the build
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },

  plugins: [
    // 1. React support
    react(),

    // 2. SVGR only for SVGs in your `src/components` folder:
    svgr({
      include: 'src/components/**/*.svg',
      exclude: 'src/assets/images/**/*.svg',
      exportAsDefault: true,
    }),

    // 3. All other images (PNG/JPG/large SVGs) get emitted as files
    imagetools(),
  ],
})
