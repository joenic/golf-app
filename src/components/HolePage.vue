<template>
  <div>
      <v-card
        class="mx-auto pa-8"
        max-width="570">
        <!-- Basic Form -->
        <div>
          <v-form>
            <v-select v-model="newHole.number" :items="number" label="Hole Number" type="number"/>
            <v-text-field v-model="newHole.yards" label="Yards" type="number"/>
            <v-select v-model="newHole.par" :items="par" label="Par" type="number"/>
            <v-select v-model="newHole.tee" :items="tee" label="Tee (Black, Blue, White, Yellow, Red)"/>
          </v-form>
        </div>

        <!-- Google Maps Component -->
          <gmap-map
            :center="myCoordinates"
            :zoom="18"
            map-type-id="satellite"
            style="width: 500px; height: 500px"
            ref="mapRef"
          >
            <gmap-marker
              :key='index'
              v-for= '(m, index) in markers'
              :position = 'm.position'
              :clickable = 'true'
              :draggable = 'true'
              @click = 'center = m.position'
            ></gmap-marker>

            <gmap-polyline :paths="hole.shots.map(h => h.position)"></gmap-polyline>
          </gmap-map>

        <v-row
        align="center"
        justify="space-around">
          <v-btn large color="green" @click="createNewHole" class="pa-8">Tee Off</v-btn>
          <v-btn large color="secondary" @click="Shot"  class="pa-8">Shot</v-btn>
          <v-btn large color="yellow" @click="Holed"  class="pa-8">Holed</v-btn>
          <v-btn large color="red" @click="finishRound"  class="pa-8">Finish Round</v-btn>
          <v-select v-model="newShot.club" :items="clubs" label="Pick a club"/>
        </v-row>
        {{ newShot.position }}
      </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { restapi } from '@/services/messages.js'
export default {
  data () {
    return {
      clubs: ['Driver', '3-Wood', '3 Iron', '4 Iron', '5 Iron', '6 Iron', '7 Iron', '8 Iron', '9 Iron', 'Pitching Wedge', 'Gap Wedge', 'Lob Wedge'],
      number: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      tee: ['Black', 'Blue', 'White', 'Yellow', 'Red'],
      par: [3, 4, 5],
      map: null,
      markers: [],
      paths: [],
      myCoordinates: {},
      newHole: {
        shots: [],
        number: 1,
        yards: 0,
        par: 3,
        tee: 'Blue'
      },
      newShot: {
        time: new Date(),
        position: {
          lat: 0,
          lng: 0
        },
        club: ''
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
      this.paths.push({
        position: {
          lat: this.myCoordinates.lat,
          lng: this.myCoordinates.lng
        }
      })
      this.markers.push({
        position: {
          lat: this.myCoordinates.lat,
          lng: this.myCoordinates.lng
        }
      })
      const { games, _id } = this.$store.state.user
      // const newHole = {
      //   shots: [
      //     {
      //       time: 0,
      //       position: {
      //         lat: 0,
      //         lng: 0
      //       },
      //       club: ''
      //     }
      //   ],
      //   number: 1,
      //   yards: 0,
      //   par: 3,
      //   tee: 'Black'
      // }
      this.game.holes.push(this.newHole)
      restapi.service('users').patch(_id, { games }).then(user => {
        this.$store.dispatch('UPDATE_USER', user)
        const currentGame = user.games[user.games.length - 1]._id
        const currentHole = user.games.find(g => g._id === currentGame).holes[0]._id
        // this.$store.dispatch('UPDATE_CURRENT_GAME', currentGame)
        this.$store.dispatch('UPDATE_CURRENT_HOLE', currentHole)
      })
    },
    Shot () {
      this.markers.push({
        position: {
          lat: this.myCoordinates.lat,
          lng: this.myCoordinates.lng
        }
      })
      this.paths.push({
        position: {
          lat: this.myCoordinates.lat,
          lng: this.myCoordinates.lng
        }
      })
      const { games, _id } = this.$store.state.user
      // const newShot = {
      //   time: 0,
      //   position: {
      //     lat: 0,
      //     lng: 0
      //   },
      //   club: ''
      // }
      this.hole.shots.push(this.newShot)
      console.log(games, this.hole)
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
      this.paths = []
      this.markers = []
      this.hole = this.newHole()
    },
    finishRound () {
    }
  },
  created () {
    // get user's coords
    this.$getLocation({
      enableHighAccuracy: true
    })
      .then(coordinates => {
        this.myCoordinates = coordinates
        this.newShot.position.lat = coordinates.lat
        this.newShot.position.lng = coordinates.lng
      })
      .catch(error => alert(error))
  },
  mounted () {
    this.$refs.mapRef.$mapPromise.then(map => { this.map = map })
  },
  computed: {
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
      game: 'game'
    })
  }
}
</script>
