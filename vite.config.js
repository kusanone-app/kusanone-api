// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';
import copy from 'rollup-plugin-copy';

export default defineConfig({
   build: {
      outDir: 'dist',
      target: 'node16',
      lib: {
         entry: path.resolve(__dirname, 'index.js'),
         formats: ['cjs'],
         fileName: () => 'index.js' // ← これで固定名にする      
      },
      rollupOptions: {
         external: [
            'express',
            'dotenv',
            'cookie-parser',
            'joi',
            'mysql2'
         ],
      },
   },
   plugins: [
      copy({
         targets: [
            { src: 'routes', dest: 'dist' },
            { src: 'controllers', dest: 'dist' },
            { src: 'models', dest: 'dist' },
            { src: 'utils', dest: 'dist' },
            { src: 'middleware', dest: 'dist' }, // ← ここを追加            
            { src: '.env.development', dest: 'dist' }
         ],
         hook: 'writeBundle'
      })
   ]
});
