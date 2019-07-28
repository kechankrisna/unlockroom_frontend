
<template>
  <v-app>
    <v-toolbar fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <nuxt-link class="v-btn primary" to="/login">SIGN IN</nuxt-link>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer fixed app>
      <v-spacer></v-spacer>
      <nuxt-link class="mr-2" to="/help">Help</nuxt-link>
      <nuxt-link class="mr-2" to="/privacy">Privacy Policy</nuxt-link>
      <nuxt-link class="mr-2" to="/terms">Terms and Condition</nuxt-link>
      <span class="mr-2">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: this.$store.state.config.appname,
    };
  }
};
</script>