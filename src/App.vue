<template>
  <div class="relative bg-black bg-opacity-30 h-screen text-white inset-x-0 top-0 flex flex-col">
    <div class="invisible md:visible space-x-2 mr-3 ms:mr-10 mt-6 flex justify-end">
      <div class="space-x-2 absolute left-0 ml-6 flex justify-between">
        <router-link v-show="$route.name !=='AboutUs'" to="/aboutus" class="text-xl">About Us</router-link>
        <p v-show="$route.name !=='AboutUs'" v-if="userAuthenticated">|</p>
        <router-link v-if="userAuthenticated" v-show="$route.name ==='Dashboard' || $route.name ==='AboutUs'" to="/" class="text-xl">Home</router-link>
        <p v-if="userAuthenticated" v-show="$route.name ==='AboutUs'">|</p>
        <router-link v-if="userAuthenticated" v-show="$route.name!=='Dashboard' || $route.name ==='AboutUs'" to="/dashboard" class="text-xl">Dashboard</router-link>
      </div>
      <p class="text-xl" v-if="userAuthenticated">Hi, {{actualUser.username}}</p>
      <button v-if="userAuthenticated" @click="signOut" class="bg-red-800 rounded-sm px-3 py-1 font-bold text-xs ms:text-md Button">Log Out</button>
      <button v-if="!userAuthenticated" @click="setVisibleLogin" class="bg-blue-500 shadow-lg rounded-sm px-3 py-1 font-bold text-xs ms:text-md Button">Log In</button>
      <button v-if="!userAuthenticated" @click="setVisibleSignUp" class="bg-red-500 shadow-lg rounded-sm px-3 py-1 font-bold text-xs ms:text-md Button">Sign Up</button>
    </div>
    <h1 class="font-bold text-center mt-10 ms:mt-20 mb-5 ms:mb-0 text-4xl ms:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"><router-link to="/">Asia Exchange Finder</router-link></h1>
    <router-view/>
    <Login @loged="setUserAuthenticated" @created="setVisibleLogin" v-if="loginPopup" class="mx-auto flex flex-col"/>
    <Signup @created="setVisibleSignUp" v-if="signupPopup" class="mx-auto flex flex-col"/>
  </div>
  <a href="https://www.instagram.com/asiastudeler/" target="_blank" class="z-50 text-sm text-white font-bold bg-black rounded-tl-xl border border-white bottom-0 right-0 fixed align-bottom px-2 py-1" style="padding-top: 4px !important;">Asia Studeler</a>
</template>

<script>
  import Login from './views/Login.vue'
  import Signup from './views/Signup.vue'
  import firebase from 'firebase'
  import {name, grade} from './main.js'
  import db from './main.js'

  export default {
    components:{
        Login,
        Signup
    },

    data(){
      return {
        loginPopup: false,
        signupPopup: false,
        userAuthenticated: false,
        actualUser:{
          username: name,
          userGrade: grade,
        }
      }
    },

    async beforeCreate(){
      await firebase.auth().onAuthStateChanged((user) => {
        if(user != undefined) {
          db.ref('users/' + user.uid).once('value').then((snapshot) => {
              this.userAuthenticated = true
              this.actualUser.username = snapshot.val().pseudo
              this.actualUser.userGrade = snapshot.val().grade
          })
        }
      })
    },

    methods:{

      signOut: function() {
        firebase.auth().signOut().then(() => {
          this.user = null
          this.$router.replace('/')
        }).catch(err => console.log(error))
        this.setUserAuthenticated()
      },

      setVisibleLogin: function() {
          this.loginPopup = !this.loginPopup
      },

      setVisibleSignUp: function() {
          this.signupPopup = !this.signupPopup
      },

      setUserAuthenticated: function() {
          this.userAuthenticated = !this.userAuthenticated
      }
    }
  }
</script>

<style src="./index.css"/>
