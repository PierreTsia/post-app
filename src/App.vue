<template>
  <v-app>
    <v-toolbar dark class="deep-orange darken-4">
      <v-toolbar-side-icon class="hidden-sm-and-up" @click.stop="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link tag="span" style="cursor : pointer" to="/"> My Post App</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="hidden-xs-only" v-for="item in menuItems" :key="item.title">
             <v-btn flat  :to="item.link">
            <v-icon left>{{item.icon}}</v-icon>
            {{item.title}}
            </v-btn>
         
          </span>
    </v-toolbar>
    <v-navigation-drawer fixed temporary light v-model="sideNav" class="hidden-sm-and-up">
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title">
          <v-btn :to="item.link" flat style="width:100%">
            <v-list-tile-action>
              <v-icon left>{{item.icon}}</v-icon>
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
            title: "View Posts",
            link: '/posts'
          },
          {
            icon: "create",
            title: "New Post",
            link: '/createpost'
          },
          {
            icon: "person",
            title: "Profile",
            link: '/profile'
          },
          {
            icon: "face",
            title: "Sign Up",
            link: '/signup'
          },
          {
            icon: "lock_open",
            title: "Sign In",
            link: '/signin'
          }
        ]
      };
    },
    name: "App"
  };
</script>

<style scoped>
  main {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: space-between;
  }
</style>

