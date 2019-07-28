<template>
  <div>
    <v-layout wrap>
      <v-flex xs12 sm12 md9>
        <v-card class="elevation-1 ma-1 pa-2">
          <v-text-field v-model="form.title" prepend-icon="account_balance" label="Venue name" required></v-text-field>

          <v-toolbar flat color="primary" dark>Venue Information</v-toolbar>
          <v-tabs vertical>
            <v-tab>
              <v-icon left>info</v-icon>Description
            </v-tab>
            <v-tab>
              <v-icon left>notes</v-icon>Term
            </v-tab>
            <v-tab>
              <v-icon left>today</v-icon>Working Hours
            </v-tab>

            <v-tab>
              <v-icon left>my_location</v-icon>Location
            </v-tab>

            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-textarea
                    prepend-icon="edit"
                    label="Short Description"
                    v-model="form.description"
                  ></v-textarea>

                  <v-text-field type="number" prepend-icon="monetization_on" label="Deposit rate %"></v-text-field>
                  <v-text-field type="number" prepend-icon="monetization_on" label="Tax rate %"></v-text-field>

                  <v-select
                    v-model="form.currency"
                    :items="currencies"
                    prepend-icon="monetization_on"
                    label="Prefer curreny"
                  ></v-select>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-textarea
                    prepend-icon="edit"
                    label="Venue Term and Condition"
                    v-model="form.term"
                  ></v-textarea>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex xs11 sm5>
                      <v-menu
                        ref="start"
                        v-model="startHour"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="form.hours.start"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="form.hours.start"
                            label="Starting Hour"
                            prepend-icon="access_time"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="startHour"
                          v-model="form.hours.start"
                          full-width
                          @click:minute="$refs.start.save(form.hours.start)"
                        ></v-time-picker>
                      </v-menu>
                    </v-flex>
                    <v-spacer></v-spacer>

                    <v-flex xs11 sm5>
                      <v-menu
                        ref="end"
                        v-model="endHour"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="form.hours.end"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="form.hours.end"
                            label="Ending Hour"
                            prepend-icon="access_time"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="endHour"
                          v-model="form.hours.end"
                          full-width
                          @click:minute="$refs.end.save(form.hours.end)"
                        ></v-time-picker>
                      </v-menu>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-layout wrap align-center fill-height >
                    <v-flex xs12 sm5>
                      <v-text-field
                        prepend-icon="edit_location"
                        label="Enter Venue address"
                        v-model="form.address"
                      ></v-text-field>
                    </v-flex>
                  <v-flex xs12 sm1 text-xs-center>
                    <v-label class="success" >Or</v-label>
                  </v-flex>
                    <v-flex xs12 sm5>
                      <div class="v-input v-text-field  theme--light">
                        <div class="v-input__prepend-outer">
                            <div class="v-input__icon v-input__icon--prepend">
                              <i aria-hidden="true" class="v-icon material-icons theme--light">edit_location</i>
                            </div>
                        </div>
                        <div class="v-input__control">
                            <div class="v-input__slot">
                              <div class="v-text-field__slot">
                                <label aria-hidden="true" class="v-label v-label--active theme--light" style="left:0px;right:auto;position:absolute;">Autocomplete Address</label>
                                <gmap-autocomplete placeholder="Google map" @place_changed="setPlace"> </gmap-autocomplete>
                              </div>
                            </div>
                            <div class="v-text-field__details"><div class="v-messages theme--light"><div class="v-messages__wrapper"></div></div></div>
                        </div>
                      </div>
                    </v-flex>
                  </v-layout>
                  

                  
                  

                  <v-text-field
                    prepend-icon="edit_location"
                    label="Latitude for map (Readonly)"
                    v-model="form.lat"
                    box
                    readonly
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="edit_location"
                    label="Longitude for map (Readonly)"
                    v-model="form.lng"
                    box
                    readonly
                  ></v-text-field>

                  <GmapMap
                    ref="mapRef"
                    @click="mapclick"
                    @zoom_changed="someFunc"
                    :center="{ lat: form.lat, lng: form.lng}"
                    style="height: 450px"
                    :zoom="7"
                    map-type-id="terrain"
                    :options="{
                      zoomControl: true,
                      mapTypeControl: true,
                      scaleControl: false,
                      streetViewControl: false,
                      rotateControl: true,
                      fullscreenControl: true,
                      disableDefaultUi: true
                    }">
                    
                    <GmapMarker
                      :position="form"
                      :clickable="true"
                      :draggable="true"
                      @dragend="markerdrag"
                    />

                  </GmapMap>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>

          <v-card-text>
            <v-text-field prepend-icon="panorama" label="Choose Cover"></v-text-field>
            <v-text-field prepend-icon="image" label="Create Gallery"></v-text-field>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 sm12 md3>
        <v-card class="elevation-1 ma-1">
          <v-card-text flat>
            <v-toolbar-title text-color="white">Publish</v-toolbar-title>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn @click.prevent="publish(3)">SAVE</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click.prevent="publish(4)" class="primary">Publish</v-btn>
          </v-card-actions>
        </v-card>

        <v-card class="elevation-1 ma-1">
          <v-card-text flat>
            <v-toolbar-title text-color="white">Feature image</v-toolbar-title>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-img :src="imageUrl" :ratio="9/16" v-if="imageUrl" />
            <v-btn @click.prevent="openImageDialog" class="primary">
              <v-icon class="pr-1">perm_media</v-icon>Choose feature image
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-dialog v-model="dialog" fluid ma-0 pa-0 fill-height>
        <v-card>
          <v-card-title class="headline grey lighten-2">Your images</v-card-title>
          <v-card-text>
            <v-progress-linear indeterminate color="primary" class="ma-0" v-if="isImageProcessing"></v-progress-linear>
            <v-layout wrap>
              <v-flex xs6 sm4 md2 v-for="(userImage, index) in userImages" :key="index">
                <v-img
                  @click.prevent="selectImage(userImage)"
                  :src="userImage.size.medium"
                  aspect-ratio="1"
                  class="grey lighten-1 ma-1 elevation-2"
                >
                  <v-layout pa-2 column fill-height class="lightbox white--text">
                    <v-spacer></v-spacer>
                    <v-flex shrink>
                      <div class="subheading">{{userImage.title}}</div>
                      <div class="body-1">
                        <v-layout wrap>
                          <v-icon @click.prevent="editImage(userImage)" color="white">edit</v-icon>

                          <v-icon @click.prevent="deleteImage(userImage)" color="red">cancel</v-icon>
                        </v-layout>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-img>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <input
              type="file"
              style="display: none"
              ref="image"
              accept="image/*"
              @change="onFilePicked"
            />
            <v-btn class="success" @click.prevent="pickFile">Upload</v-btn>

            <v-spacer></v-spacer>
            <v-btn class="primary" @click.prevent="chooseFile">Choose</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar color="success" v-model="snackbar">
        New Venue was created!
        <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-layout>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  middleware: ["dashboard"],

  data() {
    return {
      //map
      // center:{ lat: 13.6227568, lng: 103.7022686},

      snackbar: false,
      dialog: false,
      isImageProcessing: false,
      imageId: "",
      imageName: "",
      imageUrl: "",
      imageFile: "",
      startHour: false,
      endHour: false,
      currencies: ["USD Dollar", "KH Riel"],
      form: {
        title: "",
        description: "",
        term: "",
        hours: {
          start: "9:00",
          end: "21:00"
        },
        currency: "",
        deposit_rate: "",
        tax_rate: "",
        address: "",
        lat: 13.6227568,
        lng: 103.7022686,
        region: "",
        country: "",

        image: "",
        cover: "",
        galleries: new Array()
      },
      userImages: []
    };
  },

  methods: {
    //on remove chips
    removeVenue(item) {
      this.post.venues.splice(this.post.venues.indexOf(item), 1);
      this.post.venues = [...this.post.venues];
    },

    //on remove chips
    removeVenue(item) {
      this.post.venues.splice(this.post.venues.indexOf(item), 1);
      this.post.venues = [...this.post.venues];
    },

    //handle image picker
    pickFile() {
      this.$refs.image.click();
    },
    //handle remove picker
    remove() {
      this.imageFile = "";
      this.imageName = "";
      this.imageUrl = "";
    },

    onFilePicked(e) {
      this.isImageProcessing = true;
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...

          const config = {
            headers: { "content-type": "multipart/form-data" }
          };
          let formData = new FormData();
          formData.append("image", e.target.files[0]);

          this.$axios
            .post("/images/create", formData, config)
            .then(res => {
              const uploadedImage = res.data.data;
              this.userImages.unshift(uploadedImage);
              this.isImageProcessing = false;
            })
            .catch(err => {
              console.log(err);
            });
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },

    //choose image feature
    openImageDialog() {
      this.$axios.get("/images/").then(res => {
        this.userImages = res.data.data;
      });
      return (this.dialog = true);
    },
    selectImage(userImage) {
      this.form.image = userImage.id;
      this.imageId = userImage.id;
      this.imageUrl = userImage.size.medium;
      this.imageFile = userImage.size.medium;
    },

    onSubmitPhoto() {
      console.log(this.image);
    },

    chooseFile() {
      return (this.dialog = false);
    },

    editImage(userImage) {
      console.log(userImage);
    },

    deleteImage(userImage) {
      this.isImageProcessing = true;
      this.$axios
        .delete(`/images/${userImage.id}`)
        .then(res => {
          this.userImages = this.userImages.filter(
            image => image.id !== userImage.id
          );
          this.isImageProcessing = false;
        })
        .catch(err => {
          console.log(err);
        });
    },

    publish(status) {
      this.form.status = status;
      this.$axios
        .post("/venues/create", this.form)
        .then(res => {
          this.snackbar = true;
          this.reset();
        })
        .catch(err => {
          console.log(err);
        });
    },

    reset() {
      this.imageId = "";
      this.imageName = "";
      this.imageUrl = "";
      this.imageFile = "";
      this.form.title = "";
      this.form.description = "";
      this.form.image = "";
    },

    someFunc(e) {
      console.log(e);
    },
    mapclick(e) {
      this.form.lat = e.latLng.lat();
      this.form.lng = e.latLng.lng();
    },
    markerdrag(e){
      this.form.lat = e.latLng.lat();
      this.form.lng = e.latLng.lng();
    },
    setPlace(place) {
      this.form.address = `${place.name}, ${place.formatted_address}` ;
      this.form.lat = place.geometry.location.lat();
      this.form.lng = place.geometry.location.lng();
      
    },
  },

  mounted() {

  }
};
</script>