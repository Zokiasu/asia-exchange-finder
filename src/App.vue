<template>
  <div class="relative text-white inset-x-0 top-0 flex flex-col bg-black bg-opacity-30 p-0 min-h-screen">
    
    <!-- Header -->
    <Header/>
    
    <!-- Body -->
    <h1 class="font-bold text-center mt-10 ms:mt-20 text-4xl ms:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"><router-link to="/">Asia Exchange Finder</router-link></h1>
    <p class="text-center mt-5">(Beta Version)</p>
    <h2 class="text-center mt-10 mb-5 ms:mb-0 text-xl 2xl:text-2xl">Find your exchange to an Asian country.</h2>
    <router-view class="mb-16"/>
    <!-- Footer -->
  </div>


  <a class="z-50 text-white text-sm 4xl:text-base font-bold bg-black rounded-tl-xl border border-white bottom-0 right-0 fixed align-bottom px-2 py-1" href="https://www.instagram.com/asiastudeler/" target="_blank" style="padding-top: 4px !important;">Asia Studeler</a>
</template>

<script>
  import db from './main.js'
  import {apps} from './main.js'

  import Header from './components/Header.vue'

  export default {
    components:{
        Header,
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

<style src="./index.css"/>
