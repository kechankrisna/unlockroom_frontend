<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <logo />
        <h3 class="display-2 mt-2 mb-2">Book Meeting Room</h3>
      </div>
      <v-layout mt-5 mb-5 row wrap>
        <v-flex xs12 sm6 md5>
          <v-text-field solo prepend-inner-icon="place" placeholder="Where to?"></v-text-field>
        </v-flex>

        <v-flex xs12 sm6 md3>
          <v-menu
            v-model="from"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="fromdate"
                label="From"
                prepend-inner-icon="event"
                readonly
                v-on="on"
                solo
                min-width="320px"
              ></v-text-field>
            </template>
            <v-date-picker v-model="fromdate" @input="from = false"></v-date-picker>
          </v-menu>
        </v-flex>

        <v-flex xs12 sm6 md3>
          <v-menu
            v-model="to"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="todate"
                label="To"
                prepend-inner-icon="event"
                readonly
                v-on="on"
                solo
                min-width="320px"
              ></v-text-field>
            </template>
            <v-date-picker v-model="todate" @input="to = false"></v-date-picker>
          </v-menu>
        </v-flex>

        <v-flex xs12 sm12 md1>
          <v-select :items="attendees" prepend-inner-icon="person" solo></v-select>
        </v-flex>
      </v-layout>

      <h3 class="display-1 mb-3">Popular destinations</h3>

      <v-layout
        justify
        class="border radius mt-5"
        v-for="(location, index) in locations"
        :key="index"
      >
        <v-flex xs12 sm12 md5>
          <v-hover>
            <v-card
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 12 : 2}`"
              class="ma-0"
              width="344"
            >
              <v-img :aspect-ratio="16/9" :src="location.image"></v-img>
              <v-card-title>
                <div>
                  <span class="headline">{{location.title}}</span>
                  <div class="d-flex">
                    <span>{{ location.description }}</span>
                  </div>
                </div>
                <v-spacer></v-spacer>
                <v-btn icon class="mr-0">
                  <v-icon>arrow_forward</v-icon>
                </v-btn>
              </v-card-title>
            </v-card>
          </v-hover>
        </v-flex>
        <v-layout xs12 sm12 md7 class="parent">
          <v-container class="child pa-0">
            <v-flex v-for="venue in location.venues" :key="venue.id" xs12 sm12 md6>
              <v-card class="ma-1">
                <v-img :aspect-ratio="4/3" :src="venue.image"></v-img>
                <v-card-title>
                  <div>
                    <div class="body-2">{{venue.title}}</div>
                    <div class="d-flex">
                      <v-rating
                        :value="venue.value"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                      ></v-rating>
                      <div class="ml-2 grey--text text--darken-2">
                        <span>{{ venue.value }}</span>
                        <span>({{ venue.reviews }})</span>
                      </div>
                    </div>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
            <v-layout justify-center align-center text-xs-center>
              <v-btn outline small fab color="primary">
                <v-icon>arrow_right</v-icon>
              </v-btn>
            </v-layout>
          </v-container>
        </v-layout>
      </v-layout>

      <div class="mt-4 mb-4">
        <v-divider></v-divider>
      </div>

      
        <div class="text-xs-center">
          <v-icon small>place</v-icon>
          <strong>Phnom Penh, Cambodia</strong> -
          <span>From your Internet address</span>
        </div>
      

      <div class="text-xs-center">
        <nuxt-link to>Learn more</nuxt-link>
      </div>

      <div class="text-xs-center mt-3">
          <nuxt-link class="breadcrumb mr-2" to="/help">Send Feedback</nuxt-link>
          <nuxt-link class="breadcrumb mr-2" to="/privacy">Privacy Policy</nuxt-link>
          <nuxt-link class="breadcrumb mr-2" to="/terms">Terms and Condition</nuxt-link>
          <nuxt-link class="breadcrumb mr-2" to="/help">Help Center and Consumer Information</nuxt-link>
          <span class="breadcrumb mr-2">&copy; 2019</span>
      </div>

    </v-flex>
  </v-layout>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  layout: "default",
  components: {
    Logo
  },
  async asyncData({ $axios }) {
    
  },
  data() {
    return {
      fromdate: new Date().toISOString().substr(0, 10),
      from: false,
      todate: new Date().toISOString().substr(0, 10),
      to: false,
      attendees: [...Array(100).keys()],

      locations: [
        {
          title: "Siem reap City",
          image: "https://www.siemreap.net/wp-content/uploads/2017/12/siem-reap-pub-street-sunset.jpg",
          description: "1,226 places to stay . Avg $7 per night",
          venues: [
            {
              id: 1,
              title: "Siem reap club and spa",
              image: "https://www.siemreap.net/wp-content/uploads/2017/10/resort-la-villa-loti-siem-reap-entrance.jpg",
              reviews: 413,
              value: 4.5
            },
            {
              id: 2,
              title: "Siem reap club and spa",
              image: "http://images6.fanpop.com/image/photos/41700000/Siem-Reap-Cambodia-cambodia-41754685-730-486.jpg",
              reviews: 413,
              value: 4.5
            },
            {
              id: 3,
              title: "Siem reap club and spa",
              image: "https://pix10.agoda.net/hotelImages/206/2061863/2061863_17082814370055768614.jpg?s=1024x768",
              reviews: 413,
              value: 4.5
            },
            {
              id: 4,
              title: "Siem reap club and spa",
              image: "https://media-cdn.tripadvisor.com/media/photo-m/1280/15/bd/1b/8b/rooftop-pool-overlooking.jpg",
              reviews: 413,
              value: 4.5
            },
            {
              id: 5,
              title: "Siem reap club and spa",
              image: "http://www.asiavipa.com/img/@lynnaya.boutique.hotel.jpg",
              reviews: 413,
              value: 4.5
            }
          ]
        },

        {
          title: "Phnom Penh City",
          image: "http://www.golfcambodia.com/wp-content/uploads/2016/08/RCPPGC27-1000x597.jpg",
          description: "1,226 places to stay . Avg $7 per night",
          venues: [
            {
              id: 1,
              title: "Siem reap club and spa",
              image: "https://www.treelinehotels.com/wp-content/uploads/2019/03/main-slide-03-1024x683.jpg",
              reviews: 413,
              value: 4.5
            },
            {
              id: 2,
              title: "Siem reap club and spa",
              image: "https://www.siemreap.net/wp-content/uploads/2019/03/5092_Treeline_Entrance_002A.jpg",
              reviews: 413,
              value: 4.5
            },
            {
              id: 3,
              title: "Siem reap club and spa",
              image: "https://s-ec.bstatic.com/images/hotel/max1024x768/155/155244485.jpg",
              reviews: 413,
              value: 4.5
            },
            {
              id: 4,
              title: "Siem reap club and spa",
              image: "https://s-ec.bstatic.com/images/hotel/max1024x768/485/48559567.jpg",
              reviews: 413,
              value: 4.5
            },
            {
              id: 5,
              title: "Siem reap club and spa",
              image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
              reviews: 413,
              value: 4.5
            }
          ]
        },

        {
          title: "Battambang City",
          image: "https://www.siemreap.net/wp-content/uploads/2016/08/phnom-penh-independence-monument.jpg",
          description: "1,226 places to stay . Avg $7 per night",
          venues: [
            {
              id: 1,
              title: "Siem reap club and spa",
              image: "http://static.asiawebdirect.com/m/bangkok/portals/cambodia/homepage/phnom-penh/top10/top10-phnom-penh-riverside-hotels/pagePropertiesImage/top10-phnom-penh-riverside-hotels.jpg.jpg",
              reviews: 413,
              value: 4.5
            },
            {
              id: 2,
              title: "Siem reap club and spa",
              image: "https://s-ec.bstatic.com/images/hotel/max1024x768/465/46597259.jpg",
              reviews: 413,
              value: 4.5
            },
            {
              id: 3,
              title: "Siem reap club and spa",
              image: "http://static.asiawebdirect.com/m/bangkok/portals/bangkok-com/homepage/top10/top10-hotels-riverside/pagePropertiesImage/top10-hotels-riverside.jpg",
              reviews: 413,
              value: 4.5
            },
            {
              id: 4,
              title: "Siem reap club and spa",
              image: "https://www.amanjaya-suites-phnom-penh.com/wp-content/uploads/2017/01/Phnom-Penh-City-View.jpg",
              reviews: 413,
              value: 4.5
            },
            {
              id: 5,
              title: "Siem reap club and spa",
              image: "https://s-ec.bstatic.com/images/hotel/max1024x768/465/46597259.jpg",
              reviews: 413,
              value: 4.5
            }
          ]
        }
      ]
    };
  }
};
</script>

<style scope>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
.parent {
  overflow: hidden;
  overflow-x: overlay;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.parent::-webkit-scrollbar {
  /* WebKit */
  width: 0;
    height: 0;
}
.child {
  display: -webkit-inline-box;
  padding-bottom: 10px;
}
</style>