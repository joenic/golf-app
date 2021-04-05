<template>
    <v-card>
        <v-card-title> List of USERS:</v-card-title>
        <h1> {{ $store.state.user.username }} </h1>
        <v-card-text>
            <v-list>
                <v-list-item v-for="user in users" :key="user">
                    {{ user.username }}
                    {{ user.password }}
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  created () {
    this.$store.dispatch('GET_USER')
  },
  computed: mapState(['users']),
  watch: {
    users: {
      deep: true,
      immediate: true,
      handler () {

      }
    }
  }
}
</script>
