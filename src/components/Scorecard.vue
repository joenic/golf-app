<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-toolbar dark color="primary darken-1">
              <v-toolbar-title>
                <strong>Course Name: </strong>
                {{ game.courseName }}
                <v-spacer />
                <strong>Tee Time: </strong>
                {{ format(new Date(game.teeTime), "d MMM, y 'at' h:mm a") }}
              </v-toolbar-title>
            </v-toolbar>
    <template>
      <v-data-table
        :headers="headers"
        :items="Hole"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </template>

    <v-snackbar
      v-model="snack"
      :timeout="3000"
      :color="snackColor"
    >
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          v-bind="attrs"
          text
          @click="snack = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      snack: false,
      snackColor: '',
      snackText: '',
      max25chars: v => v.length <= 25 || 'Input too long!',
      pagination: {},
      headers: [
        {
          text: 'Hole',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Par', value: 'par' },
        { text: 'Score', value: 'shot' }
      ],
      Hole: [
        {
          name: 'Hole 1',
          par: 0,
          shot: this.$store.getters.hole1shots
        }
      ]
    }
  },
  methods: {
    save () {
      this.snack = true
      this.snackColor = 'success'
      this.snackText = 'Data saved'
    },
    cancel () {
      this.snack = true
      this.snackColor = 'error'
      this.snackText = 'Canceled'
    },
    open () {
      this.snack = true
      this.snackColor = 'info'
      this.snackText = 'Dialog opened'
    },
    close () {
      console.log('Dialog closed')
    }
  },
  computed:
    mapGetters(['game'])
}

</script>
