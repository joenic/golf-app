<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
  <div class="container">

    <form>

      <div class="well">
        <h1 class="pa-3"> Login</h1>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="First Name" v-model="User.firstname">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Last Name" v-model="User.lastname">
        </div>
        <!-- <div class="form-group">
          <label class="pull-left"> Email </label>
          <input type="text" class="form-control" placeholder="Email " v-model="User.email">
        </div> -->
      </div>

  <router-link to="/users">
      <button type="submit" class="btn btn-large btn-block btn-primary full-width pa-2" @click="addToAPI">Submit</button>

  </router-link>
      <!-- <button class="btn btn-large btn-block btn-success full-width">Go User</button> -->
    </form>

  </div>
  </v-card>
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