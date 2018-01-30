<template>
  <v-dialog persistent  v-model="bookmarkDialog">
      <v-btn  v-if="userHasBookmarked" dark class="deep-orange darken-4" accent slot="activator">
        Unbookmark Post
          <v-icon>bookmark</v-icon>
      </v-btn>
      <v-btn  v-else dark class="blue darken-1" accent slot="activator">
        Bookmark Post
          <v-icon>bookmark_border</v-icon>
      </v-btn>
      <v-card>
          <v-container>
              <v-layout row wrap>
                  <v-flex xs12>
                      <v-card-title v-if="userHasBookmarked">
                         Unbookmark
                      </v-card-title>
                        <v-card-title v-else>
                         Bookmark 
                      </v-card-title>
                  </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-layout row wrap>
                  <v-flex xs12>
                       <v-card-text>
                           You can always change your minde
                       </v-card-text>
                  </v-flex>
              </v-layout>
              <v-layout row wrap>
                  <v-flex xs12>
                      <v-card-actions>
                          <v-btn flat class="red--text darken-1" @click="bookmarkDialog = false">Cancel</v-btn>
                          <v-btn flat class="green--text darken-1" @click="onAgree">Confirm</v-btn>
                      </v-card-actions>
                  </v-flex>
              </v-layout>
          </v-container>
      </v-card>
  </v-dialog>
</template>

<script>
export default {
    props:['postId'],
    data(){
        return {
            bookmarkDialog: false
        }
    },
    computed:{
        userHasBookmarked(){
            return this.$store.getters.getUser.bookmarkedPosts.findIndex(postId => {
                return postId === this.postId
            }) >= 0
        }
    }, 
    methods:{
        onAgree(){
            if(this.userHasBookmarked){
                this.$store.dispatch('unBookmarkPost', this.postId)
                this.bookmarkDialog = false
            } else {
                this.$store.dispatch('bookmarkPost', this.postId)
                this.bookmarkDialog = false
            }
        }
    }
  
}
</script>

