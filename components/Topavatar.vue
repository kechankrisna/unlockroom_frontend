<template>
  <div class="text-xs-center">
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
        <v-list-tile v-for="(item, index) in menus" :key="index">
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
</template>