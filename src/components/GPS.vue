<template>
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
  </v-card>
</template>

<script>

export default {
  data () {
    return {
      map: null,
      markers: [],
      paths: [],
      myCoordinates: {}
    }
  },
  methods: {
    drawMarkers () {
      this.markers = [
        {
          position: {
            lat: this.myCoordinates.lat,
            lng: this.myCoordinates.lng
          }
        }
      ]
    },
    drawDirection () {
      this.paths = []
    },
    clearMap () {
      this.paths = []
      this.markers = []
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
