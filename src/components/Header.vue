<template>
    <div class="space-x-2 mr-3 ms:mr-10 mt-6 flex justify-end">
      <div class="h-0 md:h-auto space-x-2 absolute left-5 ml-6 flex justify-between text-xl">
        <router-link to="/" class="invisible md:visible">Home</router-link>
        <p class="invisible md:visible text-xl">|</p>
        <router-link to="/about" class="invisible md:visible">About</router-link>
        <p class="invisible md:visible text-xl" v-if="userAuthenticated">|</p>
        <router-link to="/editorview" class="invisible md:visible" v-if="userAuthenticated">Editor Mode</router-link>
      </div>
      <p class="invisible md:visible text-xl 2xl:text-2xl" v-if="userAuthenticated">Hi, {{actualUser.username}}</p>
      <button v-if="userAuthenticated" @click="signOut" class="invisible md:visible bg-red-800 rounded-sm px-3 py-1 font-bold text-xs ms:text-md Button">Log Out</button>
      <router-link to="/login" v-if="!userAuthenticated" class="invisible md:visible bg-blue-500 shadow-lg rounded-sm px-3 py-1 font-bold text-xs ms:text-md Button">Log In</router-link>
      <router-link to="/signup" v-if="!userAuthenticated" class="invisible md:visible bg-red-500 shadow-lg rounded-sm px-3 py-1 font-bold text-xs ms:text-md Button">Sign Up</router-link>
    </div>
</template>

<script>
  import db from '../main.js'
  import {apps} from '../main.js'

  import LoginPopup from '../components/Popup/LoginPopup.vue'
  import SignupPopUp from '../components/Popup/SignupPopUp.vue'

  export default {
    components:{
        LoginPopup,
        SignupPopUp,
    },

    data(){
      return {
        loginPopup: false,
        signupPopup: false,

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
        this.userAdmin = !this.userAdmin
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

<style src="../index.css"/>