<template>
    <v-card>
        <v-card-title> List of USERS: {{ users.name }} </v-card-title>
        <v-card-text>
            <v-list>
                <v-list-item v-for="user in users" :key="user">
                    {{ user.name }}
                    {{ user.password }}
                    {{ user.games }}
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
  computed: mapState({
    users: state => state.users
  }),
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
