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
        <div class="flex justify-between">
          <!-- Filters -->
          <div class="px-4 py-2 place-items-center">
            <button @click="filter(value)" :class="[ (actualFilter == value) ? 'font-semibold bg-red-500' : 'bg-blue-500' ]" class="text-white 4xl:text-2xl rounded py-1 px-3 mr-2 mt-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent" v-for="(value, index) in this.countryPartner" v-bind:key="index">{{value}}</button>
          </div>
          <div class="right-0 text-sm 4xl:text-xl flex justify-end m-5 xl:mx-10">
              <div class="space-x-1 bottom-0.5 right-3">
                  <button @click="editThisUniversity" class="inline-block px-4 py-1 font-medium text-center text-white leading-6 transition bg-green-500 
                      rounded-full shadow ripple waves-light hover:shadow-lg focus:outline-none hover:bg-green-900">
                      Edit This University
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
              <p>If you have more information about their partners, please help us to improve our database by adding <button class="text-blue-500 font-semibold" @click="editThisUniversity">new partners</button>.</p>
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
                <h3 class="font-semibold">Address:</h3>
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
              <button @click="filter(value)" :class="[ (actualFilter == value) ? 'font-semibold bg-red-500' : 'bg-blue-500' ]" class="text-white 4xl:text-2xl rounded py-1 px-3 mr-2 mt-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent" v-for="(value, index) in this.countryPartner" v-bind:key="index">{{value}}</button>
            </div>
            <div class="right-0 text-sm 4xl:text-xl flex justify-end m-5 xl:mx-10">         
                <div class="space-x-1 bottom-0.5 right-3">
                    <button @click="editThisUniversity" class="inline-block px-4 py-1 font-medium text-center text-white leading-6 transition bg-green-500 
                        rounded-full shadow ripple waves-light hover:shadow-lg focus:outline-none hover:bg-green-900">
                        Edit This University
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
              <p>If you have more information about their partners, please help us to improve our database by adding <button class="text-blue-500 font-semibold" @click="editThisUniversity">new partners</button>.</p>
          </div>
        </div>
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
  import Tag from '../Tag.vue'
  import { init } from 'emailjs-com'

  import FirebaseLog from '../../Mixins/firebase' 

  export default {
    mixins:[FirebaseLog],

    components:{
        UniversityCardInfoEditor,
        Tag,
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

        var universityEdited = FirebaseLog.methods.newUniversityObject()

        universityEdited = JSON.parse(JSON.stringify(this.university))
        
        if(universityEdited.universitySourcerPartner == undefined) {
          universityEdited.universitySourcerPartner = [FirebaseLog.methods.newPartnerObject(this.universitysPartner)]
        } else {
          universityEdited.universitySourcerPartner.push(FirebaseLog.methods.newPartnerObject(this.universitysPartner))
        }
        this.updateUniversity(universityEdited)

        if(this.university.universitySourceDisplay == "True") {
          this.drawer()
        } else {
          this.updateCountry()
        }
        this.universitysPartner = FirebaseLog.methods.newPartnerObject()
      },

      updateUniversity(universityEdited){
        this.$emit('updateUniv', universityEdited)
      },

      updateCountry(){
        if(this.universitysPartner.universityPartnerName != "") {
          this.partner.push(FirebaseLog.methods.newPartnerObject(this.universitysPartner))
        }
        this.partner.sort(function(a,b){
            if(a.universityPartnerName.toLowerCase() < b.universityPartnerName.toLowerCase()) {return -1}
            if(a.universityPartnerName.toLowerCase() > b.universityPartnerName.toLowerCase()) {return 1}
            return 0;
        })
        this.enableCountryFilter()
      },

      editPartenaire(universityPartnerS){
        this.$emit('editPartner', universityPartnerS)
        if(this.university.universitySourceDisplay == "True") {
          this.drawer()
        } else {
          this.updateCountry()
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
        this.updateCountry()
        this.drawer()
        this.initPartner()
      },

      editThisUniversity: function() {
        this.drawer()
        this.$router.push({path: '/edit/informations', query:{id: this.university.universitySourceId, statut: this.university.universitySourceDisplay}})
      },

      handleResize() {
          this.width = window.innerWidth;
      },

      visitWebsiteUniversity(){
        var websiteUniversity = this.university.universitySourceName
        analytics.logEvent("web:"+{websiteUniversity}, {websiteUniversity})
      },

      drawer() {
        this.isOpen = !this.isOpen
        if(this.isOpen) {
          this.$router.push({path: '/editorview', query:{id: this.university.universitySourceId}})
        } else {
          this.$router.push({path:'/editorview'})
          this.resetPartnerInfo()
        }
        this.partner = []
        this.countryPartner = []
        this.initPartner()   
      },

      async initPartner(){
        var tmpPartner0 = []
        if(this.university.universitySourcerPartner){

          if(this.university.universitySourceDisplay == "False") {
            await db.ref("universitysEdited/"+this.university.universitySourceId+'/'+this.university.universitySourceCreator+"/universitySourcerPartner").once("value", function(snapshot){
              snapshot.forEach(function(element){
                if(element.val().universityPartnerName != undefined) {
                  tmpPartner0.push(
                    {
                      "universityPartnerName": element.val().universityPartnerName,
                      "universityPartnerCountry": element.val().universityPartnerCountry,
                      "universityPartnerCity": element.val().universityPartnerCity,
                      "universityPartnerAddress": element.val().universityPartnerAddress,
                      "universityPartnerWebsiteLink": element.val().universityPartnerWebsiteLink,
                      "universityPartnerCondition": element.val().universityPartnerCondition,
                      "universityPartnerCycle": element.val().universityPartnerCycle,
                      "universityPartnerDisplay": element.val().universityPartnerDisplay,
                      "universityPartnerCreator": element.val().universityPartnerCreator,
                      "universityPartnerLastUpdate": element.val().universityPartnerLastUpdate,  
                      "universityPartnerSpeciality": element.val().universityPartnerSpeciality,
                    }
                  )
                  if(tmpPartner0[tmpPartner0.length-1].universityPartnerName == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerName = ""}
                  if(tmpPartner0[tmpPartner0.length-1].universityPartnerCountry == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCountry = ""}
                  if(tmpPartner0[tmpPartner0.length-1].universityPartnerCity == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCity = ""}
                  if(tmpPartner0[tmpPartner0.length-1].universityPartnerAddress == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerAddress = ""}
                  if(tmpPartner0[tmpPartner0.length-1].universityPartnerWebsiteLink == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerWebsiteLink = ""}
                  if(tmpPartner0[tmpPartner0.length-1].universityPartnerCondition == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCondition = ""}
                  if(tmpPartner0[tmpPartner0.length-1].universityPartnerCycle == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCycle = []}
                  if(tmpPartner0[tmpPartner0.length-1].universityPartnerDisplay == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerDisplay = ""}
                  if(tmpPartner0[tmpPartner0.length-1].universityPartnerCreator == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCreator = ""}
                  if(tmpPartner0[tmpPartner0.length-1].universityPartnerLastUpdate == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerLastUpdate = ""}
                  if(tmpPartner0[tmpPartner0.length-1].universityPartnerSpeciality == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerSpeciality = []}
                }
              })
            })
          } else {
            await db.ref("universitys/"+this.university.universitySourceId+"/universitySourcerPartner").once("value", function(snapshot){
              snapshot.forEach(function(element){
                if(element.val().universityPartnerName != undefined) {
                  tmpPartner0.push(
                    {
                      "universityPartnerName": element.val().universityPartnerName,
                      "universityPartnerCountry": element.val().universityPartnerCountry,
                      "universityPartnerCity": element.val().universityPartnerCity,
                      "universityPartnerAddress": element.val().universityPartnerAddress,
                      "universityPartnerWebsiteLink": element.val().universityPartnerWebsiteLink,
                      "universityPartnerCondition": element.val().universityPartnerCondition,
                      "universityPartnerCycle": element.val().universityPartnerCycle,
                      "universityPartnerDisplay": element.val().universityPartnerDisplay,
                      "universityPartnerCreator": element.val().universityPartnerCreator,
                      "universityPartnerLastUpdate": element.val().universityPartnerLastUpdate,  
                      "universityPartnerSpeciality": element.val().universityPartnerSpeciality,
                    }
                  )
                  if(tmpPartner0[tmpPartner0.length-1].universityPartnerName == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerName = ""}
                  if(tmpPartner0[tmpPartner0.length-1].universityPartnerCountry == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCountry = ""}
                  if(tmpPartner0[tmpPartner0.length-1].universityPartnerCity == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCity = ""}
                  if(tmpPartner0[tmpPartner0.length-1].universityPartnerAddress == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerAddress = ""}
                  if(tmpPartner0[tmpPartner0.length-1].universityPartnerWebsiteLink == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerWebsiteLink = ""}
                  if(tmpPartner0[tmpPartner0.length-1].universityPartnerCondition == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCondition = ""}
                  if(tmpPartner0[tmpPartner0.length-1].universityPartnerCycle == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCycle = []}
                  if(tmpPartner0[tmpPartner0.length-1].universityPartnerDisplay == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerDisplay = ""}
                  if(tmpPartner0[tmpPartner0.length-1].universityPartnerCreator == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCreator = ""}
                  if(tmpPartner0[tmpPartner0.length-1].universityPartnerLastUpdate == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerLastUpdate = ""}
                  if(tmpPartner0[tmpPartner0.length-1].universityPartnerSpeciality == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerSpeciality = []}
                }
              })
            })
          }

          this.partner = tmpPartner0
          this.partner.sort(function(a,b){
              if(a.universityPartnerName.toLowerCase() < b.universityPartnerName.toLowerCase()) {return -1}
              if(a.universityPartnerName.toLowerCase() > b.universityPartnerName.toLowerCase()) {return 1}
              return 0;
          })
          this.enableCountryFilter()
        }
        this.actualFilter = "All"
      },

      enableCountryFilter(){
        var country = [];
        country.push('All')
        this.partner.forEach(el => {
            country.push(el.universityPartnerCountry)                    
        })
        this.countryPartner = [...new Set(country)]
      },

      async filter(country){
        var tmpPartner0 = []
        if(this.actualFilter != country) {this.actualFilter = country}
        if(this.university.universitySourceDisplay == "False") {
          await db.ref("universitysEdited/"+this.university.universitySourceId+"/universitySourcerPartner").once("value", function(snapshot){
            snapshot.forEach(function(element){
              if(element.val().universityPartnerCountry == country) {
                tmpPartner0.push(
                  {
                    "universityPartnerName": element.val().universityPartnerName,
                    "universityPartnerCountry": element.val().universityPartnerCountry,
                    "universityPartnerCity": element.val().universityPartnerCity,
                    "universityPartnerAddress": element.val().universityPartnerAddress,
                    "universityPartnerWebsiteLink": element.val().universityPartnerWebsiteLink,
                    "universityPartnerCondition": element.val().universityPartnerCondition,
                    "universityPartnerCycle": element.val().universityPartnerCycle,
                    "universityPartnerDisplay": element.val().universityPartnerDisplay,
                    "universityPartnerCreator": element.val().universityPartnerCreator,
                    "universityPartnerLastUpdate": element.val().universityPartnerLastUpdate,  
                    "universityPartnerSpeciality": element.val().universityPartnerSpeciality,
                  }
                )
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerName == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerName = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerCountry == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCountry = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerCity == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCity = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerAddress == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerAddress = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerWebsiteLink == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerWebsiteLink = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerCondition == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCondition = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerCycle == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCycle = []}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerDisplay == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerDisplay = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerCreator == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCreator = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerLastUpdate == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerLastUpdate = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerSpeciality == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerSpeciality = []}
              } else if(country == "All") {
                tmpPartner0.push(
                  {
                    "universityPartnerName": element.val().universityPartnerName,
                    "universityPartnerCountry": element.val().universityPartnerCountry,
                    "universityPartnerCity": element.val().universityPartnerCity,
                    "universityPartnerAddress": element.val().universityPartnerAddress,
                    "universityPartnerWebsiteLink": element.val().universityPartnerWebsiteLink,
                    "universityPartnerCondition": element.val().universityPartnerCondition,
                    "universityPartnerCycle": element.val().universityPartnerCycle,
                    "universityPartnerDisplay": element.val().universityPartnerDisplay,
                    "universityPartnerCreator": element.val().universityPartnerCreator,
                    "universityPartnerLastUpdate": element.val().universityPartnerLastUpdate,  
                    "universityPartnerSpeciality": element.val().universityPartnerSpeciality,
                  }
                )
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerName == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerName = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerCountry == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCountry = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerCity == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCity = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerAddress == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerAddress = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerWebsiteLink == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerWebsiteLink = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerCondition == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCondition = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerCycle == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCycle = []}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerDisplay == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerDisplay = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerCreator == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCreator = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerLastUpdate == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerLastUpdate = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerSpeciality == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerSpeciality = []}
              }
            })
          })
        } else {
          await db.ref("universitys/"+this.university.universitySourceId+"/universitySourcerPartner").once("value", function(snapshot){
            snapshot.forEach(function(element){
              if(element.val().universityPartnerCountry == country) {
                tmpPartner0.push(
                  {
                    "universityPartnerName": element.val().universityPartnerName,
                    "universityPartnerCountry": element.val().universityPartnerCountry,
                    "universityPartnerCity": element.val().universityPartnerCity,
                    "universityPartnerAddress": element.val().universityPartnerAddress,
                    "universityPartnerWebsiteLink": element.val().universityPartnerWebsiteLink,
                    "universityPartnerCondition": element.val().universityPartnerCondition,
                    "universityPartnerCycle": element.val().universityPartnerCycle,
                    "universityPartnerDisplay": element.val().universityPartnerDisplay,
                    "universityPartnerCreator": element.val().universityPartnerCreator,
                    "universityPartnerLastUpdate": element.val().universityPartnerLastUpdate,  
                    "universityPartnerSpeciality": element.val().universityPartnerSpeciality,
                  }
                )
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerName == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerName = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerCountry == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCountry = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerCity == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCity = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerAddress == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerAddress = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerWebsiteLink == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerWebsiteLink = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerCondition == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCondition = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerCycle == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCycle = []}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerDisplay == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerDisplay = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerCreator == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCreator = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerLastUpdate == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerLastUpdate = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerSpeciality == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerSpeciality = []}
              } else if(country == "All") {
                tmpPartner0.push(
                  {
                    "universityPartnerName": element.val().universityPartnerName,
                    "universityPartnerCountry": element.val().universityPartnerCountry,
                    "universityPartnerCity": element.val().universityPartnerCity,
                    "universityPartnerAddress": element.val().universityPartnerAddress,
                    "universityPartnerWebsiteLink": element.val().universityPartnerWebsiteLink,
                    "universityPartnerCondition": element.val().universityPartnerCondition,
                    "universityPartnerCycle": element.val().universityPartnerCycle,
                    "universityPartnerDisplay": element.val().universityPartnerDisplay,
                    "universityPartnerCreator": element.val().universityPartnerCreator,
                    "universityPartnerLastUpdate": element.val().universityPartnerLastUpdate,  
                    "universityPartnerSpeciality": element.val().universityPartnerSpeciality,
                  }
                )
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerName == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerName = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerCountry == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCountry = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerCity == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCity = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerAddress == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerAddress = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerWebsiteLink == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerWebsiteLink = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerCondition == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCondition = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerCycle == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCycle = []}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerDisplay == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerDisplay = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerCreator == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerCreator = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerLastUpdate == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerLastUpdate = ""}
                if(tmpPartner0[tmpPartner0.length-1].universityPartnerSpeciality == undefined) {tmpPartner0[tmpPartner0.length-1].universityPartnerSpeciality = []}
              }
            })
          })
        }

        this.partner = tmpPartner0
        this.partner.sort(function(a,b){
            if(a.universityPartnerName.toLowerCase() < b.universityPartnerName.toLowerCase()) {return -1}
            if(a.universityPartnerName.toLowerCase() > b.universityPartnerName.toLowerCase()) {return 1}
            return 0;
        })
      },

    },
  };
</script>

<style>

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  height: 0;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
