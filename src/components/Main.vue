<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Golfing App </v-list-item-title>
          <v-list-item-subtitle>
            Created to compete against friends
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
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
      { title: 'Hole Preview', icon: 'mdi-golf', to: '/gps' },
      { title: 'Scorecard', icon: 'mdi-lead-pencil', to: '/scorecard' },
      { title: 'Leaderboard', icon: 'mdi-trophy', to: '' }
    ]
  }),
  computed: mapState({
    user: 'user'
  })
}
</script>
