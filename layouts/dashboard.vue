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
    <v-toolbar :clipped-left="clipped" fixed app dark color="primary">
      <v-toolbar-side-icon @click.stop="miniVariant = !miniVariant" />

      <v-toolbar-title style="width: 270px" class="ml-0 pl-3" v-text="title" />
      <v-text-field
        solo-inverted
        flat
        label="Search"
        prepend-inner-icon="search"
      ></v-text-field>

      <v-spacer />
      <v-btn icon>
          <v-icon>
            apps
        </v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>

      <div class="text-xs-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-avatar dark v-on="on"  size="32px" color="grey lighten-4">
              <v-img src="https://lh3.googleusercontent.com/-M6MIFUa3nYs/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rf_dYBjWHkrr8x3XtoLb2kXMdBjdQ.CMID/s96-c/photo.jpg" alt="avatar" />
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
          icon: "dashboard",
          title: "Dashboard",
          to: "/dashboard"
        },
        {
          icon: "edit",
          title: "Posts",
          to: "/dashboard/posts"
        },
        {
          icon: "view_list",
          title: "Categories",
          to: "/dashboard/categories"
        },
        {
          icon: "loyalty",
          title: "Tags",
          to: "/dashboard/tags"
        },
        {
          icon: "library_add",
          title: "Pages",
          to: "/dashboard/pages"
        },
        {
          icon: "mail_outline",
          title: "Reservations",
          to: "/dashboard/reservations"
        },
        {
          icon: "edit_location",
          title: "Regions",
          to: "/dashboard/regions"
        },
        {
          icon: "domain",
          title: "Venues",
          to: "/dashboard/venues"
        },
        {
          icon: "meeting_room",
          title: "Meeting rooms",
          to: "/dashboard/meetingrooms"
        },
        {
          icon: "view_module",
          title: "Room layout",
          to: "/dashboard/layouts"
        },
        {
          icon: "weekend",
          title: "Equipments",
          to: "/dashboard/equipments"
        },
        {
          icon: "room_service",
          title: "Food and Drink",
          to: "/dashboard/fooddrinks"
        },

        {
          icon: "contacts",
          title: "Clients",
          to: "/dashboard/clients"
        },
        {
          icon: "list_alt",
          title: "Partners",
          to: "/dashboard/partners"
        },
        {
          icon: "people",
          title: "User Management",
          to: "/dashboard/usermanagement"
        },
        {
          icon: "history",
          title: "Booking History",
          to: "/dashboard/bookinghistories"
        },
        {
          icon: "settings",
          title: "Settings",
          to: "/dashboard/settings"
        },
        
      ],
      miniVariant: true,
      title: this.$store.state.config.appname,
      menus: [
        { title: "Dashboard", icon: "apps", to:"" },
        { title: "Profile", icon: "account_circle" , to:"" },
        { title: "Logout", icon: "launch", to:"/logout"  }
      ]
    };
  }
};
</script>
