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

      <nuxt-link class="v-btn primary" to="/login" v-show="!user">SIGN IN</nuxt-link>
      <div class="text-xs-center" v-if="user">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-avatar dark v-on="on" color="grey lighten-4">
              <img
                src="https://lh3.googleusercontent.com/-M6MIFUa3nYs/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rf_dYBjWHkrr8x3XtoLb2kXMdBjdQ.CMID/s96-c/photo.jpg"
                alt="avatar"
              />
            </v-avatar>
          </template>
          <v-list>
            <nuxt-link :to="user.roles[0] == 'client' ? '/user' : user.roles[0] == 'partner' ? '/partner' : user.permissions.length > 0 ? '/dashboard' : '' ">
            <!-- <nuxt-link to="/user" router exact > -->
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon>dashboard</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Dashboard</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </nuxt-link>

            <nuxt-link :to="user.roles[0] == 'client' ? '/user/profile' : user.roles[0] == 'partner' ? '/partner/profile' : user.permissions.length > 0 ? '/dashboard/profile' : '' ">
            <!-- <nuxt-link to="/user" router exact > -->
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon>account_circle</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Profile</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </nuxt-link>

            <nuxt-link to="/logout">
            <!-- <nuxt-link to="/user" router exact > -->
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon>launch</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Logout</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </nuxt-link>

          </v-list>
        </v-menu>
      </div>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
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
          to: "/"
        },
        {
          icon: "domain",
          title: "Venue",
          to: "/venues"
        },
        {
          icon: "meeting_room",
          title: "Meeting rooms",
          to: "/meetingrooms/"
        },
        {
          icon: "place",
          title: "Location",
          to: "/locations"
        }
      ],
      miniVariant: true,
      title: this.$store.state.config.appname,
      menus: [
        { title: "Dashboard", icon: "apps", to: "/dashboard" },
        { title: "Profile", icon: "account_circle", to: "/profile" },
        { title: "Logout", icon: "launch", to: "/logout" }
      ]
    };
  },
  methods: {
    async logout(){
      await this.auth.logout();
    }
  }
};
</script>
