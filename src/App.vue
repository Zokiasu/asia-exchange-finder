<template>
  <div class="relative text-white inset-x-0 top-0 flex flex-col bg-black bg-opacity-30 p-0 min-h-screen">
    <!-- invisible lg:visible -->
    <div class="space-x-2 mr-3 ms:mr-10 mt-6 flex justify-end">
      <div class="h-0 md:h-auto space-x-2 absolute left-8 md:left-10 lg:left-20 ml-6 flex justify-between text-xl">
        <router-link to="/" class="invisible md:visible">Home</router-link>
        <p class="invisible md:visible text-xl">|</p>
        <router-link to="/aboutus" class="invisible md:visible">About</router-link>
        <p class="invisible md:visible text-xl" v-if="userAuthenticated">|</p>
        <router-link to="/editorview" class="invisible md:visible" v-if="userAuthenticated">Editor View</router-link>
        <p class="invisible md:visible text-xl" v-if="userAdmin">|</p>
        <router-link to="/dashboard" class="invisible md:visible" v-if="userAdmin">Dashboard</router-link>
      </div>
      <p class="invisible md:visible text-xl 2xl:text-2xl" v-if="userAuthenticated">Hi, {{actualUser.username}}</p>
      <button v-if="userAuthenticated" @click="signOut" class="invisible md:visible bg-red-800 rounded-sm px-3 py-1 font-bold text-xs ms:text-md Button">Log Out</button>
      <button v-if="!userAuthenticated" @click="setVisibleLogin" class="invisible md:visible bg-blue-500 shadow-lg rounded-sm px-3 py-1 font-bold text-xs ms:text-md Button">Log In</button>
      <button v-if="!userAuthenticated" @click="setVisibleSignUp" class="invisible md:visible bg-red-500 shadow-lg rounded-sm px-3 py-1 font-bold text-xs ms:text-md Button">Sign Up</button>
    </div>

    <h1 class="font-bold text-center mt-10 ms:mt-20 mb-16 text-4xl ms:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"><router-link to="/">Asia Exchange Finder</router-link></h1>
    <h2 class="text-center mb-5 ms:mb-0 text-xl 2xl:text-2xl">Find your exchange to an Asian country.</h2>
    <router-view class="mb-16"/>
    <LoginPopup @loged="setUserAuthenticated" @created="setVisibleLogin" v-if="loginPopup" class="mx-auto flex flex-col"/>
    <SignupPopUp @created="setVisibleSignUp" v-if="signupPopup" class="mx-auto flex flex-col"/>
    <Contact :actualUser="actualUser" @created="setVisibleContact" v-if="contactPopup" class="mx-auto flex flex-col"/>
  </div>
  <button class="z-50 text-white text-xs xl:text-base 4xl:text-lg font-bold bg-red-600 rounded-tr-xl border border-white bottom-0 left-0 fixed align-bottom px-2 py-1" @click="setVisibleContact" target="_blank" style="padding-top: 4px !important;">Contact</button>
  <a class="z-50 text-white text-xs xl:text-base 4xl:text-lg font-bold bg-black rounded-tl-xl border border-white bottom-0 right-0 fixed align-bottom px-2 py-1" href="https://www.instagram.com/asiastudeler/" target="_blank" style="padding-top: 4px !important;">Asia Studeler</a>
</template>

<script>
  import db from './main.js'
  import {apps, name, grade} from './main.js'
  
  import LoginPopup from './components/LoginPopup.vue'
  import SignupPopUp from './components/SignupPopUp.vue'
  import Contact from './components/Contact.vue'

  export default {
    components:{
        LoginPopup,
        SignupPopUp,
        Contact
    },

    data(){
      return {
        loginPopup: false,
        signupPopup: false,
        contactPopup: false,
        userAuthenticated: false,
        userAdmin: false,
        actualUser:{
          username: "",
          userGrade: "",
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
              if(snapshot.val().grade == "Admin") {
                this.userAdmin = true
              }
          })
        }
      })
    },

    methods:{

      signOut: function() {
        apps.auth().signOut().then(() => {
          this.$toast.warning(`You have been disconnected.`, {position:"top", duration: 2000, max:1});
          this.user = null
          if(this.$route.name != 'Home') {
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
