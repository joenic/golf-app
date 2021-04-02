<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout align center justify-center>
        <v-flex sm12 sm15 md14>
          <v-card class="elevation-14" color="primary lighten-4">
            <v-toolbar dark color="primary darken-1">
              <v-toolbar-title>Chat <!--- {{top}} ---></v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-list
                id="messages"
                ref="messages"
                style="height: 400px; width: 875px; overflow-y: scroll"
                @newmessage="$refs.messages.$el.scrollTop=$refs.messages.$el.offsetHeight"
              >
                <v-list-item v-for="message in messages" :key="message._id"
                  v-scroll:#messages="onScroll"
                  >
                  <strong>{{ message.user }} </strong>
                  {{ message.message}}
                </v-list-item>
                </v-list>
            </v-card-text>
          <v-card-actions>
          <v-text-field
            v-model="msg"
            label="Message"
            :append-icon="marker ? 'mdi-map-marker' : 'mdi-map-marker-off'"
            :append-outer-icon="msg ? 'mdi-send' : 'mdi-microphone'"
            :prepend-icon="icon"
            filled
            clear-icon="mdi-close-circle"
            clearable
            type="text"
            @click:append="toggleMarker"
            @click:append-outer="sendMessage"
            @click:prepend="changeIcon"
            @click:clear="clearMessage"
          />
          <!-- <v-btn
            @click="sendMessage"
          /> -->

          </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import { api } from '@/services/messages'
export default {
  name: 'ChatPage',
  data: () => ({
    skip: 0,
    total: 0,
    retrieved: 0,
    api,
    messages: [],
    msg: '',
    user: 'anthony',
    marker: true,
    iconIndex: 0,
    top: 0,
    icons: [
      'mdi-emoticon',
      'mdi-emoticon-cool',
      'mdi-emoticon-dead',
      'mdi-emoticon-excited',
      'mdi-emoticon-happy',
      'mdi-emoticon-neutral',
      'mdi-emoticon-sad',
      'mdi-emoticon-tongue'
    ]
  }),
  computed: {
    icon () {
      return this.icons[this.iconIndex]
    }
  },
  mounted () {
    this.api.service('messages').find({
      query: {
        $limit: 10,
        $sort: {
          createdAt: -1
        }
      }
    }).then(res => {
      this.total = res.total
      this.retrieved = 10
      this.messages = res.data
    }).then(() => {
      const list = this.$refs.messages.$el
      list.scrollTo({ top: list.offsetHeight })
    })
    this.api.service('messages').on('created', msg => {
      this.messages.push(msg)
      const list = this.$refs.messages.$el
      setTimeout(() => {
        // console.log(list.scrollHeight)
        list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' })
      }, 10)
    })
  },
  methods: {
    sendMessage () {
      this.api.service('messages').create({ message: this.msg, user: this.user })
      this.resetIcon()
      this.clearMessage()
    },
    toggleMarker () {
      this.marker = !this.marker
    },
    clearMessage () {
      // this.message = ''
    },
    resetIcon () {
      this.iconIndex = 0
    },
    changeIcon () {
      this.iconIndex === this.icons.length - 1
        ? this.iconIndex = 0
        : this.iconIndex++
    },
    onScroll (e) {
      this.top = e.target.scrollTop
      if (e.target.scrollTop === 0) {
        const list = this.$refs.messages.$el
        const height = list.scrollHeight
        this.skip += 10
        // console.log(this.skip, this.retrieved)
        if (this.retrieved < this.total) {
          this.api.service('messages').find({ query: { $limit: 10, $sort: { createdAt: -1 }, $skip: this.skip } }).then(res => {
            // console.log(res)
            list.scrollTop = height
            this.retrieved += res.data.length
            this.messages = [...res.data, ...this.messages]
          })
        }
      }
    }
  }
}
</script>
