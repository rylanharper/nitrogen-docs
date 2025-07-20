import type { DefaultTheme } from 'vitepress';
import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Nitrogen',
  description: 'A Nuxt Shopify template based on Hydrogen',
  appearance: 'dark',
  head: [
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'author', content: 'Rylan Harper' }]
  ],
  themeConfig: {
    logo: '/logo.svg',
    editLink: {
      pattern: 'https://github.com/rylanharper/nitrogen-docs/edit/master/:path',
      text: 'Suggest changes to this page',
    },
    search: {
      provider: 'local'
    },
    nav: nav(),
    sidebar: sidebarGuide(),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/rylanharper/nitrogen' }
    ],
    footer: {
      message: 'Released under the MIT License',
      copyright: '© 2025 Rylan Harper'
    }
  }
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Guide',
      activeMatch: '^/guide/',
      items: [
        { text: 'Getting Started', link: '/guide/getting-started' },
        { text: 'Shopify Setup', link: '/guide/shopify-setup' },
        { text: 'Basic Usage', link: '/guide/basic-usage' }
      ]
    },
    {
      text: 'Integrations',
      activeMatch: '^/integrations/',
      items: [
        { text: 'Klaviyo', link: '/integrations/klaviyo' },
        { text: 'Sanity', link: '/integrations/sanity' }
      ]
    },
    // {
    //   text: 'API',
    //   activeMatch: '^/api/',
    //   items: [
    //     { text: 'GraphQL Client', link: '/api/graphql-client' },
    //     { text: 'GraphQL Operations', link: '/api/graphql-operations' },
    //     { text: 'Data Fetching', link: '/api/data-fetching' }
    //   ]
    // }
  ];
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Guides',
      items: [
        { text: 'Getting Started', link: '/guide/getting-started' },
        { text: 'Shopify Setup', link: '/guide/shopify-setup' },
        { text: 'Basic Usage', link: '/guide/basic-usage' }
      ]
    },
    {
      text: 'Integrations',
      items: [
        { text: 'Klaviyo', link: '/integrations/klaviyo' },
        { text: 'Sanity', link: '/integrations/sanity' }
      ]
    },
    // {
    //   text: 'API',
    //   items: [
    //     { text: 'GraphQL Client', link: '/api/graphql-client' },
    //     { text: 'GraphQL Operations', link: '/api/graphql-operations' },
    //     { text: 'Data Fetching', link: '/api/data-fetching' }
    //   ]
    // },
    { text: 'View Demo', link: 'https://nitrogen.rylanharper.workers.dev' }
  ];
}
