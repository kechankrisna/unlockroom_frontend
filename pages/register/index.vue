<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <v-card ref="form">
            <v-flex xs12 sm7 md7>
              <v-card-text align-center>
                <v-toolbar-title>CREATE YOUR ACCOUNT</v-toolbar-title>
              </v-card-text>
              <v-card-text>
                <v-text-field
                  v-model="form.first_name"
                  v-validate="'required|max:100'"
                  :counter="100"
                  :error-messages="errors.collect('first_name')"
                  label="First name"
                  data-vv-name="first_name"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="form.last_name"
                  v-validate="'required|max:100'"
                  :counter="100"
                  :error-messages="errors.collect('last_name')"
                  label="Last name"
                  data-vv-name="last_name"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="form.email"
                  v-validate="'required|email'"
                  :error-messages="errors.collect('email')"
                  label="E-mail"
                  data-vv-name="email"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="form.password"
                  v-validate="'required'"
                  :error-messages="errors.collect('password')"
                  label="Password"
                  data-vv-name="password"
                  type="password"
                  autocomplete="off"
                  ref="password"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="form.password_confirmation"
                  v-validate="'required|confirmed:password'"
                  :error-messages="errors.collect('password_confirmation')"
                  label="Confirm Password"
                  data-vv-name="password_confirmation"
                  type="password"
                  autocomplete="off"
                  required
                ></v-text-field>

                <v-select
                  v-model="form.role"
                  v-validate="'required'"
                  :items="form.items"
                  :error-messages="errors.collect('role')"
                  label="Select"
                  data-vv-name="role"
                  required
                ></v-select>
              </v-card-text>
              <v-divider class="mt-5"></v-divider>
              <v-card-actions>
                <nuxt-link flat class="btn" color="primary" to="/login">Sign in instead</nuxt-link>

                <v-spacer></v-spacer>
                <v-btn color="primary" @click="register">register</v-btn>
              </v-card-actions>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate);

export default {
  layout: "notopbar",
  $_veeValidate: {
    validator: "new"
  },

  head() {
    return {
      title: `Register page`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: `Register your account in ${this.title}`
        }
      ]
    };
  },

  data: () => ({
    form: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "client",
      items: ["client", "partner"],
      checkbox: null,
      dictionary: {
        attributes: {
          email: "E-mail Address"
          // custom attributes
        },
        custom: {
          first_name: {
            required: () => "Name can not be empty",
            max: "The name field may not be greater than 100 characters"
            // custom messages
          },
          last_name: {
            required: () => "Name can not be empty",
            max: "The name field may not be greater than 100 characters"
            // custom messages
          },
          password: {
            required: () => "Password can not be empty"
            // custom messages
          },
          password_confirmation: {
            required: () => "Confirm Password can not be empty",
            confirm: () => "does match"
            // custom messages
          },
          role: {
            required: "Select field is required"
          }
        }
      }
    }
  }),

  mounted() {
    this.$validator.localize("en", this.form.dictionary);
  },

  methods: {
    async register() {
      const isValid = await this.$validator.validateAll();
      if (isValid) {
        await this.$axios
          .post("/auth/register", this.form)
          .then(res => {})
          .catch(error => {});
      }
    }
  }
};
</script>