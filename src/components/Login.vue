<template>
  <div class="container">
    <v-card>
      <v-card-title>User Login</v-card-title>
        <v-form>
          <v-text-field v-model="username" placeholder="User Name" class="form-control pa-2" type="text" prepend-inner-icon="mdi-account-circle"></v-text-field>
          <v-text-field
            prepend-inner-icon="mdi-lock"
            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show3 ? 'text' : 'password'"
            name="input-10-2"
            label="Password"
            hint="At least 8 characters"
            class="input-group--focused pa-2"
            @click:append="show3 = !show3"
          ></v-text-field>

          <router-link to="/">
            <v-btn
              large
              color="green"
              block
              type="submit"
              >Login</v-btn>
          </router-link>
        </v-form>
    </v-card>
  </div>
</template>

<script>
import { restapi } from '@/services/messages'
export default {
  // This is the local data for the component. The user key is calling a method newUser
  data () {
    return {
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      username: '',
      password: '',
      rules: {
        required: value => !!value || 'Required.'
        // emailMatch: () => ('The email and password you entered don\'t match')
      }
    }
  },
  mounted () {
    const { username, password } = this
    restapi.service('users').find({ username, password }).then(res => {
      const users = res.data[0]
      if (users.length === 0) {
        // no users found redirect to create account page
        this.$router.push({
          path: 'create'
        })
      } else if (users.length > 1) {
        // This should never happen username and password combo shouldn't share with more than one user
      } else {
        // Set user in the state then route then to the games page.
        this.$store.dispatch('GET_USER')
        this.$router.push({
          path: 'games'
        })
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
