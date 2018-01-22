<template>
  <v-app>
     <v-toolbar dark class="deep-orange darken-4">
      <v-toolbar-side-icon   class="hidden-sm-and-up" @click.native.stop="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title>My Post App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-item class="hidden-xs-only">
         <v-btn flat>
        <v-icon>view_list</v-icon>
        View Posts
        </v-btn>
      <v-btn flat>
        <v-icon>create</v-icon>
        Create Post</v-btn>
      </v-toolbar-item>
    </v-toolbar>
    <v-navigation-drawer v-model="sideNav"
    class="hidden-sm-and-up">
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>view_list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            View Posts
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>create</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Create Post
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>
   
    <main>

    </main>
  </v-app>
 </template>

<script>
export default {
  data() {
    return {
      sideNav: false
    };
  },
  name: "App"
};
</script>
