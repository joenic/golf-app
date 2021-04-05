<template>
  <div>
    <v-container fluid fill-height>
      <v-layout align center justify-center>
        <v-flex sm12 sm15 md14>
          <v-card class="elevation-14" color="primary lighten-4">
            <v-toolbar dark color="primary darken-1">
              <v-toolbar-title>
                <strong>Course Name: </strong>
                {{ game.courseName }}
                <v-spacer />
                <strong>Tee Time: </strong>
                {{ format(new Date(game.teeTime), "d MMM, y 'at' h:mm a") }}
              </v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-row>
                <v-form>
                  <v-text-field v-model="game.frontNine" placeholder="Front Nine"></v-text-field>
                  <v-text-field v-model="game.backNine" placeholder="Back Nine"></v-text-field>
                </v-form>
                <v-btn
                  large
                  color="primary darken-1"
                  block
                  type="submit"
                  @click="NEW_NINE"
                  >Tee Off!</v-btn>
              </v-row>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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
