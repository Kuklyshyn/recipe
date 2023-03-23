const path = require('path');
const axios = require('axios');
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
      { hid: 'description', name: 'description', content: "Dish randomizer. You are hungry??? And you don't know what to cook. Tap and cook a random dish. Random dish." },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'keywords', name: 'keywords', content: "recipe generator, food generator, meal generator, random recipe, random food, recipe suggestions, meal ideas, random menu, recipe roulette, dish roulette, dish randomizer, meal randomizer, random meal planner, recipe picker, food picker, random dish meal generator, dinner random generator, dish generator, three random ingredients, random dish generator, meal random generator, dish randomizer, a random recipe, random food meal generator, random vegetarian, meal generator,	I don't know what to cook, I want to cook something, I want to cook, change the diet, random dish, cook something new, try something new, random food from what's in the fridge, I have in the fridge what can be prepared from it, cook meat, cook chicken, cook fish, cook vegetarian" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/Favicon-32x32.svg' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main.scss',
  ],

  // loading: '~/components/spinner/Spinner.vue',

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
    '@nuxtjs/sitemap'
  ],
  'google-gtag': {
    id: 'G-XW0G8M9BZ2',
    config: {
      anonymize_ip: true, // anonymize IP 
      send_page_view: false, // might be necessary to avoid duplicated page track on page reload
    },
    debug: true, // enable to track in dev mode
    disableAutoPageTrack: false, // disable if you don't want to track each page route with router.afterEach(...).
  },
  gtm: {
    id: 'G-XW0G8M9BZ2'
  },
  sitemap: {
    hostname: 'https://dishwheel.com',
    gzip: true,
    routes: async () => {
      const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      return data.meals.map((expert) => `/${expert.strCategory}`)
    }
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'extra',
        path: '/:name',
        component: resolve(__dirname, 'pages/index.vue')
      })
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  googleAnalytics: {
    id: 'G-XW0G8M9BZ2'
  }
}
