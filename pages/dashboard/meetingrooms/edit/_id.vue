<template>
  <div>
    <v-layout wrap>
      <v-flex xs12 sm12 md9>
        <v-card class="elevation-1 ma-1 pa-2">
          <v-text-field
            v-model="form.title"
            prepend-icon="account_balance"
            label="Meeting room name"
            required
          ></v-text-field>
          <v-textarea prepend-icon="edit" label="Short Description" v-model="form.description"></v-textarea>

          <v-card>
            <v-toolbar color="success" dark>
              <v-toolbar-title>
                <v-icon>shopping_cart</v-icon>Availability and Price
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-layout wrap>
                <v-flex xs12 sm4 class="pa-2">
                  <v-switch v-model="form.is_multiday" label="Is it possible to book multiday?"></v-switch>
                  <v-text-field
                    type="number"
                    v-model="form.price_per_day"
                    prepend-inner-icon="monetization_on"
                    label="Price per day"
                    :box="!form.is_multiday"
                    :readonly="!form.is_multiday"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm4 class="pa-2">
                  <v-switch v-model="form.is_halfday" label="Is it possible to book halfday?"></v-switch>
                  <v-text-field
                    type="number"
                    v-model="form.price_per_halfday"
                    prepend-inner-icon="monetization_on"
                    label="Price per half day"
                    :box="!form.is_halfday"
                    :readonly="!form.is_halfday"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm4 class="pa-2">
                  <v-switch v-model="form.is_hour" label="Is it possible to book hourly?"></v-switch>
                  <v-text-field
                    type="number"
                    v-model="form.price_per_hour"
                    prepend-inner-icon="monetization_on"
                    label="Price per hour"
                    :box="!form.is_hour"
                    :readonly="!form.is_hour"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout wrap align-center>
                <v-flex xs12 sm6>
                  <v-toolbar-title>
                    <v-icon>toc</v-icon>Include service without fee:
                  </v-toolbar-title>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    prepend-inner-icon="done"
                    v-model="form.includes"
                    :items="includes"
                    item-text="title"
                    value="id"
                    chips
                    multiple
                  ></v-select>
                </v-flex>
              </v-layout>

              <v-layout wrap align-center>
                <v-flex xs12 sm6>
                  <v-toolbar-title>
                    <v-icon>view_comfy</v-icon>Can be flexible to layout:
                  </v-toolbar-title>
                </v-flex>
                <!-- <v-flex xs12 sm6>
                  <v-select prepend-inner-icon="done" v-model="form.layouts" :items="layouts" item-text="title" :item-value="`${id}`" chips multiple ></v-select>
                </v-flex>-->
              </v-layout>

              <v-layout wrap  align-center v-for="(layout, index) in layouts" :key="index">
                
                <v-flex xs1 sm1>
                  <v-switch v-model="layout.checked" inset color="green"></v-switch>
                </v-flex>
                
                <v-flex xs7 sm7>
                  <v-img class="grey lighten-2" src="https://vuetifyjs.com/apple-touch-icon-180x180.png" aspect-ratio="1" max-width="25" ></v-img>

      Visit ten places on our planet that are undergoing the biggest changes today.
    
                </v-flex>

                <v-flex xs3 sm1>
                  <v-text-field
                    
                    prepend-inner-icon="supervisor_account"
                    type="number"
                    :readonly="!layout.checked"
                    v-model="layout.capacity"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>

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
                  class="grey lighten-1 ma-1 elevation-2"
                ></v-img>
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
            <v-toolbar-title text-color="primary">Choose Venue</v-toolbar-title>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-select
              :items="venues"
              item-text="title"
              item-value="id"
              v-model="form.venue"
              label="Select a specific venue"
            ></v-select>
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
                  <v-layout
                    v-if="userImage.selected"
                    pa-2
                    column
                    fill-height
                    class="lightbox white--text"
                  >
                    <v-spacer></v-spacer>
                    <v-flex shrink>
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
            <v-btn
              v-if="chooseFeature"
              class="primary"
              @click.prevent="selectFeatureImage"
            >Select Feature</v-btn>
            <v-btn v-if="chooseCover" class="primary" @click.prevent="selectCoverImage">Select Cover</v-btn>
            <v-btn
              v-if="chooseGallery"
              class="primary"
              @click.prevent="selectGalleryImage"
            >Select These</v-btn>
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
      chooseGallery: false,
      snackbar: false,
      dialog: false,
      isImageProcessing: false,
      cover: { id: "", name: "", url: "", file: "" },
      image: { id: "", name: "", url: "", file: "" },
      includes: [],
      venues: [],
      layouts: [],
      form: {
        title: "",
        description: "",
        capacity: 0,

        is_multiday: false,
        price_per_day: 0.0,
        is_halfday: false,
        price_per_halfday: 0.0,
        is_hour: false,
        price_per_hour: 0.0,
        layouts: [],
        includes: [],
        venue: "",
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
      (this.chooseFeature = true),
        (this.chooseCover = false),
        (this.chooseGallery = false),
        this.$axios.get("/images/").then(res => {
          if (this.form.image) {
            this.userImages = [
              ...res.data.data.map(image => {
                if (image.id === this.form.image) {
                  image.selected = true;
                } else {
                  image.selected = false;
                }
                return image;
              })
            ];
          } else {
            this.userImages = res.data.data;
          }
        });
      return (this.dialog = true);
    },

    //open dialog to choose image cover
    openCoverImageDialog() {
      (this.chooseFeature = false),
        (this.chooseCover = true),
        (this.chooseGallery = false),
        this.$axios.get("/images/").then(res => {
          if (this.form.cover) {
            this.userImages = [
              ...res.data.data.map(image => {
                if (image.id === this.form.cover) {
                  image.selected = true;
                } else {
                  image.selected = false;
                }
                return image;
              })
            ];
          } else {
            this.userImages = res.data.data;
          }
        });
      return (this.dialog = true);
    },

    //open dialog to choose gallery
    openGalleryImageDialog() {
      (this.chooseFeature = false),
        (this.chooseCover = false),
        (this.chooseGallery = true),
        this.$axios.get("/images/").then(res => {
          if (this.form.galleries.length > 0) {
            this.userImages = [
              ...res.data.data.map(image => {
                if (this.form.galleries.indexOf(image.id) >= 0) {
                  image.selected = true;
                }
                return image;
              })
            ];
          } else {
            this.userImages = res.data.data;
          }
        });
      return (this.dialog = true);
    },

    //handle choose button in dialog
    clickImage(img) {
      this.userImages = [
        ...this.userImages.map(image => {
          if (image.id == img.id) {
            image.selected != true
              ? (image.selected = true)
              : (image.selected = false);
          } else {
            if (this.chooseFeature || this.chooseCover) {
              image.selected = false;
            }
          }
          return image;
        })
      ];
    },

    //choose feature image handler button
    selectFeatureImage() {
      const userImage = this.userImages.filter(
        image => image.selected === true
      )[0];
      if (userImage) {
        this.form.image = userImage.id;
        this.image.id = userImage.id;
        this.image.url = userImage.size.medium;
        this.image.file = userImage.size.medium;
        return (this.dialog = false);
      }
    },

    //choose cover image handler button
    selectCoverImage() {
      const userImage = this.userImages.filter(
        image => image.selected === true
      )[0];
      if (userImage) {
        this.form.cover = userImage.id;
        this.cover.id = userImage.id;
        this.cover.url = userImage.size.full;
        this.cover.file = userImage.size.full;
        return (this.dialog = false);
      }
    },

    //choose gallery image handler button
    selectGalleryImage() {
      const galleries = this.userImages.filter(
        image => image.selected === true
      );
      this.galleries = galleries;

      let nullArray = [];
      galleries.map(gallery => {
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
        .post("/rooms/create", this.form)
        .then(res => {
          this.$router.push(`/dashboard/meetingrooms/edit/${res.data.data.id}`);
          this.snackbar = true;
        })
        .catch(err => {
          console.log(err);
        });
    },


  },

  watch: {

    layouts: {
      handler: function(val, old) {
         this.form.layouts = this.layouts.filter(layout => layout.checked == true );
      },
      deep: true
    }
  
  },

  mounted() {

    this.$axios.get(`/rooms/${this.$route.params.id}`).then(res => {
      const room = res.data.data;

      if (room.image != null) {
          this.image.id = room.image.id;
          this.image.url = room.image.size.medium;
          this.image.file = room.image.size.medium;
          this.image.name = room.image.title;
          this.form.image = room.image.id;
        }
        if (room.cover != null) {
          this.cover.id = room.cover.id;
          this.cover.url = room.cover.size.large;
          this.cover.file = room.cover.size.large;
          this.cover.name = room.cover.title;
          this.form.cover = room.cover.id;
        }

      this.form = {
        id: room.id,
        title: room.title,
        description: room.description,
        capacity: room.capacity,

        is_multiday: room.is_multiday,
        price_per_day: room.price_per_day,
        is_halfday: room.is_halfday,
        price_per_halfday: room.price_per_halfday,
        is_hour: room.is_hour,
        price_per_hour: room.price_per_hour,
        layouts: [],
        includes: [...room.includes.map(include => {
            return include;
          })],
        venue: room.venue.id,
        image: room.image.id,
        cover: room.cover.id,
        galleries: [...room.galleries.map(gallery => {
            return gallery.id;
          })]
      }
      this.galleries = room.galleries;
      
    }).catch(e => {
      console.log(e);
      
    });

    this.$axios
      .get("/venues/")
      .then(res => {
        this.venues = res.data.data;
      })
      .catch(e => {
        console.log(e);
      });


    this.includes = [
      {
        id: 1,
        title: "Free transportation"
      },
      {
        id: 2,
        title: "Slider service"
      },
      {
        id: 3,
        title: "LCD projector"
      },
      {
        id: 4,
        title: "LAMP for room"
      }
    ];

    this.layouts = [
      {
        id: 1,
        checked: false,
        title: "U Layout",
        capacity: 0
      },
      {
        id: 2,
        checked: false,
        title: "V Layout",
        capacity: 0
      },
      {
        id: 3,
        checked: false,
        title: "N Layout",
        capacity: 0
      },
      {
        id: 4,
        checked: false,
        title: "W Layout",
        capacity: 0
      }
    ];
  }
};
</script>