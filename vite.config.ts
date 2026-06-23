import { defineConfig } from 'vite';
import pkg from './package.json';

const banner = `/*! @${pkg.author}/${pkg.name} version:${pkg.version} repository:${pkg.repository.url} copyright:${pkg.author} licensed:${pkg.license} */`;
const multilineTemplateFiles = [
  '/src/dom/view-dom.ts',
  '/src/dom/view-style.ts',
  '/src/player/player-renderer.ts',
];

function compactMultilineTemplateLiterals(code: string): string {
  return code.replace(/`((?:\\[\s\S]|[^`])*)`/g, (template, content: string) => {
    if(!content.includes('\n')) return template;

    const compacted = content.replace(/\s*\r?\n\s*/g, ' ').trim();
    return `\`${compacted}\``;
  });
}

export default defineConfig({
  plugins: [
    {
      name: 'compact-multiline-templates',
      enforce: 'pre',
      transform(code, id) {
        const filePath = id.split('?')[0].replace(/\\/g, '/');
        if(!multilineTemplateFiles.some((target) => filePath.endsWith(target))) return;

        return {
          code: compactMultilineTemplateLiterals(code),
          map: null,
        };
      }
    },
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
