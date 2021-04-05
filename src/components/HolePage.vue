<template>
  <div>
    <v-container fluid fill-height>
      <v-layout align center justify-center>
        <v-flex sm12 sm15 md14>
          <v-card
            class="elevation-14 pa-2" color="primary lighten-4">
            <!-- Basic Form -->
            <v-toolbar dark color="primary darken-1">
              <v-toolbar-title>
                <strong>
                  Enter after every hole:
                </strong>
              </v-toolbar-title>
            </v-toolbar>
              <v-card-text>
                <v-select v-model="hole.number" :items="number" label="Hole Number" type="number"/>
                <v-text-field v-model="hole.yards" label="Yards" type="number"/>
                <v-select v-model="hole.par" :items="pars" label="Par" type="number"/>
                <v-select v-model="hole.tee" :items="tee" label="Tee (Black, Blue, White, Yellow, Red)"/>
              </v-card-text>
          </v-card>

          <v-card class="elevation-14 pa-2" color="primary lighten-4">
            <v-toolbar dark color="primary darken-1">
              <v-toolbar-title>
                <strong>
                  Map: (Centers around you)
                </strong>
              </v-toolbar-title>
            </v-toolbar>
            <!-- Google Maps Component -->
              <gmap-map
                :center="myCoordinates"
                :zoom="18"
                map-type-id="satellite"
                style="width: 335px; height: 812px"
                ref="mapRef"
                align
                justify-center
              >
                <gmap-marker
                  :key='index'
                  v-for= '(shot, index) in hole.shots'
                  :position = 'shot.position'
                  :clickable = 'true'
                  :draggable = 'true'
                  @click = 'center = shot.position'
                ></gmap-marker>

                <gmap-polyline :path="polyline"></gmap-polyline>
              </gmap-map>

            <v-row
            align="center"
            justify="space-around">
              <v-btn large color="green" @click="createNewHole" class="pa-8">Tee Off</v-btn>
              <v-btn large color="secondary" @click="Shot"  class="pa-8">Shot</v-btn>
              <v-btn large color="yellow" @click="Holed"  class="pa-8">Holed</v-btn>
              <v-btn large color="red" @click="finishRound"  class="pa-8">Finish Round</v-btn>
              <v-card-text>
                <v-select v-model="shot.club" :items="clubs" label="Pick a club"/>
              </v-card-text>
            </v-row>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { restapi } from '@/services/messages.js'
export default {
  data () {
    return {
      clubs: ['Driver', '3-Wood', '3 Iron', '4 Iron', '5 Iron', '6 Iron', '7 Iron', '8 Iron', '9 Iron', 'Pitching Wedge', 'Gap Wedge', 'Lob Wedge', 'Putter'],
      number: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      tee: ['Black', 'Blue', 'White', 'Yellow', 'Red'],
      pars: [3, 4, 5],
      map: null,
      myCoordinates: {
        lat: 0,
        lng: 0
      }
    }
  },
  // watch: {
  //   theHole: {
  //     deep: true,
  //     handler (newHole, oldHole) {
  //       // Check to see if we need to draw a new polyline
  //       if (newHole.shots.length - this.paths.length === 2) {
  //         this.paths.push(newHole.shots[newHole.shots.length - 1].position)
  //       }
  //     }
  //   }
  // },
  methods: {
    createNewHole () {
      const { currentGame, user: { games, _id } } = this.$store.state
      const newHole = {
        shots: [
          {
            time: new Date(),
            position: {
              lat: this.myCoordinates.lat,
              lng: this.myCoordinates.lng
            },
            club: 'Driver'
          }
        ],
        number: this.game.holes.length + 1,
        yards: this.yards,
        par: this.hole.par,
        tee: this.hole.tee || 'Blue'
      }
      this.game.holes.push(newHole)
      restapi.service('users').patch(_id, { games }).then(user => {
        this.$store.dispatch('UPDATE_USER', user)
        const game = user.games.find(g => g._id === currentGame)
        const currentHole = game.holes[game.holes.length - 1]
        const currentShot = currentHole.shots[0]
        this.$store.dispatch('UPDATE_CURRENT_HOLE', currentHole._id)
        this.$store.dispatch('UPDATE_CURRENT_SHOT', currentShot._id)
      })
    },
    Shot () {
      const { games, _id } = this.$store.state.user
      const newShot = {
        time: new Date(),
        position: {
          lat: this.myCoordinates.lat,
          lng: this.myCoordinates.lng
        },
        club: ''
      }
      this.hole.shots.push(newShot)
      // console.log(games, this.hole)
      restapi.service('users').patch(_id, { games }).then(user => {
        this.$store.dispatch('UPDATE_USER', user)
        const currentGame = user.games[user.games.length - 1]
        const currentHole = currentGame.holes[currentGame.holes.length - 1]
        const currentShot = currentHole.shots[currentHole.shots.length - 1]
        this.$store.dispatch('UPDATE_CURRENT_GAME', currentGame._id)
        this.$store.dispatch('UPDATE_CURRENT_HOLE', currentHole._id)
        this.$store.dispatch('UPDATE_CURRENT_SHOT', currentShot._id)
      })
    },
    Holed () {
      const { games, _id } = this.$store.state.user
      this.hole.pin.lat = this.myCoordinates.lat
      this.hole.pin.lng = this.myCoordinates.lng
      restapi.service('users').patch(_id, { games }).then(user => {
        this.$store.dispatch('UPDATE_USER', user)
      })
    },

    finishRound () {
      this.$router.push('/scorecard')
    }
  },
  created () {
    // get user's coords
    this.$getLocation({
      enableHighAccuracy: true
    })
      .then(coordinates => {
        this.myCoordinates = coordinates
      })
      .catch(error => alert(error))
  },
  mounted () {
    this.$refs.mapRef.$mapPromise.then(map => { this.map = map })
  },
  watch: {
    game: {
      deep: true,
      immediate: true,
      handler (newGame) {
        // console.log(newGame)
      }
    },
    hole: {
      deep: true,
      immediate: true,
      handler (newHole) {
        // console.log(newHole)
      }
    }
  },
  computed: {
    polyline () {
      const paths = this.hole.shots.map(h => h.position)
      if (this.hole.pin && this.hole.pin.lat !== 0) {
        paths.push(this.hole.pin)
      }
      return paths
    },
    mapCoordinates () {
      if (!this.map) {
        return {
          lat: 0,
          lng: 0
        }
      }
      return {
        lat: this.map.getCenter().lat().toFixed(4),
        lng: this.map.getCenter().lng().toFixed(4)
      }
    },
    ...mapGetters({
      // create a getter to find the current game and current hole
      hole: 'hole',
      game: 'game',
      shot: 'shot'
    })
  }
}
</script>
