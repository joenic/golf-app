import { restapi } from '@/services/messages.js'
// import axios from 'axios'

const apiClient = restapi.service('users')

export default {
  // this is a get statment that pulls from the database
  getUser (username, password) {
    return apiClient
      .find({ username, password })
  },
  // This post data to the api when function is called. I threw in a catch statement if an error occurs
  postUser (username, password) {
    return apiClient
      .create(username, password)
  },
  // postCourse (name) {
  //   return apiClient
  //     .patch(this.$store.state.user._id, { courseName: name })
  // },
  newHole (number, yards, par, tee) {
    return apiClient
      .patch({ number, yards, par, tee })
  },
  newShot (position, time, club) {
    return apiClient
      .patch({ position, time, club })
  }
}
