<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-tile v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="clipped" fixed app>
      <v-toolbar-side-icon @click.stop="miniVariant = !miniVariant" />

      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-badge overlap class="mr-1">
        <template v-slot:badge>
          <span>3</span>
        </template>

        <v-avatar color="purple red--after">
          <v-icon dark>notifications</v-icon>
        </v-avatar>
      </v-badge>

      <div class="text-xs-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-avatar dark v-on="on"  color="grey lighten-4">
              <img src="https://lh3.googleusercontent.com/-M6MIFUa3nYs/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rf_dYBjWHkrr8x3XtoLb2kXMdBjdQ.CMID/s96-c/photo.jpg" alt="avatar" />
            </v-avatar>
          </template>
          <v-list>
            <v-list-tile v-for="(item, index) in menus" :key="index"  >
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="item.title" />
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
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
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "home",
          title: "Home",
          to: "/",
          roles:[
              "user", "partner", 
          ]
        },
        {
          icon: "apps",
          title: "Dashboard",
          to: "/user",
          roles:[
              "user", "partner", 
          ]
        },

        {
          icon: "history",
          title: "Booking History",
          to: "/bookinghistory",
          roles:[
              "user", "partner", 
          ]
        },
        {
          icon: "account_circle",
          title: "Profile",
          to: "/profile",
          roles:[
              "user", "partner", 
          ]
        },
        
      ],
      miniVariant: true,
      title: this.$store.state.config.appname,
      menus: [
        { title: "Dashboard", icon: "apps", to:"" },
        { title: "Profile", icon: "account_circle" , to:"" },
        { title: "Logout", icon: "launch", to:""  }
      ]
    };
  }
};
</script>
