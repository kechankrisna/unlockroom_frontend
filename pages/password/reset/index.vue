<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Reset password</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="person"
                v-model="form.email"
                v-validate="'required|email'"
                :error-messages="errors.collect('email')"
                label="E-mail"
                data-vv-name="email"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <nuxt-link color="primary" flat to="/register">Register an account?</nuxt-link>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click.prevent="reset">Reset</v-btn>
          </v-card-actions>
        </v-card>

        <v-snackbar v-model="snackbar" :color="color">
          {{ text }}
          <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
        </v-snackbar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);

export default {
  layout: "login",
  $_veeValidate: {
    validator: "new"
  },

  data() {
    return {
      text: "",
      timeout: 6000,
      snackbar: false,
      color: "",
      form: {
        email: "",

        dictionary: {
          attributes: {
            email: "E-mail Address"
            // custom attributes
          }
        }
      }
    };
  },
  mounted() {
    this.$validator.localize("en", this.form.dictionary);
  },
  methods: {
    async reset() {
      const isValid = await this.$validator.validateAll();
      if (isValid) {
        let res = await this.$axios.post("/password/create", this.form)
        .then((res) => {
            this.color = "success";
            this.text = res.data.message;
            this.snackbar = true;

          
        })
        .catch((error) => {
            console.log(res);
            
            this.color = "error";
            this.text = "Something went wrong!"            
            this.snackbar = true;
        });
      }
    }
  }
};
</script>