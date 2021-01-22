<template>
  <nav class="flex fixed items-center justify-between bg-white text-gray-700 border-b border-gray-200 z-10">

    <transition enter-class="opacity-0" enter-active-class="ease-out transition-medium" enter-to-class="opacity-100" 
      leave-class="opacity-100" leave-active-class="ease-out transition-medium" leave-to-class="opacity-0">
      <div @keydown.esc="isOpen = false" v-show="isOpen" class="z-10 fixed inset-0 transition-opacity">
        <div @click="isOpen = false" class="absolute inset-0 bg-black opacity-50" tabindex="0"></div>
      </div>
    </transition>

    <aside class="transform top-0 left-0 w-full dark:bg-black bg-white fixed h-full overflow-auto ease-in-out transition-all duration-1000 z-30" :class="isOpen ? 'translate-x-0' : '-translate-x-full'">
      <!-- Leave -->
      <button class="z-10 absolute my-5 mx-5 top-0 right-0" aria-label="Close Menu" @click="drawer">
        <img class="w-5" src="https://www.flaticon.com/svg/static/icons/svg/109/109602.svg"/>
      </button>
      <!-- Header -->
      <div>
        <img class="relative h-60 w-full object-cover object-center" v-bind:src="university.universitySourceImageLink" alt="">
        <div class="container absolute top-48 right-0 flex justify-end">
            <a :href="university.universitySourceWebsiteLink" target="_blank">
                <button @click="analytics" class="inline-block px-4 py-1 text-xs font-medium leading-8 text-center text-white uppercase transition bg-black 
                    rounded-full shadow ripple waves-light focus:outline-none hover:bg-gray-700">
                    Website
                </button>
            </a>
        </div>
        <p class="absolute top-0 p-4 pt-2 text-4xl text-white bg-blue-600 bg-opacity-60 rounded-br-xl">{{ university.universitySourceName }}</p>
      </div>
      <!-- Filters -->
      <div class="px-4 py-2 w-full place-items-center">
        <p class="font-bold text-3xl text-center">Partner</p>
      </div>
      <!-- University Card -->
      <UniversityCardInfo class="xl:mx-40 dark:text-white"
                    v-for="university in this.university.universitySourcerPartner"
                    :key="university.universityPartnerName"
                    :university="university">
      </UniversityCardInfo>
      <!-- Leave -->
      <div class="container mb-5 flex justify-center">
        <button aria-label="Close Menu" @click="drawer" class="text-white text-base border-white bg-red-500 font-bold rounded-full border bottom-0 left-0 align-bottom px-3 py-1" style="padding-top: 4px !important;">
          Back to site
        </button>
      </div>
    </aside>

  </nav>
</template>

<script>
  import UniversityCardInfo from './UniversityCardInfo.vue'
  import {apps, name, grade, defaultAnalytics} from '../main.js'

  export default {
    components:{
        UniversityCardInfo
    },

    name: 'university',
    props: ['university'],

    data() {
      return {
        isOpen: false,
      }
    },

    methods: {
      drawer() {
        this.isOpen = !this.isOpen;
      },

      analytics(){
        defaultAnalytics.logEvent('universitySourceWebsite', {value: this.university.universitySourceName})
      }
    },

    watch: {
      isOpen: {
        immediate: true,
        handler(isOpen) {
          if (process.client) {
            if (isOpen) document.body.style.setProperty("overflow", "hidden");
            else document.body.style.removeProperty("overflow");
          }
        }
      }
    },

    mounted() {
      document.addEventListener("keydown", e => {
        if (e.keyCode == 27 && this.isOpen) this.isOpen = false;
      });
    }
  };
</script>
