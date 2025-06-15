import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// ✅ 拷贝静态资源（manifest.json、icons、HTML）
function copyStaticFiles() {
  return {
    name: 'copy-static-files',
    closeBundle() {
      // Copy manifest.json
      fs.copyFileSync('manifest.json', 'dist/manifest.json');

      // Move compiled background.js if needed
      if (fs.existsSync('src/background/index.ts')) {
        if (fs.existsSync('dist/assets/background.js')) {
          fs.copyFileSync('dist/assets/background.js', 'dist/background.js');
        }
      }

      // Copy icons
      const iconSrcDir = 'public/icons';
      const iconDistDir = 'dist/icons';
      if (!fs.existsSync(iconDistDir)) {
        fs.mkdirSync(iconDistDir, { recursive: true });
      }
      if (fs.existsSync(iconSrcDir)) {
        fs.readdirSync(iconSrcDir).forEach(file => {
          if (file.endsWith('.png') || file.endsWith('.svg')) {
            fs.copyFileSync(path.join(iconSrcDir, file), path.join(iconDistDir, file));
          }
        });
      }

      // Copy popup.html & options.html
      const pages = ['popup', 'options'];
      pages.forEach(page => {
        const inputPath = `dist/src/pages/${page}/index.html`;
        const outputPath = `dist/${page}.html`;
        if (fs.existsSync(inputPath)) {
          fs.copyFileSync(inputPath, outputPath);
        }
      });
    },
  };
}

// ✅ 动态 rollup input 配置
function getRollupInput() {
  const input: Record<string, string> = {
    popup: 'src/pages/popup/index.html',
    options: 'src/pages/options/index.html',
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
    emptyOutDir: true,
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
