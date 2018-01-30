<template>
    <v-container>
    <v-layout>
      <v-flex xs12 class="text-xs-center">
         <v-progress-circular 
         indeterminate color="primary"
         :width="5"
         :size="20"
         v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
        <v-layout row wrap>
            <v-flex xs12>
            <v-card v-if="!loading">
                <v-card-title dark class="text-xs-left accent white--text">
                    <v-layout row>
                    <h2 dark style="width:100%" class="">{{post.title}}</h2>
                    <template v-if="userIsAuthor">
                        <v-spacer></v-spacer>
                        <app-edit-post-details :post="post"></app-edit-post-details>

                    </template>
                    </v-layout>
             

                </v-card-title>
                   <v-card-media :src="post.imgUrl" height="400px">
                  </v-card-media>
                  <v-card-text>
                      <div class="accent--text">{{post.date | moment("DD MMMM YYYY, à HH:mm")}}</div>
                       <div class="primary--text mb-3">
                           {{post.description}}
                          </div>
                          
                        <div class="text-xs-justify">
                           {{post.content}}
                          </div>
                  </v-card-text>
                   <v-divider v-if="userIsAuth && !userIsAuthor"></v-divider>
                   <v-card-actions v-if="userIsAuth && !userIsAuthor">
                       <app-bookmark-dialog :postId="post.id" ></app-bookmark-dialog>
                   </v-card-actions>
            </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    loading(){
      return this.$store.getters.loading
    },
    post() {
      return this.$store.getters.loadedPost(this.id);
    },
    userIsAuth() {
      return this.$store.getters.getUser;
    },
    userIsAuthor() {
      if (!this.$store.getters.getUser) {
        return false;
      }
      return this.$store.getters.getUser.id == this.post.authorId;
    }
  }
};
</script>
