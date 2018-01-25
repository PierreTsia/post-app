<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
            <v-card>
                <v-card-title dark class="text-xs-left accent white--text">
                    <h2 dark style="width:100%" class="">{{post.title}}</h2>
             

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
                   <v-divider></v-divider>
                   <v-card-actions>
                        <v-flex class="text-xs-right">
                            <v-btn light flat class="accent--text">
                                <v-icon>bookmark</v-icon>
                            </v-btn>
                        </v-flex>
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
    post() {
      return this.$store.getters.loadedPost(this.id);
    }
  }
};
</script>
