<template>
  <nav class="flex fixed items-center justify-between bg-white text-gray-700 border-b border-gray-200 z-10">

    <transition enter-class="opacity-0" enter-active-class="ease-out transition-medium" enter-to-class="opacity-100" 
      leave-class="opacity-100" leave-active-class="ease-out transition-medium" leave-to-class="opacity-0">
      <div @keydown.esc="isOpen = false" v-show="isOpen" class="z-10 fixed inset-0 transition-opacity">
        <div @click="isOpen = false" class="absolute inset-0 bg-black opacity-50" tabindex="0"></div>
      </div>
    </transition>

    <!-- Smartphone/Tablet Screen -->
    <aside v-if="width <= 1280" class="transform top-0 left-0 w-full bg-white fixed h-full overflow-auto ease-in-out transition-all duration-1000 z-30" :class="isOpen ? 'translate-x-0' : '-translate-x-full'">
      <!-- Header -->
      <div>
        <img class="relative h-60 w-full object-cover object-center" v-bind:src="university.universitySourceImageLink" alt="">
        <div class="container absolute top-48 right-0 flex justify-end">
            <a :href="university.universitySourceWebsiteLink" target="_blank">
                <button @click="visitWebsiteUniversity()" class="inline-block px-4 py-1 text-xs font-medium leading-8 text-center text-white uppercase transition bg-black 
                    rounded-full shadow ripple waves-light focus:outline-none hover:bg-gray-700">
                    Website
                </button>
            </a>
        </div>
        <p class="absolute top-0 p-4 pt-2 text-4xl text-white bg-blue-600 bg-opacity-60 md:rounded-br-xl">{{ university.universitySourceName }}</p>
      </div>

      <!-- Partner -->
      <div>
        <!-- Filters -->
        <div class="px-4 py-2 w-full place-items-center">
          <p class="font-bold text-3xl text-center">Partner</p>
          <button @click="countryFilter(value)" :class="[ (actualFilter == value) ? 'font-semibold bg-red-500' : 'bg-blue-500' ]" class="text-white rounded py-1 px-3 mr-2 mt-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent" v-for="(value, index) in this.countryPartner" v-bind:key="index">{{value}}</button>
        </div>
        <!-- University Card -->
        <UniversityCardInfo 
            class="xl:mx-40 dark:text-white"
            v-for="university in this.partner"
            :key="university.universityPartnerName"
            :university="university">
        </UniversityCardInfo>
      </div>
      <div v-if="(this.partner <= 0)" class="mb-6 m-3 p-5 bg-gray-500 bg-opacity-20 rounded shadow-lg text-center font-semibold text-lg">
          <p>Sorry, we don't have informations about this university's partners yet.</p>
          <p>If you have more information about their partners feel free to help us improve our database, login and edit this university in editor view.</p>
      </div>
    </aside>

    <!-- Computer Screen -->
    <aside v-else-if="width > 1280" style="background-repeat: no-repeat; background-attachment: fixed; background-position: center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;" 
    v-bind:style="{ backgroundImage: 'url(' + university.universitySourceImageLink + ')' }" class="p-10 transform top-0 left-0 w-full bg-gray-200 fixed h-full overflow-auto ease-in-out transition-all duration-1000 z-30" :class="isOpen ? 'translate-x-0' : '-translate-x-full'">
      
      <div class="grid grid-cols-5">
        <!-- Header -->
        <div class="relative">
          <img class="relative h-60 w-full object-cover object-center border-white border-2 shadow-2xl" v-bind:src="university.universitySourceImageLink" alt="">
          <div class="absolute top-48 w-full justify-center flex">
              <a :href="university.universitySourceWebsiteLink" target="_blank">
                  <button @click="visitWebsiteUniversity()" class="inline-block px-4 py-1 text-sm 4xl:text-xl font-medium leading-8 text-center text-white transition bg-black 
                      rounded-full shadow focus:outline-none hover:bg-gray-700">
                      Website
                  </button>
              </a>
          </div>
          <p class="absolute top-1 p-4 pt-2 xl:text-xl 2xl:text-2xl 4xl:text-4xl text-white bg-blue-600 bg-opacity-60">{{ university.universitySourceName }}</p>
          <!--<div class="bg-white my-5 h-72"></div>
          <div class="bg-white my-5 h-72"></div>-->
        </div>
        <!-- Partner -->
        <div class="col-span-4 ml-5 bg-white bg-opacity-90">
          <!-- Filters -->
          <div class="px-4 py-2 w-full place-items-center">
            <button @click="countryFilter(value)" :class="[ (actualFilter == value) ? 'font-semibold bg-red-500' : 'bg-blue-500' ]" class="text-white 4xl:text-2xl rounded py-1 px-3 mr-2 mt-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent" v-for="(value, index) in this.countryPartner" v-bind:key="index">{{value}}</button>
          </div>
          <!-- University Card -->
          <UniversityCardInfo 
              class="xl:mx-10 dark:text-white"
              v-for="university in this.partner"
              :key="university.universityPartnerName"
              :university="university">
          </UniversityCardInfo>
          <div v-if="(this.partner <= 0)" class="mb-6 m-3 p-5 bg-gray-500 bg-opacity-20 rounded shadow-lg text-center font-semibold text-lg 4xl:text-xl">
              <p>Sorry, we don't have informations about this university's partners yet.</p>
              <p>If you have more information about their partners feel free to help us improve our database, login and edit this university in editor view.</p>
          </div>
        </div>
      </div>
    </aside>

    <button v-show="isOpen" aria-label="Close Menu" @click="drawer" class="md:invisible z-50 bg-red-500 px-3 py-1 rounded-sm ms:text-md 4xl:text-2xl text-white font-semibold bottom-0 right-1/3 ms:right-1/2 fixed" style="padding-top: 4px !important;">Back to site</button>
    <button v-show="isOpen" aria-label="Close Menu" @click="drawer" class="invisible md:visible z-50 bg-red-500 px-3 py-1 rounded-sm ms:text-md 4xl:text-2xl text-white font-semibold top-5 right-5 fixed align-bottom" style="padding-top: 4px !important;">Back to site</button>
  </nav>
</template>

<script>
  import {analytics} from '../../main.js'
  import UniversityCardInfo from './UniversityCardInfo.vue'
  import Tag from '../Tag.vue'

  export default {
    components:{
        UniversityCardInfo,
        Tag,
    },

    name: 'university',
    props: ['university'],

    data() {
      return {
        isOpen: false,
        hello: false,
        partner: [],
        width: 0,
        countryPartner:[''],
        actualFilter: 'All',
      }
    },

    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },

    methods: {
      handleResize() {
          this.width = window.innerWidth;
      },

      visitWebsiteUniversity(){
        var websiteUniversity = this.university.universitySourceName
        analytics.logEvent("webUniversity", {websiteUniversity})
      },

      drawer() {
        this.isOpen = !this.isOpen;
        this.partner = [];
        this.countryPartner = [];
      },

      initPartner(){
        var country = [];
        country.push('All')
        if(this.university.universitySourcerPartner){
          this.partner = this.university.universitySourcerPartner
          this.partner.forEach(el2 => {
              country.push(el2.universityPartnerCountry)                    
          })
          this.countryPartner = [...new Set(country)]
        }
      },

      countryFilter(country){
        this.partner = this.university.universitySourcerPartner.filter(
            (el) => {
                if(el.universityPartnerCountry == country || country == 'All') {
                  this.actualFilter = country
                  return true
                } else {
                  return false
                }
            }
        )
      },
    },

    watch: {
      isOpen: {
        immediate: true,
        handler(isOpen) {
          if (process.client) {
            if (isOpen) document.body.style.setProperty("overflow", "hidden");
            else document.body.style.removeProperty("overflow");
          }
          this.initPartner()
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
