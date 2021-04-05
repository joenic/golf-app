<template>
  <div>
    <v-card>
      <h1 style="pa-2">My Games</h1>
      <v-list>
        <v-list-item v-for="game in games" :key="game._id">
          {{game.courseName}}
          {{format(new Date(game.createdAt), 'MMM do, yyyy')}}
        </v-list-item>
      </v-list>
    </v-card>
    <v-card>
      <h1>Start Game</h1>
      <v-text-field v-model="courseName" placeholder="Course Name"></v-text-field>
       <date-time-picker
        v-model="teeTime"
        label="Tee Time"
      />
            <v-btn
              large
              color="Orange"
              block
              type="submit"
              @click="NEW_GAME"
              >Play!</v-btn>
    </v-card>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
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
            tee: 'Blue'
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
