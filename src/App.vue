<template>
  <v-app>
    <v-toolbar dark class="primary">
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
       <span class="hidden-xs-only" v-if="userIsAuth" @click="onLogOut">
             <v-btn flat>
            <v-icon left>exit_to_app</v-icon>
            Logout
            </v-btn>
         
       </span>
      
    </v-toolbar>
    <v-navigation-drawer  fixed temporary dark v-model="sideNav" class="primary secondary--text hidden-sm-and-up">
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
          <v-list-tile>
          <v-btn flat style="width:100%">
            <v-list-tile-action  v-if="userIsAuth" @click="onLogOut">
              <v-icon left>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              Logout
            </v-list-tile-content>
          </v-btn>
        </v-list-tile>
      </v-list>

  
    </v-navigation-drawer>
  
    <main class="warning">
      <router-view></router-view>
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
  methods : {
    onLogOut(){
      this.$store.dispatch("logout")
    }
  },
  computed: {
    menuItems() {
      let menuItems = [
        {
          icon: "face",
          title: "Sign Up",
          link: "/signup"
        },
        {
          icon: "lock_open",
          title: "Sign In",
          link: "/signin"
        }
      ];
      if (this.userIsAuth) {
        menuItems = [
          {
            icon: "view_list",
            title: "View Posts",
            link: "/posts"
          },
          {
            icon: "create",
            title: "New Post",
            link: "/post/new"
          },
          {
            icon: "person",
            title: "Profile",
            link: "/profile"
          }
        ];
      }
      return menuItems;
    },
    userIsAuth() {
      return (
        this.$store.getters.getUser != null &&
        this.$store.getters.getUser != undefined
      );
    }
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

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

