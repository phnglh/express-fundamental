import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { en as enThemeConfig } from './config/theme/en.config.js';
import { vi as viThemeConfig } from './config/theme/vi.config.js';
export default defineUserConfig({
  lang: 'en-US',
  title: 'Express Fundamental',
  description: 'Express Fundamental',
  base: '/express-fundamental/',
  bundler: viteBundler(),
  markdown: {
    toc: {
      level: [2, 3, 4, 5],
    },
  },
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Express Fundamental 🎉',
    },
    '/vi/': {
      lang: 'vi-VN',
      title: 'Express Fundamental 🎉',
    },
  },
  theme: defaultTheme({
    repo: 'phnglh/express-fundamental',
    docsBranch: 'main',
    docsDir: 'docs',
    locales: {
      '/': enThemeConfig,
      '/vi/': viThemeConfig,
    },
  }),
})
