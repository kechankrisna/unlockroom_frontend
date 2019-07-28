import colors from 'vuetify/es5/util/colors'

export default {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  },
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      },
      
    ],
    script:[
      {
        src:"https://cdn.ckeditor.com/4.12.1/full/ckeditor.js"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/style/main.css',
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/mixins/user.js",
    // "@/plugins/axios.js",
    "@/plugins/mixins/validation.js",
    "@/plugins/googlemap.js",
    // { src: "@/plugins/ckeditor.js", mode:"client"}
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/vuetify',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    "@nuxtjs/auth"
  ],


  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/auth/login",
            method: "post",
            propertyName: "meta.token"
          },
          
          logout: {
            url: "logout",
            method: "post"
          },

          user: {
            url: "/auth/me",
            method: "post",
            propertyName: "data"
          },
        }
      }
    }
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: 'http://localhost:8000/api/',
  },

  router: {
    middleware: ["clearValidationErrors"]
  },

  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    theme: {
      primary: '#1976D2',
      secondary: '#424242',
      accent: '#82B1FF',
      error: '#FF5252',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FFC107'
      // primary: "#4caf50",
      // secondary: "#009688",
      // accent: "#00bcd4",
      // error: "#ff5722",
      // warning: "#ffc107",
      // info: "#03a9f4",
      // success: "#8bc34a"
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      
    },
    
    transpile: [/^vue2-google-maps($|\/)/]
  }
}
