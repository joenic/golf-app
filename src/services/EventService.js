import { restapi } from '@/services/messages.js'
// import axios from 'axios'

const apiClient = restapi.service('users')

export default {
  // this is a get statment that pulls from the database
  getUser (name) {
    return apiClient
      .find(name)
  },
  // This post data to the api when function is called. I threw in a catch statement if an error occurs
  postUser (name, password) {
    return apiClient
      .create(name, password)
      .catch((error) => {
        console.log(error)
      })
  },
  postCourse (courseName) {
    return apiClient
      .create(courseName)
      .catch((error) => {
        console.log(error)
      })
  }
}
