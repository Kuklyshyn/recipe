const path = require('path');
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'tripapp',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "You are hungry??? And you don't know what to cook. Tap and cook a random dish. Random dish." },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'keywords', name: 'keywords', content: "I don't know what to cook, I want to cook something, I want to cook, change the diet, random dish, cook something new, try something new, random food from what's in the fridge, I have in the fridge what can be prepared from it, cook meat, cook chicken, cook fish, cook vegetarian" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-analytics'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    ['nuxt-sass-resources-loader', path.resolve(__dirname, 'assets/scss/main.scss')],
    '@nuxtjs/google-gtag',
    '@nuxtjs/gtm',
  ],
  'google-gtag': {
    id: 'G-NE1N9VPLD9',
    config: {
      anonymize_ip: true, // anonymize IP 
      send_page_view: false, // might be necessary to avoid duplicated page track on page reload
    },
    debug: true, // enable to track in dev mode
    disableAutoPageTrack: false, // disable if you don't want to track each page route with router.afterEach(...).
  },
  gtm: {
    id: 'G-NE1N9VPLD9'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  googleAnalytics: {
    id: 'G-NE1N9VPLD9'
  }
}
