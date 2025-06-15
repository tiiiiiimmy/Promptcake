import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Copy manifest.json and other static files to dist
function copyStaticFiles() {
  return {
    name: 'copy-static-files',
    closeBundle() {
      // Copy manifest.json
      fs.copyFileSync('manifest.json', 'dist/manifest.json');
      
      // Copy background.js if exists
      if (fs.existsSync('src/background/index.ts')) {
        if (fs.existsSync('dist/assets/background.js')) {
          fs.copyFileSync('dist/assets/background.js', 'dist/background.js');
        }
      }

      // Create icons directory if it doesn't exist
      if (!fs.existsSync('dist/icons')) {
        fs.mkdirSync('dist/icons', { recursive: true });
      }

      // Copy icons if they exist
      if (fs.existsSync('public/icons')) {
        fs.readdirSync('public/icons').forEach(file => {
          if (file.endsWith('.png')) {
            fs.copyFileSync(
              path.join('public/icons', file),
              path.join('dist/icons', file)
            );
          }
        });
      }

      // Move HTML files to dist root
      if (fs.existsSync('dist/src/pages/popup/index.html')) {
        fs.copyFileSync('dist/src/pages/popup/index.html', 'dist/popup.html');
      }
      if (fs.existsSync('dist/src/pages/options/index.html')) {
        fs.copyFileSync('dist/src/pages/options/index.html', 'dist/options.html');
      }
    }
  };
}

// 动态生成 input 配置，避免 undefined
function getRollupInput() {
  const input = {
    popup: 'src/pages/popup/index.html',
    options: 'src/pages/options/index.html',
    content: 'src/content/index.ts',
    'content.css': 'src/content/styles.css',
  };
  if (fs.existsSync('src/background/index.ts')) {
    input['background'] = 'src/background/index.ts';
  }
  return input;
}

export default defineConfig({
  base: './',
  plugins: [react(), copyStaticFiles()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: getRollupInput(),
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
}); 