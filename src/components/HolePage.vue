<template>
  <div>
      <v-card
        class="mx-auto pa-8"
        max-width="570">
        <!-- Basic Form -->
        <div>
          <v-form>
            <!-- <h1> {{ user.username }} </h1> -->
            <v-text-field v-model="hole.number" placeholder="Hole Number" type="number"/>
            <v-text-field v-model="hole.yards" placeholder="Yards" type="number"/>
            <v-text-field v-model="hole.par" placeholder="Par" type="number"/>
            <v-text-field v-model="hole.tee" placeholder="Tee (Black, Blue, White, Yellow, Red)"/>
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

            <gmap-polygon :paths="hole.shots.map(h => h.position)"></gmap-polygon>
          </gmap-map>

        <v-row
        align="center"
        justify="space-around">
          <v-btn large color="green" @click="createNewHole" class="pa-8">Tee Off</v-btn>
          <v-btn large color="secondary" @click="drawDirection"  class="pa-8">Shot</v-btn>
          <v-btn large color="yellow" @click="clearMap"  class="pa-8">Holed</v-btn>
          <v-btn large color="red" @click="finishRound"  class="pa-8">Finish Round</v-btn>
        </v-row>
        <!-- Display's data from Game -->
        <!-- <p> Shot: {{shot}} </p>
        <p> Hole: {{theHole}} </p>
        <p> Game: {{game}} </p> -->
      </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// const test = { lat: 38.42345466879392, lng: -78.87565709341992 }
// const test2 = { lat: 38.4242274, lng: -78.872773 }

export default {
  data () {
    return {
      map: null,
      markers: [],
      paths: [],
      myCoordinates: {}
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
      const position = {
        lat: this.myCoordinates.lat,
        lng: this.myCoordinates.lng
      }
      this.theHole.shots.push({ time: new Date(), position, club: '' })
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
    },
    drawDirection () {
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
    },
    clearMap () {
      this.paths = []
      this.markers = []
      this.shot = 0
    },
    finishRound () {
      this.game++
    }
  },
  created () {
    this.$store.dispatch('GET_USER')
    // get user's coords
    this.$watchLocation({
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
      hole: 'hole'
    })
  }
}
</script>
