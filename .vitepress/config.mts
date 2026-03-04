import { defineConfigWithTheme } from 'vitepress'
import type { ThemeConfig } from '@hempworks/pilgrim'
import config from '@hempworks/pilgrim/config'

export default defineConfigWithTheme<ThemeConfig>({
  extends: config,
  lang: 'en-US',
  title: "NovaSend API",
  description: "NovaSend API documentation",
  cleanUrls: false,
  lastUpdated: true,
  appearance: false,
  base: '/',
  srcDir: 'src',

  sitemap: {
    hostname: 'https://novasend.app',
    transformItems(items) {
      return items.filter((item) => !item.url.includes('migration'))
    }
  },

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200;0,6..12,300;0,6..12,400;0,6..12,500;0,6..12,600;0,6..12,700;0,6..12,800;0,6..12,900;0,6..12,1000;1,6..12,200;1,6..12,300;1,6..12,400;1,6..12,500;1,6..12,600;1,6..12,700;1,6..12,800;1,6..12,900;1,6..12,1000&display=swap',
      },
    ],

    ['link', {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: 'https://assets.novasend.app/meta/apple-touch-icon.png',
    }],
    ['link', {
      rel: 'icon',
      sizes: '16x16',
      type: 'image/png',
      href: 'https://assets.novasend.app/meta/favicon-16x16.png',
    }],
    ['link', {
      rel: 'icon',
      sizes: '32x32',
      type: 'image/png',
      href: 'https://assets.novasend.app/meta/favicon-32x32.png',
    }],
    ['link', {
      rel: 'manifest',
      href: 'https://assets.novasend.app/meta/site.webmanifest',
    }],
    ['link', {
      rel: 'mask-icon',
      href: 'https://assets.novasend.app/meta/safari-pinned-tab.svg',
      color: '#001D3D'
    }],
    ['meta', {
      name: 'msapplication-TileColor',
      content: '#001D3D',
    }],
  ],

  themeConfig: {
    githubUrl: 'https://github.com/novasend',

    logo: {
      light: '/logo.svg',
      dark: '/logo.svg',
    },

    versions:[
      { text: 'v1.0', link: '/1.0/', current: true },
    ],

    nav: [
      { text: 'Website', link: 'https://novasend.app' },
      { text: 'Portal', link: 'https://portal.novasend.app' },
      {
        text: 'Payment',
        link: '/transaction/payment',
        activeMatch: '/transaction/'
      },
      {
        text: 'Transfer',
        link: '/transaction/transfer',
        activeMatch: '/transaction/'
      },
    ],

    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: 'Starting', link: '/starting' },
          { text: 'Support & Bug Reports', link: '/support.html' },
          { text: 'Changelog', link: '/changelog.html' },
          { text: 'what you need to know', link: '/wyntk.html' },
        ]
      },
      {
        text: "Transaction",
        items: [
          { text: 'The Basics', link: '/transaction/' },
          { text: 'Services', link: '/transaction/service.html' },
          { text: 'Transfer', link: '/transaction/transfer.html' },
          { text: 'Wallet', link: '/transaction/wallet.html' },
          { text: 'Webhook', link: '/transaction/webhook.html' },
        ]
      },
      {
        text: 'Payment',
        items: [
          { text: 'Direct', link: '/transaction/payment/direct' },
          { text: 'Redirect', link: '/transaction/payment/redirect' },
        ]
      },
    
      // Section Plugins et SDK
    {
      text: 'Plugins et SDK',
      items: [
        { text: 'Introduction', link: '/plugins-sdk/' },
        { text: 'Plugins', link: '/plugins-sdk/plugins' },
        { text: 'SDK', link: '/plugins-sdk/sdk' },
        ]
      },
    ],

    search: {
      provider: 'local',
      options: {
        placeholder: 'Search NovaSend docs...',
      },
    }
  },

  vite: {
    server: {
      host: true,
      fs: {
        allow: ['../..']
      }
    },
  }
});
