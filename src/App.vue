<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      v-if="['Login'].indexOf($route.name) === -1"
      app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Welcome {{ user.username }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Enjoy a game with your friends
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

<v-app-bar
      app
      color="#6A76AB"
      dark
      src="Background.jpg"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <!-- <v-app-bar-title>SubPar</v-app-bar-title> -->

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    drawer: null,
    items: [
      { title: 'Sign Out', icon: 'mdi-view-dashboard', to: '/' },
      { title: 'My Games', icon: 'mdi-golf-tee', to: '/games' },
      { title: 'Start Game', icon: 'mdi-golf', to: '/hole' },
      { title: 'Scorecard', icon: 'mdi-lead-pencil', to: '/scorecard' },
      // { title: 'Leaderboard', icon: 'mdi-trophy', to: '' },
      { title: 'Chat', icon: 'mdi-chat', to: '/chat' }
    ]
  }),
  computed: mapState({
    user: 'user'
  }),
  routes: [
    { path: '/' }
  ]
}
</script>
