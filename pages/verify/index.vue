<template>
    <div>
        <v-snackbar v-model="snackbar" :color="color">
          {{ text }}
          <v-btn color="pink" flat @click="redirect">Login</v-btn>
        </v-snackbar>
    </div>
</template>


<script>
export default {
    data() {
        return {
            snackbar:false,
            text:"",
            color: "",
        }
    },
    async mounted(){
        await this.$axios.get(`${this.$route.query.query}&signature=${this.$route.query.signature}`)
        .then( (res) => {
            this.text = res.data.message;
            this.color = 'success';
            this.snackbar = true
        })
        .catch((error) => {

        })
    },
    methods: {
        redirect(){
            this.$router.push('/login');
        }
    },
}
</script>