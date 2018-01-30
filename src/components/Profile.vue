<template>
  <div>
    <p v-for="post in user.bookmarkedPosts" :key="post.id">{{post}}</p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      bookmarkedPosts : []
    }
  },
  computed:{
    user(){
      return this.$store.getters.getUser
    },
    allPosts(){
      return this.$store.getters.loadedPosts
    },
    userBookmarkedPosts(){
      //
    }
  }
}
</script>
