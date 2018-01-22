<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-sm-right text-xs-center">
        <v-btn class="orange lighten-2" large router to="/posts">See All Posts</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-sm-left text-xs-center">
        <v-btn class="orange lighten-2" large router to="/createpost">Write New Post</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item v-for="post in posts" v-bind:src="post.imgUrl" :key="post.id">
            <div class="title">{{post.title}}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        posts: [{
            imgUrl: 'http://lorempixel.com/output/nature-q-c-785-376-1.jpg',
            id: 'qsjhdqshdqshdkjqd',
            title: 'My First Post'
  
          },
          {
            imgUrl: 'http://lorempixel.com/output/nature-q-c-785-376-6.jpg',
            id: 'hdqshdkjqshdkqj',
            title: 'My Second Post'
  
          }
        ]
      }
    }
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
    width:100%;
    text-align: center;
  }
</style>

