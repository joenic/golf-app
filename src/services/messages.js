import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

// instantiate a feathers client
const api = feathers()

// configure socket io
const socket = io(process.env.VUE_APP_API_URL)
api.configure(socketio(socket))

export {
  api
}
