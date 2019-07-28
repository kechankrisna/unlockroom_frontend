<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
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

              <v-text-field
                prepend-icon="lock"
                v-model="form.password"
                v-validate="'required'"
                :error-messages="errors.collect('password')"
                label="Password"
                type="password"
                data-vv-name="password"
                ref="password"
                required
              ></v-text-field>
            </v-form>
            <nuxt-link color="primary" flat to="/password/reset">Forget Password?</nuxt-link>
          </v-card-text>
          <v-card-actions>
            <nuxt-link color="primary" flat to="/register">Register an account?</nuxt-link>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click.prevent="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);

export default {
  middleware: ["auth"],
  layout: "login",
  $_veeValidate: {
    validator: "new"
  },
  
  head () {
    return {
      title: `Login page`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: `Login into your account in ${this.title}` },
        
      ]
    }
  },

  data() {
    return {
      form: {
        email: "",
        password: "",
        dictionary: {
          attributes: {
            email: "E-mail Address"
            // custom attributes
          },
          custom: {
            password: {
              required: () => "Password can not be empty"
              // custom messages
            }
          }
        }
      }
    };
  },
  mounted() {
    this.$validator.localize("en", this.form.dictionary);
  },
  methods: {
    async login() {
      const isValid = await this.$validator.validateAll();
      if (isValid) {
        await this.$auth.loginWith("local", {
          data: this.form
        })
          .then(() => {
            // this.$router.push("/user");
          })
          .catch(error => {
            
            throw new Error(error);
          });
      }
    }
  }
};
</script>