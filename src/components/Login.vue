<template>
  <div class="container">
    <v-card>
      <v-card-title>User Login</v-card-title>
        <v-form>
          <v-text-field v-model="user.name" placeholder="First Name" class="form-control pa-2" type="text" prepend-inner-icon="mdi-account-circle"></v-text-field>
          <v-text-field v-model="user.password" placeholder="Password" class="form-control pa-2" type="text" prepend-inner-icon="mdi-lock"></v-text-field>
          <v-text-field v-model="course.courseName" placeholder="Course Name" class="form-control pa-2" type="text" prepend-inner-icon="mdi-golf-tee"></v-text-field>

          <router-link to="/">
            <v-btn
              large
              color="primary"
              block
              type="submit"
              @click="NEW_USER"
              >Submit</v-btn>
          </router-link>
        </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  // This is the local data for the component. The user key is calling a method newUser
  data () {
    return {
      user: this.newUser(),
      course: this.newCourse()
    }
  },
  methods: {
    // NEW_USER method dispatches the local user data to the VUEX store that can then be pushed to the array and then further to the api end point
    NEW_USER () {
      this.$store.dispatch('NEW_USER', this.user)
      this.$store.dispatch('NEW_COURSE', this.course)
    },
    // newUser returns empty strings that will be filled by the inputs in the template above.
    newUser () {
      return {
        name: '',
        password: ''
      }
    },
    newCourse () {
      return {
        courseName: ''
      }
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
