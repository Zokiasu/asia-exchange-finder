import { createApp } from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'
import LazyLoading from 'vue-lazy-loading'
import Toaster from '@meforma/vue-toaster'
import './index.css'

var firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREB_API_KEY,
    authDomain: process.env.VUE_APP_FIREB_AUTHDOMAIN,
    databaseURL: process.env.VUE_APP_FIREB_DATABASEURL,
    projectId: process.env.VUE_APP_FIREB_PROJECTID,
    storageBucket: process.env.VUE_APP_FIREB_STORAGEBUCKET,
    messagingSenderId: process.env.VUE_APP_FIREB_MESSAGINGSENDERID,
    appId: process.env.VUE_APP_FIREB_APPID,
    measurementId: process.env.VUE_APP_FIREB_MEASUREMENTID,
};
// Initialize Firebase
let apps = firebase.initializeApp(firebaseConfig)
const analytics = firebase.analytics();
let db = apps.database()
apps.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

var name = "Unknown";
var grade, users;

firebase.auth().onAuthStateChanged((user) =>  {
    if(user != undefined) {
        firebase.database().ref('users/' + user.uid).once('value').then((snapshot) => {
            name = snapshot.val().username
            grade = snapshot.val().grade
        })
    }
})

createApp(App).use(router).use(LazyLoading, {
    preLoad: 1.3,
    attempt: 3,
    lazyComponent: true,
    listenEvents: [ 'scroll' ]
  }).use(Toaster).mount('#app')

export default db
export {apps, name, grade, analytics}