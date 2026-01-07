import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), dts({ include: ['src'] })],
  build: {
    lib: {
      entry: {
        'guardian-widget': resolve(__dirname, 'src/index.ts'),
        'web-component': resolve(__dirname, 'src/web-component.ts'),
      },
      formats: ['es', 'umd'],
      name: 'GuardianWidget',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})