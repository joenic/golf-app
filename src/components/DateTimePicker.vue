<template>
  <v-dialog
      ref="dialog"
      v-model="showDialog"
      persistent
      width="300"
    >
      <template #activator="{ attrs, on }">
        <v-text-field
          :value="formattedDatetime"
          v-bind="attrs"
          outlined
          readonly
          single-line
          v-on="on"
        />
      </template>
      <v-card>
        <v-tabs
          v-model="tab"
          centered
          grow
        >
          <v-tab><v-icon>mdi-calendar</v-icon></v-tab>
          <v-tab><v-icon>mdi-clock</v-icon></v-tab>
        </v-tabs>
        <v-tabs-items
          v-model="tab"
        >
          <v-tab-item>
            <v-date-picker
              v-model="date"
              full-width
              @change="tab = 1"
            />
          </v-tab-item>
          <v-tab-item>
            <v-time-picker
              v-model="adjustedTime"
              full-width
              use-seconds
              @change="$refs.dialog.save()"
            />
          </v-tab-item>
        </v-tabs-items>
        <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary lighten-4 primary--text"
              @click="cancel"
            >
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              @click="$refs.dialog.save()"
            >
              OK
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { addMinutes, format } from 'date-fns'
export default {
  name: 'DateTimePicker',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showDialog: false,
      date: this.value.substr(0, 10),
      originalValue: this.value,
      time: this.value.substr(11, 8),
      tab: 0
    }
  },
  computed: {
    // adjustment necessary because the timepicker does not adjust for timezone automatically
    adjustedTime: {
      get () {
        // convert UTC to a local time string and extract the bits necessary for the picker
        return (new Date(this.datetime)).toTimeString().substr(0, 8)
      },
      set (val) {
        // use the value currently set in the picker to construct a (wrong) UTC datetime
        const d = new Date(this.date + 'T' + val + 'Z')
        // adjust it for the timezone of the user and use the time part to set the time to be stored
        this.time = addMinutes(d, d.getTimezoneOffset()).toISOString().substr(11, 8)
        // below is the format for date-fns v2.x
        // this.time = add(d, { minutes: d.getTimezoneOffset() }).toISOString().substr(11, 8)
      }
    },
    datetime () {
      return this.date + 'T' + this.time + 'Z'
    },
    formattedDatetime () {
      // NOTE: date-fns v2 is not available on CodePen so the older format
      //       is used for this example. The newer format is commented out.
      return format(new Date(this.datetime), "d MMM, y 'at' h:mm a")
      // return format(new Date(this.datetime), 'D MMM, YYYY [at] h:m A')
    }
  },
  watch: {
    datetime (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    cancel () {
      this.date = this.originalValue.substr(0, 10)
      this.time = this.originalValue.substr(11, 8)
      this.showDialog = false
    }
  }
}
</script>
