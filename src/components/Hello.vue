<template>
  <div class="container">
    <v-card>
      <v-card-title>User Login</v-card-title>
        <v-form>
          <v-text-field v-model="User.firstname" placeholder="First Name" class="form-control pa-2" type="text" prepend-inner-icon="mdi-account-circle"></v-text-field>
          <v-text-field v-model="User.lastname" placeholder="Password" class="form-control pa-2" type="text" prepend-inner-icon="mdi-lock"></v-text-field>
          <!-- <div class="well">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="First Name" v-model="User.firstname">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Last Name" v-model="User.lastname">
            </div>
            <div class="form-group">
              <label class="pull-left"> Email </label>
              <input type="text" class="form-control" placeholder="Email " v-model="User.email">
            </div>
          </div> -->

          <router-link to="/users">
            <v-btn
              large
              color="primary"
              block
              @click="addtoAPI">Submit</v-btn>
          </router-link>
          <!-- <button class="btn btn-large btn-block btn-success full-width">Go User</button> -->
        </v-form>
    </v-card>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      User: { firstname: '', lastname: ''},
    }
  }, methods: {
    addToAPI() {
      let newUser = {
        firstname: this.User.firstname,
        lastname: this.User.lastname,
        // email: this.User.email
      }
      console.log(newUser);
      axios.post(`${process.env.VUE_APP_API_URL}/people`, newUser)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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