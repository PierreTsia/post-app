<template>
  <v-dialog width="350px" persistent v-model="editDialog">
      <v-btn  class="primary" fab accent slot="activator">
          <v-icon>edit</v-icon>
      </v-btn>
      <v-card> 
          <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-title> <h3>Edit Post</h3> </v-card-title>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row>
                <v-flex xs12>
                    <v-card-text>
                        <v-text-field
                        name="title"
                        label="New post title"
                        id="title"
                        v-model="editedTitle"
                        required
                        ></v-text-field>
                        <v-text-field
                        name="description"
                        label="New post description"
                        id="description"
                        v-model="editedDescription"
                        required
                        ></v-text-field>
                          <v-text-field
                        name="content"
                        label="New post content"
                        id="content"
                        v-model="editedContent"
                        required
                        textarea
                        rows="10"
                        ></v-text-field>
                    </v-card-text>
                </v-flex>    
            </v-layout> 
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-actions>
                        <v-btn flat dark class="red darken-1" @click="editDialog = false">Close</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn flat class="success" @click="onSaveChanges">Save</v-btn>
                    </v-card-actions>
                </v-flex>
            </v-layout>       
          </v-container>
      </v-card>
  </v-dialog>
</template>

<script>
export default {
  props:['post'],  
  data(){
      return {
          editDialog: false,
          editedTitle: this.post.title,
          editedDescription: this.post.description,
          editedContent: this.post.content,
      }
  },
  methods:{
      onSaveChanges(){
          if(this.editedTitle == '' || this.editedDescription == '' || this.editedContent == '' ){
              return
          }
          this.editDialog = false
          this.$store.dispatch('updatePostData', {
              id: this.post.id,
              title : this.editedTitle,
              description : this.editedDescription,
              content : this.editedContent
        })
        this.$store.dispatch('loadPosts')
      }
  }
}
</script>

