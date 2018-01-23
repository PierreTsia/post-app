<template>
  <v-container>
  
  
    <v-layout row wrap>
      <v-flex v-for="post in posts" :key="post.id" xs12 md4 sm6 class="pr-2 mb-2">
        <v-card>
          <v-card-media :src="post.imgUrl" height="200px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{post.title}}</h3>
              <span class="accent--text">{{post.date}}</span>
              <div>{{post.content}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat class="primary secondary--text" :to="'/posts/'+ post.id">
              <v-icon left>arrow_forward</v-icon>
              View Post
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      posts() {
        return this.$store.getters.loadedPosts
      }
    }
  }
</script>

