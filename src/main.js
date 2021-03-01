import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueGeolocation from 'vue-browser-geolocation'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false
Vue.use(VueGeolocation)
Vue.use(VueGoogleMaps, {
  load: { key: 'AIzaSyAOTTHRqJEyGYbLq2xp8zAVrJg9bQovmtc' }
}
)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
