import { createApp } from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'
import './index.css'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
apiKey: "AIzaSyCeTd92spWS_GVaY3Boi1ifEIpKo2J1DQ0",
authDomain: "asia-exchange-finder.firebaseapp.com",
projectId: "asia-exchange-finder",
storageBucket: "asia-exchange-finder.appspot.com",
messagingSenderId: "842116159585",
appId: "1:842116159585:web:a7c5adae9964eb8e957220",
measurementId: "G-JG0FNVR88C"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

createApp(App).use(router).mount('#app')