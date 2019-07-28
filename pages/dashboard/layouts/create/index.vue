<template>
  <div>
    <v-layout wrap>
      <v-flex xs12 sm12 md9>
        <v-card class="elevation-1 ma-1 pa-2">
          <v-text-field v-model="form.title" prepend-icon="edit" label="Layout title" required></v-text-field>
          <v-textarea prepend-icon="edit" label="Short Description" v-model="form.description" >
          </v-textarea>
          
        </v-card>
      </v-flex>

      <v-flex xs12 sm12 md3>
        <v-card class="elevation-1 ma-1">
          <v-card-text flat>
            <v-toolbar-title text-color="white">Publish</v-toolbar-title>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn @click.prevent="publish(3)" >SAVE</v-btn>
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
              <v-progress-linear
      indeterminate
      color="primary"
      class="ma-0"
      v-if="isImageProcessing"
    ></v-progress-linear>
            <v-layout wrap>
                <v-flex xs6 sm4 md2 v-for="(userImage, index) in userImages" :key="index">
                    <v-img @click.prevent="selectImage(userImage)" :src="userImage.size.medium" aspect-ratio="1" class="grey lighten-1 ma-1 elevation-2" >
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
                <v-btn class="success" @click.prevent="pickFile">
                    Upload
                </v-btn>
              
              <v-spacer></v-spacer>
              <v-btn class="primary" @click.prevent="chooseFile" >
                  Choose
              </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar color="success" v-model="snackbar">
        New Layout was created!
        <v-btn
          color="pink"
          text
          @click="snackbar = false"
        >
          Close
        </v-btn>
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
      snackbar: false,
      dialog: false,
      isImageProcessing:false,
      imageId:"",
      imageName: "",
      imageUrl: "",
      imageFile: "",
      form: {
        title: "",
        description: "",
        image: "", 
      },
      userImages: [],
    };
  },

  methods: {
    //on remove chips
    removeLayout(item) {
      this.post.layouts.splice(this.post.layouts.indexOf(item), 1);
      this.post.layouts = [...this.post.layouts];
    },

    //on remove chips
    removeLayout(item) {
      this.post.layouts.splice(this.post.layouts.indexOf(item), 1);
      this.post.layouts = [...this.post.layouts];
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
                headers: { 'content-type': 'multipart/form-data' }
            }
            let formData = new FormData();
            formData.append('image', e.target.files[0]);
            

            this.$axios.post('/images/create', formData, config ).then( res => {
                const uploadedImage = res.data.data;
                this.userImages.unshift(uploadedImage);
                 this.isImageProcessing = false;
                
            }).catch(  err => {
                console.log(err);
                
            } )

        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
        
    },

    //choose image feature
    openImageDialog() {
      this.$axios.get('/images/').then(res  => {
        this.userImages = res.data.data;
      })        
      return (this.dialog = true);
    },
    selectImage(userImage){
        this.form.image = userImage.id;
        this.imageId = userImage.id;
        this.imageUrl = userImage.size.medium;
        this.imageFile = userImage.size.medium;
    },
    
    onSubmitPhoto(){
        console.log(this.image);
    },

    chooseFile(){
        return this.dialog = false;
    },

    editImage(userImage){
        console.log(userImage);
        
    },

    deleteImage(userImage){
        this.isImageProcessing = true;
        this.$axios.delete(`/images/${userImage.id}`).then( res => {
                this.userImages = this.userImages.filter( image => image.id !== userImage.id );
                this.isImageProcessing = false;
            }).catch(  err => {
                console.log(err);
                
            } )
    },

    publish(status){
      this.form.status = status;
      this.$axios.post('/layouts/create', this.form).then(res => {
        this.snackbar = true;
        this.reset();
      }).catch(err => {
        console.log(err);
        
      })
    }, 

    reset(){
      this.imageId = "";
      this.imageName = "";
      this.imageUrl = "";
      this.imageFile = "";
      this.form.title = "";
      this.form.description = "";
      this.form.image = "";
    }
  },

  mounted() {
    
  }
};
</script>