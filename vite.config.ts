import { defineConfig } from 'vite';
import pkg from './package.json';

const banner = `/*! @${pkg.author}/${pkg.name} version:${pkg.version} repository:${pkg.repository.url} copyright:${pkg.author} licensed:${pkg.license} */`;

export default defineConfig({
  plugins: [
    {
      name: 'prepend-license-banner',
      generateBundle(_, bundle) {
        Object.values(bundle).forEach((chunk) => {
          if (chunk.type === 'chunk' && !chunk.code.startsWith(banner)) {
            chunk.code = `${banner}\n${chunk.code}`;
          }
        });
      }
    }
  ],
  define: {
    'process.env.VERSION': JSON.stringify(pkg.version),
    'process.env.DEBUG': 'false'
  },
  build: {
    target: 'es2015',
    lib: {
      entry: './src/index.ts',
      name: 'PLAYER_MODULE_BRIGHTCOVE',
      formats: ['umd'],
      fileName: () => 'js-player-module-brightcove.js'
    },
    rollupOptions: {
      output: {
        banner,
        exports: 'default'
      }
    }
  }
});
