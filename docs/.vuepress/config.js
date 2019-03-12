module.exports = {
  dest: '../../vuepress',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'MADocs 1.0',
      description: '明安信息技术有限公司检验系统技术文档'
    }
  },
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  themeConfig: {
    repo: 'superZhouDaLu/ProjectDocs',
    editLinks: true,
    docsDir: '/docs/',
    label: '简体中文',
    selectText: '选择语言',
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '配置', link: '/setting/' }
    ],
    sidebar: {
      '/guide/': getGuideSidebar('指南', '深入')
    }
  }
}

function getGuideSidebar (groupA, groupB) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'build-back',
        'technology'
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        'depth'
      ]
    }
  ]
}