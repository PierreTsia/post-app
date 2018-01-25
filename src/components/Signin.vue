<template>
<v-container>
   <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <app-alert v-if="error" @dismissed="onDismissed" :text="error.message"></app-alert>
    </v-flex>
  </v-layout>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-text>
          <v-container>
            <form @submit.prevent="onSignIn">
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                  name="email"
                  label="e-mail"
                  id="email"
                  v-model="email"
                  required
                  type="email"
                  ></v-text-field>
                </v-flex>
              </v-layout>
                <v-layout row>
                <v-flex xs12>
                  <v-text-field
                  name="password"
                  label="password"
                  id="password"
                  v-model="password"
                  required
                  type="password"
                  ></v-text-field>
                </v-flex>
              </v-layout>
               
              <v-layout row>
                <v-flex xs12>
                  <v-btn :disabled="loading" 
                  :loading="loading" 
                  type="submit">
                  Sign in
                  <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                  </span>
                  </v-btn>
                </v-flex>
              </v-layout>
            </form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password :"",
    }
  },
  computed:{
    user(){
      return this.$store.getters.getUser
    },
    error() {
      return this.$store.getters.error;
    },
    loading(){
      return this.$store.getters.loading
    }
  },
  watch: {
    user (value){
      if (value !=null && value != undefined) {
        return this.$router.push('/')
      }
    }
  },
  methods:{
    onSignIn() {
      this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
    },
    onDismissed() {
      console.log("dismissed");
      this.$store.dispatch("clearError");
    }
  }
}
</script>

