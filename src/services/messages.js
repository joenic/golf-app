import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'
import rest from '@feathersjs/rest-client'
import axios from 'axios'

// instantiate a feathers client
const api = feathers()
const restapi = feathers()

// configure rest api
const restClient = rest(process.env.VUE_APP_API_URL)
restapi.configure(restClient.axios(axios))

// configure socket io
const socket = io(process.env.VUE_APP_API_URL)
api.configure(socketio(socket))

export {
  api,
  restapi
}
