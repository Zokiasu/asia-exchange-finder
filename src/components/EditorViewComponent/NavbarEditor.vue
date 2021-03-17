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
        <AddUPartnerPopup
            @close="setCreatePartner" 
            @addNewPartnerToUniversity="addNewPartnerToUniversity"
            :universitysPartner="universitysPartner"
            :listOfSpeciality="listOfSpeciality"
            v-if="addUniversityPartnerPopUp" 
            class="z-50">
        </AddUPartnerPopup>
        <div class="flex justify-between">
          <!-- Filters -->
          <div class="px-4 py-2 place-items-center">
            <button @click="countryFilter(value)" :class="[ (actualFilter == value) ? 'font-semibold bg-red-500' : 'bg-blue-500' ]" class="text-white 4xl:text-2xl rounded py-1 px-3 mr-2 mt-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent" v-for="(value, index) in this.countryPartner" v-bind:key="index">{{value}}</button>
          </div>
          <div class="right-0 text-sm 4xl:text-xl flex justify-end m-5 xl:mx-10">
              <div class="space-x-1 bottom-0.5 right-3">
                  <button @click="setCreatePartner" class="inline-block px-4 py-1 font-medium text-center text-white leading-6 transition bg-green-500 
                      rounded-full shadow ripple waves-light hover:shadow-lg focus:outline-none hover:bg-green-900">
                      Add New Partner
                  </button>
              </div>
          </div>
        </div>
        <!-- University Card -->
        <UniversityCardInfoEditor 
            class="lg:mx-10 dark:text-white"
            v-for="universityP in partner"
            :key="universityP.universityPartnerName"
            :universityP="universityP"
            :listOfSpeciality="listOfSpeciality"
            :display="university.universitySourceDisplay"
            @editPartner="function(a){editPartenaire(a)}"
            @deletePartner="function(a){removePartenaire(a)}">
        </UniversityCardInfoEditor>
        <div v-if="(this.partner <= 0)" class="mb-6 m-3 p-5 bg-gray-500 bg-opacity-20 rounded shadow-lg text-center font-semibold text-lg">
            <p>Sorry, we don't have informations about this university's partners yet.</p>
              <p>If you have more information about their partners, please help us to improve our database by adding <button class="text-blue-500 font-semibold" @click="setCreatePartner">new partners</button>.</p>
        </div>
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
          <p class="absolute top-0 p-4 pt-2 xl:text-xl 2xl:text-2xl 4xl:text-4xl text-white bg-blue-600 bg-opacity-60">{{ university.universitySourceName }}</p>
          <div class="bg-white my-5">
            <h2 class="font-semibold text-xl py-2 px-5 shadow-lg">About University</h2>
            <ul class="px-5 py-3 space-y-2">
              <li>
                <h3 class="font-semibold">Country:</h3>
                <p>{{ university.universitySourceCountry }}</p>
              </li>
              <li>
                <h3 class="font-semibold">City:</h3>
                <p>{{ university.universitySourceCity }}</p>
              </li>
              <li>
                <h3 class="font-semibold">Adress:</h3>
                <p>{{ university.universitySourceAddress }}</p>
              </li>
              <li v-if="university.universitySourceMoreInfo">
                <h3 class="font-semibold">More Info:</h3>
                <p>{{ university.universitySourceMoreInfo }}</p>
              </li>
              <li>
                <h3 class="font-semibold">Last Update:</h3>
                <p>{{ university.universitySourceLastUpdate }} UTC</p>
              </li>
            </ul>

            <!--<button class="w-full px-5 pb-1.5 font-semibold text-blue-500 text-right">Edit</button>-->
          </div>
          <div class="bg-white my-5">
            <h2 class="font-semibold text-xl py-2 px-5 shadow-lg">Top Contributors</h2>
            <ul class="px-5 py-3 space-y-2" v-for="Contributor in university.universitySourceContributors" :key="Contributor.contributorSourceName">
              <li>
                <h3 class="text-blue-800 font-semibold">{{ Contributor.contributorSourceName }}</h3>
                <p>{{ Contributor.contributorSourceEditNumber }} edits</p>
              </li>
            </ul>
          </div>
        </div>
        <!-- Partner -->
        <div class="col-span-4 ml-5 bg-white bg-opacity-90">
          <div class="flex justify-between">
            <!-- Filters -->
            <div class="px-4 py-2 place-items-center">
              <button @click="countryFilter(value)" :class="[ (actualFilter == value) ? 'font-semibold bg-red-500' : 'bg-blue-500' ]" class="text-white 4xl:text-2xl rounded py-1 px-3 mr-2 mt-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent" v-for="(value, index) in this.countryPartner" v-bind:key="index">{{value}}</button>
            </div>
            <div class="right-0 text-sm 4xl:text-xl flex justify-end m-5 xl:mx-10">         
                <div class="space-x-1 bottom-0.5 right-3">
                    <button @click="setCreatePartner" class="inline-block px-4 py-1 font-medium text-center text-white leading-6 transition bg-green-500 
                        rounded-full shadow ripple waves-light hover:shadow-lg focus:outline-none hover:bg-green-900">
                        Add New Partner
                    </button>
                </div>
            </div>
          </div>
          <!-- University Card -->
          <UniversityCardInfoEditor 
              class="lg:mx-10 dark:text-white"
              v-for="universityP in partner"
              :key="universityP.universityPartnerName"
              :universityP="universityP"
              :listOfSpeciality="listOfSpeciality"
              :display="university.universitySourceDisplay"
              @editPartner="function(a){editPartenaire(a)}"
              @deletePartner="function(a){removePartenaire(a)}">
          </UniversityCardInfoEditor>
          <div v-if="(this.partner <= 0)" class="mb-6 m-3 p-5 bg-gray-500 bg-opacity-30 rounded shadow-lg text-center font-semibold text-lg 4xl:text-xl">
              <p>Sorry, we don't have information about this university's partners yet or this one doesn't have a partner in Asia.</p>
              <p>If you have more information about their partners, please help us to improve our database by adding <button class="text-blue-500 font-semibold" @click="setCreatePartner">new partners</button>.</p>
          </div>
        </div>
        <AddUPartnerPopup
            @close="setCreatePartner" 
            @addNewPartnerToUniversity="addNewPartnerToUniversity"
            :universitysPartner="universitysPartner"
            :listOfSpeciality="listOfSpeciality"
            v-if="addUniversityPartnerPopUp" 
            class="z-50 mx-auto flex flex-col mt-auto">
        </AddUPartnerPopup>
      </div>

    </aside>

    <button v-show="isOpen" aria-label="Close Menu" @click="drawer" class="md:invisible z-50 bg-red-500 px-3 py-1 rounded-sm ms:text-md 4xl:text-2xl text-white font-semibold bottom-0 right-1/3 ms:right-1/2 fixed" style="padding-top: 4px !important;">Back to site</button>
    <button v-show="isOpen" aria-label="Close Menu" @click="drawer" class="invisible md:visible z-50 bg-red-500 px-3 py-1 rounded-sm ms:text-md 4xl:text-2xl text-white font-semibold top-5 right-5 fixed align-bottom" style="padding-top: 4px !important;">Back to site</button>
  </nav>
</template>

<script>
  import db from '../../main.js'
  import {apps, name, grade, analytics} from '../../main.js'

  import UniversityCardInfoEditor from './PartnerCardEditor.vue'
  import AddUPartnerPopup from './CreatePartnerPopUp.vue'    
  import Tag from '../Tag.vue'
  import { init } from 'emailjs-com'

  export default {
    components:{
        UniversityCardInfoEditor,
        Tag,
        AddUPartnerPopup,
    },

    props: ['university', 'listOfSpeciality'],

    data() {
      return {
        isOpen: false,
        hello: false,
        addUniversityPartnerPopUp: false,
        partner: [],
        width: 0,
        countryPartner:[''],
        actualFilter: 'All',

        universitysPartner: {
            "universityPartnerName": "",
            "universityPartnerCountry": "",
            "universityPartnerCity": "",
            "universityPartnerAddress": "",
            "universityPartnerWebsiteLink": "",
            "universityPartnerCondition": "",
            "universityPartnerDisplay": "True",
            "universityPartnerCreator": name,
            "universityPartnerLastUpdate": new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19),
            "universityPartnerSpeciality": [],
            "universityPartnerCycle": [],
        },
      }
    },

    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },

    mounted() {
      document.addEventListener("keydown", e => {
        if (e.keyCode == 27 && this.isOpen) this.isOpen = false;
      });
    },
    
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
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

    methods: {

      resetPartnerInfo(){
        this.universitysPartner.universityPartnerName = ""
        this.universitysPartner.universityPartnerCountry = ""
        this.universitysPartner.universityPartnerCity = ""
        this.universitysPartner.universityPartnerAddress = ""
        this.universitysPartner.universityPartnerWebsiteLink = ""
        this.universitysPartner.universityPartnerCondition = ""
        this.universitysPartner.universityPartnerDisplay = "True"
        this.universitysPartner.universityPartnerCreator = name
        this.universitysPartner.universityPartnerLastUpdate = new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19)
        this.universitysPartner.universityPartnerSpeciality = []
        this.universitysPartner.universityPartnerCycle = []
      },

      addNewPartnerToUniversity(){
        
        var universityEdited = {
            "universitySourceId": "",
            "universitySourceName": "University Name",
            "universitySourceCountry": "France",
            "universitySourceCity": "Paris",
            "universitySourceAddress": "",
            "universitySourceImageLink": "https://images.unsplash.com/photo-1457282367193-e3b79e38f207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1654&q=80",
            "universitySourceWebsiteLink": "",
            "universitySourceDisplay": "False",
            "universitySourceCreator": name,
            "universitySourceMoreInfo": "",
            "universitySourceContributors": [],
            "universitySourceLastUpdate": new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19),   
            "universitySourcerPartner": [], 
        }

        universityEdited = JSON.parse(JSON.stringify(this.university))
        
        if(universityEdited.universitySourcerPartner == undefined) {
          universityEdited.universitySourcerPartner = [{
            "universityPartnerName": this.universitysPartner.universityPartnerName,
            "universityPartnerCountry":  this.universitysPartner.universityPartnerCountry,
            "universityPartnerCity":  this.universitysPartner.universityPartnerCity,
            "universityPartnerAddress":  this.universitysPartner.universityPartnerAddress,
            "universityPartnerWebsiteLink":  this.universitysPartner.universityPartnerWebsiteLink,
            "universityPartnerCondition":  this.universitysPartner.universityPartnerCondition,
            "universityPartnerCycle":  this.universitysPartner.universityPartnerCycle,
            "universityPartnerDisplay":  this.universitysPartner.universityPartnerDisplay,
            "universityPartnerCreator":  this.universitysPartner.universityPartnerCreator,
            "universityPartnerLastUpdate":  this.universitysPartner.universityPartnerLastUpdate,  
            "universityPartnerSpeciality":  this.universitysPartner.universityPartnerSpeciality,
          }]
        } else {
          universityEdited.universitySourcerPartner.push({
            "universityPartnerName": this.universitysPartner.universityPartnerName,
            "universityPartnerCountry":  this.universitysPartner.universityPartnerCountry,
            "universityPartnerCity":  this.universitysPartner.universityPartnerCity,
            "universityPartnerAddress":  this.universitysPartner.universityPartnerAddress,
            "universityPartnerWebsiteLink":  this.universitysPartner.universityPartnerWebsiteLink,
            "universityPartnerCondition":  this.universitysPartner.universityPartnerCondition,
            "universityPartnerCycle":  this.universitysPartner.universityPartnerCycle,
            "universityPartnerDisplay":  this.universitysPartner.universityPartnerDisplay,
            "universityPartnerCreator":  this.universitysPartner.universityPartnerCreator,
            "universityPartnerLastUpdate":  this.universitysPartner.universityPartnerLastUpdate,  
            "universityPartnerSpeciality":  this.universitysPartner.universityPartnerSpeciality,

          })
        }
        this.updateUniversity(universityEdited)

        if(this.university.universitySourceDisplay == "True") {
          this.drawer()
        } else {
          this.updateCountry()
        }
        this.resetPartnerInfo()
      },

      updateUniversity(universityEdited){
        this.$emit('updateUniv', universityEdited)
      },

      updateCountry(){
        var country = [];
        country.push('All')
        
        if(this.universitysPartner.universityPartnerName != "") {
          this.partner.push({
            "universityPartnerName": this.universitysPartner.universityPartnerName,
            "universityPartnerCountry":  this.universitysPartner.universityPartnerCountry,
            "universityPartnerCity":  this.universitysPartner.universityPartnerCity,
            "universityPartnerAddress":  this.universitysPartner.universityPartnerAddress,
            "universityPartnerWebsiteLink":  this.universitysPartner.universityPartnerWebsiteLink,
            "universityPartnerCondition":  this.universitysPartner.universityPartnerCondition,
            "universityPartnerCycle":  this.universitysPartner.universityPartnerCycle,
            "universityPartnerDisplay":  this.universitysPartner.universityPartnerDisplay,
            "universityPartnerCreator":  this.universitysPartner.universityPartnerCreator,
            "universityPartnerLastUpdate":  this.universitysPartner.universityPartnerLastUpdate,  
            "universityPartnerSpeciality":  this.universitysPartner.universityPartnerSpeciality,

          })
        }
        this.partner.forEach(el2 => {
            country.push(el2.universityPartnerCountry)                    
        })
        this.partner.sort(function(a,b){
            if(a.universityPartnerName.toLowerCase() < b.universityPartnerName.toLowerCase()) {return -1}
            if(a.universityPartnerName.toLowerCase() > b.universityPartnerName.toLowerCase()) {return 1}
            return 0;
        })
        this.countryPartner = [...new Set(country)]
      },

      updateRCountry(universityPartnerS){
        var country = [];
        country.push('All')
        
        if(this.universitysPartner.universityPartnerName != "") {
          this.partner.push({
            "universityPartnerName": this.universitysPartner.universityPartnerName,
            "universityPartnerCountry":  this.universitysPartner.universityPartnerCountry,
            "universityPartnerCity":  this.universitysPartner.universityPartnerCity,
            "universityPartnerAddress":  this.universitysPartner.universityPartnerAddress,
            "universityPartnerWebsiteLink":  this.universitysPartner.universityPartnerWebsiteLink,
            "universityPartnerCondition":  this.universitysPartner.universityPartnerCondition,
            "universityPartnerCycle":  this.universitysPartner.universityPartnerCycle,
            "universityPartnerDisplay":  this.universitysPartner.universityPartnerDisplay,
            "universityPartnerCreator":  this.universitysPartner.universityPartnerCreator,
            "universityPartnerLastUpdate":  this.universitysPartner.universityPartnerLastUpdate,  
            "universityPartnerSpeciality":  this.universitysPartner.universityPartnerSpeciality,

          })
          this.removePDisplay(universityPartnerS)
        }
        this.partner.forEach(el2 => {
            country.push(el2.universityPartnerCountry)                    
        })
        this.partner.sort(function(a,b){
            if(a.universityPartnerName.toLowerCase() < b.universityPartnerName.toLowerCase()) {return -1}
            if(a.universityPartnerName.toLowerCase() > b.universityPartnerName.toLowerCase()) {return 1}
            return 0;
        })
        this.countryPartner = [...new Set(country)]
      },

      editPartenaire(universityPartnerS){
        this.$emit('editPartner', universityPartnerS)
        if(this.university.universitySourceDisplay == "True") {
          this.drawer()
        }
      },

      removePDisplay(universityPartnerS){  
        for (let g = 0; g < this.partner.length; g++) {
            if(this.partner.universityPartnerName == universityPartnerS.universityPartnerName){
              this.partner.splice(g,1)
            }
        }
      },

      removePartenaire(universityPartnerS){
        this.$emit('removePartner', universityPartnerS)
        this.updateRCountry(universityPartnerS)
        this.drawer()
      },

      setCreatePartner: function() {
          this.addUniversityPartnerPopUp = !this.addUniversityPartnerPopUp
      },

      handleResize() {
          this.width = window.innerWidth;
      },

      visitWebsiteUniversity(){
        var websiteUniversity = this.university.universitySourceName
        analytics.logEvent("web:"+{websiteUniversity}, {websiteUniversity})
      },

      drawer() {
        if(!this.isOpen) {this.resetPartnerInfo()}
        this.isOpen = !this.isOpen
        this.partner = []
        this.countryPartner = []
        this.initPartner()   
      },

      initPartner(){
        var country = [];
        country.push('All')
        if(this.university.universitySourcerPartner){
          this.partner = this.university.universitySourcerPartner
          this.partner.forEach(el2 => {
              country.push(el2.universityPartnerCountry)                    
          })
          this.partner.sort(function(a,b){
              if(a.universityPartnerName.toLowerCase() < b.universityPartnerName.toLowerCase()) {return -1}
              if(a.universityPartnerName.toLowerCase() > b.universityPartnerName.toLowerCase()) {return 1}
              return 0;
          })
          this.countryPartner = [...new Set(country)]
        }
      },

      countryFilter(country){
        this.partner = this.university.universitySourcerPartner.filter(
            (el) => {
                if(el.universityPartnerCountry == country || country == 'All'){
                  this.actualFilter = country
                  return true
                } else {
                  return false
                }
            }
        )
      },

    },
  };
</script>
