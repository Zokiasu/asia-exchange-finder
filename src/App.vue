<template>
  <div class="relative text-white inset-x-0 top-0 flex flex-col bg-black bg-opacity-30 p-0 min-h-screen">
    <div class="invisible md:visible space-x-2 mr-3 ms:mr-10 mt-6 flex justify-end">
      <div class="space-x-2 absolute left-0 ml-6 flex justify-between">
        <router-link v-show="$route.name !=='AboutUs'" to="/aboutus" class="text-xl 2xl:text-2xl">About Us</router-link>
        <p class=" 2xl:text-xl" v-show="$route.name !=='AboutUs'" v-if="userAuthenticated">|</p>
        <router-link v-show="$route.name ==='Dashboard' || $route.name ==='AboutUs'" to="/" class="text-xl 2xl:text-2xl">Home</router-link>
        <p class=" 2xl:text-xl" v-if="userAuthenticated" v-show="$route.name ==='AboutUs'">|</p>
        <router-link v-if="userAuthenticated" v-show="$route.name!=='Dashboard' || $route.name ==='AboutUs'" to="/dashboard" class="text-xl 2xl:text-2xl">Dashboard</router-link>
      </div>
      <p class="text-xl 2xl:text-2xl" v-if="userAuthenticated">Hi, {{actualUser.username}}</p>
      <button v-if="userAuthenticated" @click="signOut" class="bg-red-800 rounded-sm px-3 py-1 font-bold text-xs ms:text-md Button">Log Out</button>
      <button v-if="!userAuthenticated" @click="setVisibleLogin" class="bg-blue-500 shadow-lg rounded-sm px-3 py-1 font-bold text-xs ms:text-md Button">Log In</button>
      <button v-if="!userAuthenticated" @click="setVisibleSignUp" class="bg-red-500 shadow-lg rounded-sm px-3 py-1 font-bold text-xs ms:text-md Button">Sign Up</button>
    </div>
    <h1 class="font-bold text-center mt-10 ms:mt-20 mb-16 text-4xl ms:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"><router-link to="/">Asia Exchange Finder</router-link></h1>
    <h2 class="text-center mb-5 ms:mb-0 text-xl 2xl:text-2xl">Find your exchange to an Asian country.</h2>
    <router-view class="mb-16"/>
    <Login @loged="setUserAuthenticated" @created="setVisibleLogin" v-if="loginPopup" class="mx-auto flex flex-col"/>
    <Signup @created="setVisibleSignUp" v-if="signupPopup" class="mx-auto flex flex-col"/>
    <Contact :actualUser="actualUser" @created="setVisibleContact" v-if="contactPopup" class="mx-auto flex flex-col"/>
  </div>
  <button @click="setVisibleContact" target="_blank" class="z-50 text text-white font-bold bg-red-600 rounded-tr-xl border border-white bottom-0 left-0 fixed align-bottom px-2 py-1" style="padding-top: 4px !important;">Feedback</button>
  <a href="https://www.instagram.com/asiastudeler/" target="_blank" class="z-50 text-sm text-white font-bold bg-black rounded-tl-xl border border-white bottom-0 right-0 fixed align-bottom px-2 py-1" style="padding-top: 4px !important;">Asia Studeler</a>
</template>

<script>
  import Login from './components/Login.vue'
  import Signup from './components/Signup.vue'
  import Contact from './components/Contact.vue'
  import {apps, name, grade} from './main.js'
  import db from './main.js'

  export default {
    components:{
        Login,
        Signup,
        Contact
    },

    data(){
      return {
        loginPopup: false,
        signupPopup: false,
        contactPopup: false,
        userAuthenticated: false,
        actualUser:{
          username: name,
          userGrade: grade,
        }
      }
    },

    async beforeCreate(){
      await apps.auth().onAuthStateChanged((user) => {
        if(user != undefined) {
          db.ref('users/' + user.uid).once('value').then((snapshot) => {
              this.userAuthenticated = true
              this.actualUser.username = snapshot.val().username
              this.actualUser.userGrade = snapshot.val().grade
          })
        }
      })
    },

    methods:{

      signOut: function() {
        apps.auth().signOut().then(() => {
          this.user = null
          if(this.$route.name === 'Home') {
            this.$router.go()
          } else {
            this.$router.replace('/')
          }
        }).catch(err => console.log(error))
        this.setUserAuthenticated()
      },

      setVisibleLogin: function() {
          this.loginPopup = !this.loginPopup
      },

      setVisibleSignUp: function() {
          this.signupPopup = !this.signupPopup
      },

      setVisibleContact: function() {
          this.contactPopup = !this.contactPopup
      },

      setUserAuthenticated: function() {
          this.userAuthenticated = !this.userAuthenticated
      }
    }
  }
</script>

<style src="./index.css"/>
