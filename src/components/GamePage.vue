<template>
  <div>
    <v-row>
      <v-col col="2">
        <strong>Course Name: </strong>
      </v-col>
      <v-col col="10">
        {{ game.courseName }}
      </v-col>
    </v-row>
    <v-row>
      <v-col col="2">
        <strong>Tee Time: </strong>
      </v-col>
      <v-col col="10">
        {{ format(new Date(game.teeTime), "d MMM, y 'at' h:mm a") }}
      </v-col>
    </v-row>
    <v-row>
      <v-form>
        <v-text-field v-model="game.frontNine" placeholder="Front Nine"></v-text-field>
        <v-text-field v-model="game.backNine" placeholder="Back Nine"></v-text-field>
      </v-form>
      <v-btn
        large
        color="Orange"
        block
        type="submit"
        @click="NEW_NINE"
        >Play!</v-btn>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { format } from 'date-fns'
import { restapi } from '@/services/messages.js'
export default {
  data () {
    return {
    }
  },
  computed:
    mapGetters(['game']),
  methods: {
    format,
    NEW_NINE () {
      const { games, _id } = this.$store.state.user
      restapi.service('users').patch(_id, { games }).then(user => {
        this.$store.dispatch('UPDATE_USER', user)
        const currentGame = user.games[user.games.length - 1]._id
        const currentHole = user.games.find(g => g._id === currentGame).holes[0]._id
        this.$store.dispatch('UPDATE_CURRENT_GAME', currentGame)
        this.$store.dispatch('UPDATE_CURRENT_HOLE', currentHole)
        this.$router.push('/hole')
      }).catch(error => console.log('Did not work!', error.message))
    }
  }
}
</script>

<style>

</style>
