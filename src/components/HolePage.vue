<template>
  <div>
      <v-card
        class="mx-auto"
        max-width="300">
        <div style="pa-3">
          <h1>Your Coordinates:</h1>
          <p>{{ myCoordinates.lat }} Latitude, {{ myCoordinates.lng }} Longitude</p>
        </div>
        <div>
          <h1>Map Coordinates:</h1>
          <p>{{ mapCoordinates.lat }} Latitude, {{ mapCoordinates.lng }} Longitude</p>
          <tr v-for="(m, index) in markers" :key="index">
            <td>
              <input type="number" v-model.number="m.position.lat">
            </td>
            <td>
              <input type="number" v-model.number="m.position.lng">
            </td>
          </tr>
        </div>
          <gmap-map
            :center="myCoordinates"
            :zoom="17"
            map-type-id="terrain"
            style="width: 300px; height: 500px"
            ref="mapRef"
          >
            <gmap-marker
              :key='index'
              v-for= '(m, index) in markers'
              :position = 'm.position'
              :clickable = 'true'
              :draggable = 'true'
              @click = 'center = m.postion'
            ></gmap-marker>

            <gmap-polygon :paths="paths">

            </gmap-polygon>
          </gmap-map>
        <v-btn large color="green" @click="drawMarkers">Tee Off</v-btn>
        <v-btn large color="secondary" @click="drawDirection">Shot</v-btn>
        <v-btn large color="red" @click="clearMap">Holed</v-btn>
        <v-btn large color="red" @click="finishRound">Finish Round</v-btn>

        <!-- Display's data from Game -->
        <p> Shot: {{shot}} </p>
        <p> Hole: {{theHole}} </p>
        <p> Game: {{game}} </p>
      </v-card>
  </div>
</template>

<script>

export default {
  props: {
    hole: {
      type: Object,
      default: () => ({
        shots: [
          {
            time: new Date(),
            position:
              {
                lat: 0,
                lng: 0
              },
            club: ''
          }
        ],
        number: 0,
        yards: 0,
        par: 0,
        tee: ''
      })
    }
  },
  data () {
    return {
      game: 0,
      theHole: this.hole,
      shot: 0,
      map: null,
      markers: [],
      paths: [],
      myCoordinates: {}
    }
  },
  watch: {
    theHole: {
      deep: true,
      handler (newHole, oldHole) {
        // Check to see if we need to draw a new polyline
        if (newHole.shots.length - this.paths.length === 2) {
          this.paths.push(newHole.shots[newHole.shots.length - 1].position)
        }
      }
    }
  },
  methods: {
    createNewHole () {
      const position = {
        lat: this.myCoordinates.lat,
        lng: this.myCoordinates.lng
      }
      this.theHole.shots.push({ time: new Date(), position, club: '' })
      this.paths.push(position)
    },
    drawDirection () {
      this.paths = []
      this.markers.push({
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
      this.hole++
    },
    finishRound () {
      this.game++
      this.hole = 0
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
    }
  }
}
</script>
