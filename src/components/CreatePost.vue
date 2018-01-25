<template>
 <v-container>
   <v-layout row>
     <v-flex xs12 sm6 offset-sm3>
       <h2 class="primary--text">Create new post</h2>
     </v-flex>
   </v-layout>
   <v-layout row>
     <v-flex xs12 sm6 offset-sm3>
       <form @submit.prevent="onCreatePost">
         <v-layout >
            <v-text-field
            name="title"
            label="New post title"
            id="title"
            v-model="title"
            required
            ></v-text-field>
         </v-layout>
         <v-layout >
            <v-text-field
            name="description"
            label="New post description"
            id="description"
            v-model="description"
            required
            ></v-text-field>
         </v-layout>
           <v-layout >
            <v-text-field
            name="imgUrl"
            label="Image URL"
            id="imgUrl"
            v-model="imgUrl"
            required
            ></v-text-field>
         </v-layout>
         <v-layout row  xs12 sm6 offset-sm3>
           <v-flex>
             <img :src="imgUrl" height="200">
           </v-flex>
         </v-layout>
           <v-layout >
            <v-text-field
            name="content"
            label="New post content"
            id="content"
            v-model="content"
            required
            textarea
            rows="10"
            ></v-text-field>
         </v-layout>
         <v-layout row>
           <v-flex xs12>
             <v-btn type="submit" class="accent" :disabled="!formIsValid">Create Post</v-btn>
           </v-flex>
         </v-layout>
       </form>
     </v-flex>
   </v-layout>

 </v-container>
</template>

<script>
export default {
  data(){
    return {
      title:'',
      description:'',
      imgUrl:'',
      content:'',
      date :'',
        }
  },
  computed:{
    formIsValid(){
      return this.title != '' && this.description != '' && this.imgUrl != '' && this.content != '' 
    }
  },
  methods: {
    onCreatePost(){
      if(!this.formIsValid){
        return
      }
      const newPost ={
        title : this.title,
        description : this.description,
        imgUrl : this.imgUrl,
        content: this.content,
        date : new Date()
        
      }
      this.$store.dispatch('createPost', newPost)
      this.$router.push('/posts')
    }
  }
}
</script>
