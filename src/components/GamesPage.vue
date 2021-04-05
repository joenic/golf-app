<template>
  <div>
    <v-container fluid fill-height>
      <v-layout align center justify-center>
        <v-flex sm12 sm15 md14>
          <v-card class="elevation-14" color="primary lighten-4">
            <v-toolbar dark color="primary darken-1">
              <v-toolbar-title>My Games</v-toolbar-title>
            </v-toolbar>
            <v-list>
              <v-list-item v-for="game in games" :key="game._id">
                <strong>{{game.courseName}}</strong>
                <v-spacer />
                {{format(new Date(game.createdAt), 'MMM do, yyyy')}}
              </v-list-item>
            </v-list>
          </v-card>
          <v-card class="elevation-14" color="primary lighten-4">
            <v-toolbar dark color="primary darken-1">
              <v-toolbar-title>Start Game</v-toolbar-title>
            </v-toolbar>
            <v-text-field
              class="pa-2 ma-auto"
              v-model="courseName"
              placeholder="Course Name" />
            <date-time-picker
              v-model="teeTime"
              label="Tee Time"
            />
                  <v-btn
                    large
                    color="primary darken-1"
                    block
                    type="submit"
                    @click="NEW_GAME"
                    >Play!</v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { format } from 'date-fns'
import { restapi } from '@/services/messages.js'
import { mapGetters } from 'vuex'
import DateTimePicker from '@/components/DateTimePicker'
export default {
  components: {
    DateTimePicker
  },
  data () {
    return {
      courseName: '',
      teeTime: (new Date()).toISOString()
    }
  },
  methods: {
    format,
    // NEW_USER method dispatches the local user data to the VUEX store that can then be pushed to the array and then further to the api end point
    NEW_GAME () {
      const { games, _id } = this.$store.state.user
      const newGame = {
        courseName: this.courseName,
        createdAt: new Date(),
        teeTime: new Date(this.teeTime),
        isWalking: true,
        frontNine: '',
        backNine: '',
        holes: [
          {
            shots: [
              {
                time: 0,
                position: {
                  lat: 0,
                  lng: 0
                },
                club: ''
              }
            ],
            number: 1,
            yards: 0,
            par: 3,
            tee: 'Blue',
            pin: {
              lat: 0,
              lng: 0
            }
          }
        ]
      }
      games.push(newGame)
      restapi.service('users').patch(_id, { games }).then(user => {
        this.$store.dispatch('UPDATE_USER', user)
        const currentGame = user.games[user.games.length - 1]._id
        this.$store.dispatch('UPDATE_CURRENT_GAME', currentGame)
        this.$router.push('/game')
      }).catch(error => console.log('Did not work!', error.message))
    }
  },
  computed:
    mapGetters(['games'])
}
</script>

<style>

</style>
