<template>
  <v-app>
    <v-toolbar dark class="deep-orange darken-4">
      <v-toolbar-side-icon class="hidden-sm-and-up" @click.native.stop="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title>My Post App</v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="hidden-xs-only" v-for="item in menuItems" :key="item.title">
           <v-btn flat>
          <v-icon>{{item.icon}}</v-icon>
          {{item.title}}
          </v-btn>
       
        </span>
    </v-toolbar>
    <v-navigation-drawer v-model="sideNav" class="hidden-sm-and-up">
      <v-list>
          <v-list-tile v-for="item in menuItems" :key="item.title">
          <v-btn flat>
            <v-list-tile-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              {{item.title}}
            </v-list-tile-content>
          </v-btn>
        </v-list-tile>
      </v-list>
  
    </v-navigation-drawer>
  
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        sideNav: false,
        menuItems: [{
            icon: "view_list",
            title: "View Posts"
          },
          {
            icon: "create",
            title: "New Post"
          },
          {
            icon: "person",
            title: "Profile"
          },
          {
            icon: "face",
            title: "Sign Up"
          },
          {
            icon: "lock_open",
            title: "Sign In"
          }
        ]
      };
    },
    name: "App"
  };
</script>
