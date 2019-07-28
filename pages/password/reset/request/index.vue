<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <v-card ref="form">
            <v-card-text align-center>
              <v-toolbar-title>CHANGE YOUR ACCOUNT PASSWORD</v-toolbar-title>
            </v-card-text>
            <v-card-text>
              <v-text-field
                v-model="form.email"
                v-validate="'required|email'"
                :error-messages="errors.collect('email')"
                label="E-mail"
                data-vv-name="email"
                readonly
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
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary text-sm-center" @click.prevent="change">Change password</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-snackbar v-model="snackbar" :color="color">
          {{ text }}
          <v-btn color="pink" flat @click="redirect">LOGIN</v-btn>
        </v-snackbar>


      </v-layout>
    </v-container>
  </v-content>
</template>


<script>
import Vue from "vue";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate);
export default {
  $_veeValidate: {
    validator: "new"
  },
  data: () => ({
      snackbar: false,
      color: "",
      text: "",
    form: {
      email: "",
      password: "",
      password_confirmation: "",
      token: "",
      dictionary: {
        attributes: {
          email: "E-mail Address"
          // custom attributes
        },
        custom: {
          name: {
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
          }
        }
      }
    }
  }),

  async mounted() {
    await this.$validator.localize("en", this.form.dictionary);
    await this.$axios.get(this.$route.query.query).then(res => {
      this.form = res.data;
    });
  },

  methods: {
    async change() {
        await this.$axios.post('/password/reset', 
            this.form
        )
        .then((res) => {
            
            this.text = "Your password have been changed!";
            this.color = 'success';
            this.snackbar = true;
        })
        .catch((error) => {

        })
    },

    redirect(){
        this.$router.push('/login')
    }
  },

};
</script>