<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-data-table
      :headers="headers"
      :items="Hole"
      class="elevation-1"
    >
      <template v-slot:item.FH= "{ item }">
        <v-simple-checkbox
          v-model="item.FH"
        ></v-simple-checkbox>
      </template>

      <template v-slot:item.GIR= "{ item }">
        <v-simple-checkbox
          v-model="item.GIR"
        ></v-simple-checkbox>
      </template>

      <template v-slot:item.Score= "props">
        <v-edit-dialog
          :return-value.sync="props.item.Score"
          large
          persistent
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div>{{ props.item.Score }}</div>
          <template v-slot:input>
            <div class="mt-4 title">
              Enter Score
            </div>
            <v-text-field
              v-model="props.item.Score"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:item.Putt="props">
        <v-edit-dialog
          :return-value.sync="props.item.Putt"
          large
          persistent
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div>{{ props.item.Putt }}</div>
          <template v-slot:input>
            <div class="mt-4 title">
              Enter Putts
            </div>
            <v-text-field
              v-model="props.item.Putt"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

    </v-data-table>

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
        { text: 'Par', value: 'Par' },
        { text: 'Score', value: 'Score' },
        { text: 'Putts', value: 'Putt' },
        { text: 'Green in Reg', value: 'GIR' },
        { text: 'Fairway Hit', value: 'FH' }
      ],
      Hole: [
        {
          name: '1',
          Par: 4,
          Score: 6.0,
          Putt: 24,
          GIR: false,
          FH: false
        },
        {
          name: '2',
          Par: 4,
          Score: 6.0,
          Putt: 24,
          GIR: false,
          FH: false
        },
        {
          name: '3',
          Par: 3,
          Score: 6.0,
          Putt: 24,
          GIR: false,
          FH: false
        },
        {
          name: '4',
          Par: 4,
          Score: 6.0,
          Putt: 24,
          GIR: false,
          FH: false
        },
        {
          name: '5',
          Par: 4,
          Score: 6.0,
          Putt: 24,
          GIR: false,
          FH: false
        },
        {
          name: '6',
          Par: 3,
          Score: 6.0,
          Putt: 24,
          GIR: false,
          FH: false
        },
        {
          name: '7',
          Par: 5,
          Score: 6.0,
          Putt: 24,
          GIR: false,
          FH: false
        },
        {
          name: '8',
          Par: 3,
          Score: 6.0,
          Putt: 24,
          GIR: false,
          FH: false
        },
        {
          name: '9',
          Par: 4,
          Score: 6.0,
          Putt: 24,
          GIR: false,
          FH: false
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
  }
}
</script>

<style scoped>

</style>
