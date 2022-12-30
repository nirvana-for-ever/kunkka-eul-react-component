import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'Nirvana',
    nav: [
      { title: '指南', link: '/guide' },
      { title: '组件', link: '/components/index' }
    ]
  },
  base: '/react/',
  publicPath: '/react/'
});
