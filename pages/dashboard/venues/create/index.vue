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

                  <v-text-field type="number" v-model="form.deposit_rate" prepend-icon="monetization_on" label="Deposit rate %" ></v-text-field>
                  <v-text-field type="number" v-model="form.tax_rate" prepend-icon="monetization_on" label="Tax rate %" ></v-text-field>

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

            <v-img :src="cover.url" :ratio="4/3" v-if="cover.url" max-height="400" />
            <v-btn @click.prevent="openCoverImageDialog" class="success">
              <v-icon class="pr-1">image</v-icon>Choose cover image
            </v-btn>

            <v-btn @click.prevent="openGalleryImageDialog" class="purple" dark>
              <v-icon class="pr-1">perm_media</v-icon>Create Gallery
            </v-btn>
          
            <v-layout wrap>
              <v-flex xs6 sm3 md2 v-for="(gallery, index) in galleries" :key="index">
                <v-img 
                  :src="gallery.size.medium" 
                  aspect-ratio="1"
                  class="grey lighten-1 ma-1 elevation-2">
                </v-img>
              </v-flex>
            </v-layout>
            

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
          <v-card-text>
            <v-toolbar-title text-color="primary"> Choose Region </v-toolbar-title>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-select :items="regions" item-text="title" item-value="id" v-model="form.region" label="Select a specific region" hint="This will help client to filter"></v-select>
          </v-card-text>
        </v-card>

        <v-card class="elevation-1 ma-1">
          <v-card-text flat>
            <v-toolbar-title text-color="white">Feature image</v-toolbar-title>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-img :src="image.url" :ratio="9/16" v-if="image.url" />
            <v-btn @click.prevent="openFeatureImageDialog" class="primary">
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
                  @click.prevent="clickImage(userImage)"
                  :src="userImage.size.medium"
                  aspect-ratio="1"
                  class="grey lighten-1 ma-1 elevation-2"
                >
                  <v-layout v-if="userImage.selected" pa-2 column fill-height class="lightbox white--text">
                    <v-spacer></v-spacer>
                    <v-flex shrink  >
                      <div class="subheading">{{userImage.title}}</div>
                      <div class="body-1">
                        <v-layout wrap>
                          <v-btn class="mx-2" fab dark small color="success">
                            <v-icon dark>done</v-icon>
                          </v-btn>

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
            <v-btn v-if="chooseFeature" class="primary" @click.prevent="selectFeatureImage">Select Feature</v-btn>
            <v-btn v-if="chooseCover" class="primary" @click.prevent="selectCoverImage">Select Cover</v-btn>
            <v-btn v-if="chooseGallery" class="primary" @click.prevent="selectGalleryImage">Select These</v-btn>
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

      chooseFeature: false,
      chooseCover: false,
      chooseGallery:false,
      snackbar: false,
      dialog: false,
      isImageProcessing: false,
      cover: {id: "", name: "", url: "", file:""},
      image:{id: "", name: "", url: "", file:""},
      startHour: false,
      endHour: false,
      currencies: ["USD Dollar", "KH Riel"],
      regions: [],
      form: {
        title: "",
        description: "",
        term: "",
        hours: {
          start: "9:00",
          end: "21:00"
        },
        currency: "",
        deposit_rate: 0,
        tax_rate: 0,
        address: "",
        lat: 13.6227568,
        lng: 103.7022686,
        region: "",
        country: "",

        image: "",
        cover: "",
        galleries: []
      },
      userImages: [],
      galleries: []
    };
  },

  methods: {

/**
 * Image handle
 */
    //handle image picker
    pickFile() {
      this.$refs.image.click();
    },

    onFilePicked(e) {
      this.isImageProcessing = true;
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.image.name = files[0].name;
        if (this.image.name.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {

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
      }
    },

    //open dialog to choose image feature
    openFeatureImageDialog() {
      this.chooseFeature = true,
      this.chooseCover = false,
      this.chooseGallery = false,
      this.$axios.get("/images/").then(res => {
        
        if(this.form.image){
              this.userImages = [...res.data.data.map(image => {
                if(image.id === this.form.image){
                  image.selected = true
                }else{
                  image.selected = false
                }
                return image;
              })];
        }else{
          this.userImages = res.data.data;
        }
      });
      return (this.dialog = true);
    },

    //open dialog to choose image cover
    openCoverImageDialog() {
      this.chooseFeature = false,
      this.chooseCover = true,
      this.chooseGallery = false,
      this.$axios.get("/images/").then(res => {
        
        if(this.form.cover){
              this.userImages = [...res.data.data.map(image => {
                if(image.id === this.form.cover){
                  image.selected = true
                }else{
                  image.selected = false
                }
                return image;
              })];
        }else{
          this.userImages = res.data.data;
        }
      });
      return (this.dialog = true);
    },

    //open dialog to choose gallery
    openGalleryImageDialog() {
      this.chooseFeature = false,
      this.chooseCover = false,
      this.chooseGallery = true,
      this.$axios.get("/images/").then(res => {
        
        if(this.form.galleries.length>0){
            this.userImages = [...res.data.data.map(image => {
                if( this.form.galleries.indexOf(image.id) >= 0){
                  image.selected = true
                }
                return image;
              })];
        }else{
          this.userImages = res.data.data;
        }
      });
      return (this.dialog = true);
    },

    //handle choose button in dialog
    clickImage(img){
      this.userImages = [...this.userImages.map(image => {
        
          if(image.id == img.id){
            image.selected != true ? image.selected = true : image.selected = false ;
          }else{
            if(this.chooseFeature || this.chooseCover){
              image.selected = false;
            }
          }
        return image;
      })];
    },

    //choose feature image handler button
    selectFeatureImage() {
      const userImage = this.userImages.filter(image => image.selected === true )[0];
      if(userImage){
        this.form.image = userImage.id;
        this.image.id = userImage.id;
        this.image.url = userImage.size.medium;
        this.image.file = userImage.size.medium;
        return (this.dialog = false);
      }
      
    },

    //choose cover image handler button
    selectCoverImage() {
      const userImage = this.userImages.filter(image => image.selected === true )[0];
      if(userImage){
        this.form.cover = userImage.id;
        this.cover.id = userImage.id;
        this.cover.url = userImage.size.full;
        this.cover.file = userImage.size.full;
        return (this.dialog = false);
      }
    },

    //choose gallery image handler button
    selectGalleryImage(){
      const galleries = this.userImages.filter(image => image.selected === true );
      this.galleries = galleries;

        let nullArray = [];
        galleries.map( gallery => {
          nullArray.push(gallery.id);
        });
        this.form.galleries = nullArray;
      
      return (this.dialog = false);
    },

    //edit image handler
    editImage(userImage) {
      console.log(userImage);
    },

    //image deletion handler
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

/**
 * End Image handle
 */

    publish(status) {
      this.form.status = status;
      this.$axios
        .post("/venues/create", this.form)
        .then(res => {
           this.reset();
           this.snackbar = true;
        })
        .catch(err => {
          console.log(err);
        });
    },

    reset() {
      Object.assign(this.$data, this.$options.data());
    },


    /**
     * Google map handler
     */
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
    this.$axios.get('/regions/').then(res => {
      this.regions = res.data.data;
    }).catch(e => {
      console.log(e);
      
    });
  }
};
</script>