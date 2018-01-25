<template>
  <v-container>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm6 class="text-sm-right text-xs-center">
        <v-btn dark class="accent secondary--text" large router to="/posts">See All Posts</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-sm-left text-xs-center">
        <v-btn dark class="accent secondary--text" large router to="/createpost">Write New Post</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-xs-center">
         <v-progress-circular 
         indeterminate color="primary"
         :width="5"
         :size="20"
         v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mb-2">
      <v-flex xs12>
        <v-carousel v-if="!loading">
          <v-carousel-item style="cursor:pointer" @click="onLoadPost(post.id)" v-for="post in posts" v-bind:src="post.imgUrl" :key="post.id">
            <div class="title"> <div>{{post.title}}</div>  
            <span style="font-size:0.7em" class="mt-1 warning--text">{{post.date | moment("DD MMMM YYYY, à HH:mm")}}</span>
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 class="text-xs-center">
        <p>Welcome to this awesome app !</p>
      </v-flex>
  
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      posts() {
        return this.$store.getters.featuredPosts
        console.log(this.posts)
      },
      loading(){
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadPost(id) {
        this.$router.push('/posts/' + id)
      }
    },
  }
</script>

<style <style scoped>
  v-carousel-item {
    position: relative;
  }
  
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
</style>

