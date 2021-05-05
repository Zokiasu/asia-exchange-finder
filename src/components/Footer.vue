<template>
    <div class="bg-gray-900 bottom-0 right-0 left-0">
        <div class="grid grid-cols-1 py-5 space-y-5">
            <div class="w-full">
                <ul class="flex flex-row w-full justify-center space-x-5">
                    <li>
                        <a href="https://www.instagram.com/asiastudeler/" target="_blank"><img class="mx-auto h-5 w-5 left-10 bottom-0" v-lazy="instagram" alt=""></a>
                    </li>
                    <li>
                        <a href="https://twitter.com/AsiaStudeler" target="_blank"><img class="mx-auto h-5 w-5 left-10 bottom-0" v-lazy="twitter" alt=""></a>
                    </li>
                </ul>
            </div>
            <div class="w-full">
                <ul class="flex flex-row w-full justify-center space-x-5">
                    <li>
                        <router-link to="/about">About Us</router-link>
                    </li>
                    <li>
                        <router-link to="/contact">Contact</router-link>
                    </li>
                    <li>
                        <router-link to="/privacy">Privacy Policy</router-link>
                    </li>
                    <li>
                        <router-link to="/terms">Terms of Use</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
  import db from '../main.js'
  import {apps} from '../main.js'
  import logo from '../assets/ASLogo.png'
  import instagram from '../assets/instagram.png'
  import twitter from '../assets/twitter.png'

  export default {
    components:{
        
    },

    data(){
      return {
          logos:logo,
          instagram:instagram,
          twitter:twitter,
      }
    },
    

    methods:{
        
    }
  }
</script>

<style src="../index.css"/>