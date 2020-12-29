import { createApp } from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'
import './index.css'

var firebaseConfig = {
    apiKey: "AIzaSyCeTd92spWS_GVaY3Boi1ifEIpKo2J1DQ0",
    authDomain: "asia-exchange-finder.firebaseapp.com",
    databaseURL: "https://asia-exchange-finder-default-rtdb.firebaseio.com/",
    projectId: "asia-exchange-finder",
    storageBucket: "asia-exchange-finder.appspot.com",
    messagingSenderId: "842116159585",
    appId: "1:842116159585:web:a7c5adae9964eb8e957220",
    measurementId: "G-JG0FNVR88C"
};
// Initialize Firebase
let app = firebase.initializeApp(firebaseConfig);
let db = app.database()
firebase.analytics();

createApp(App).use(router).mount('#app')

export default db