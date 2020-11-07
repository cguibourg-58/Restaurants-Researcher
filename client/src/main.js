import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css' 
import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router'
import App from './App.vue'
import firebase from 'firebase'
import 'firebase/firestore'
import VueFirestore from 'vue-firestore'
import routes from './routes';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueMaterial);
Vue.use(VueFirestore);
Vue.use(VueRouter);
//Vue.use(x5GMaps, 'AIzaSyB99RnGMyLlfO33OUPvru5HRu4JXXZKDrw');
Vue.use(VueGoogleMaps, {
  load : {
    key: 'AIzaSyB99RnGMyLlfO33OUPvru5HRu4JXXZKDrw',
    libraries: 'places' 
  }
});

const router = new VueRouter({routes, mode: 'history'});

var firebaseConfig = {
  apiKey: "AIzaSyB7m5pKrkTP8tHjZ3TawgM918k_h_V4K2M",
  authDomain: "projet-test-m1.firebaseapp.com",
  databaseURL: "https://projet-test-m1.firebaseio.com",
  projectId: "projet-test-m1",
  storageBucket: "projet-test-m1.appspot.com",
  messagingSenderId: "917026220404",
  appId: "1:917026220404:web:1d0ea0ab82f0dcc776e421"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
