<template>
    <v-card>
        <v-card-title>Chat</v-card-title>
        <v-card-text>
            <v-list>
                <v-list-item v-for="message in messages" :key="message._id">
                    <strong>{{ message.user }} </strong>
                    {{ message.message}}
                </v-list-item>
            </v-list>
        </v-card-text>
        <v-card-actions>
            <v-text-field
                v-model="msg"
                label="Message"
                @keydown.enter="sendMessage"
            />
            <v-btn
              @click="sendMessage"
            />

        </v-card-actions>
    </v-card>
</template>

<script>
import { mapState } from 'vuex'
import { api } from '@/services/messages'
export default {
  name: 'ChatPage',
  data: () => ({
    api,
    messages: [],
    msg: '',
    user: ''
  }),
  mounted () {
    // this.user = this.$store.state.user.name
    this.api.service('messages').find({}).then(res => {
      this.messages = res.data
    })
    this.api.service('messages').on('created', msg => this.messages.push(msg))
  },
  methods: {
    sendMessage () {
      this.api.service('messages').create({ message: this.msg, user: this.user })
    },
    ...mapState({
      users: state => state.users
    })
  },
  created () {
    this.$store.dispatch('GET_USER')
  }
}
</script>
