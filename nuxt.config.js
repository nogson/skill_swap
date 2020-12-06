export default {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost'
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'client',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    {src: '~/assets/sass/app.scss', lang: 'scss'}
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/axios-accessor',
    {src: '~/plugins/persistedstate.ts', ssr: false}
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-webfontloader',
    '@nuxtjs/style-resources',
    'nuxt-fontawesome'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},
  styleResources: {
    scss: [
      '~assets/sass/variables.scss'
    ]
  },
  webfontloader: {
    google: {
      families: ['Noto+Sans+JP']
    }
  },
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      },
      {
        set: '@fortawesome/free-regular-svg-icons',
        icons: ['far']
      }
    ]
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },
  transpileDependencies: [
    'vuex-module-decorators'
  ]
}
