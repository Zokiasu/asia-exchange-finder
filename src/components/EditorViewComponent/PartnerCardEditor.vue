<template>
    <!-- Normal View -->
    <div v-if="!editPartnerView && !deletePartnerView" class=" mb-6 m-3 pb-2 bg-gray-200 rounded shadow-lg text-lg 4xl:text-xl">
        <!-- Université + Ville + Pays-->
        <div class="relative w-full bg-blue-500 rounded-t-sm pb-1 xl:text-xl 2xl:text-2xl">
            <p class="px-2 font-bold text-white">{{universityP.universityPartnerName}}</p>
            <p class="font-bold text-white pl-2 xl:pl-0 xl:absolute xl:top-0 xl:right-2">{{universityP.universityPartnerCity}}, {{universityP.universityPartnerCountry}}</p>
        </div>
        <!-- Partner speciality -->
        <div class="p-2">
            <p class="mb-1 font-bold text-sm 2xl:text-base 4xl:text-xl">Partner's Speciality :</p>
            <div class="relative inline-block mr-1 mb-1 bg-gray-300 py-1 px-2 rounded-full text-xs 4xl:text-base text-gray-700"  v-for="(universityPartnerName, index) in universityP.universityPartnerSpeciality" :key="index">
                <tag :tags="universityPartnerName"/>
            </div>
            <div v-if="!universityP.universityPartnerSpeciality" class="text-sm 4xl:text-lg">
                <p>Sorry, we don't have more information about this partner. If you have any information please edit this partner to help us improve our database.</p>
            </div>
        </div> 
        <!-- Partner Cycle -->
        <div class="p-2">
            <p class="mb-1 font-bold text-sm 2xl:text-base 4xl:text-xl">Partner's Cycle :</p>
            <div class="relative inline-block mr-1 mb-1 bg-gray-300 py-1 px-2 rounded-full text-xs 4xl:text-base text-gray-700"  v-for="(universityPartnerCycle, index) in universityP.universityPartnerCycle" :key="index">
                <tag :tags="universityPartnerCycle"/>
            </div>
            <div v-if="!universityP.universityPartnerCycle" class="text-sm 4xl:text-lg">
                <p>Sorry, we don't have more information about this partner. If you have any information please edit this partner to help us improve our database.</p>
            </div>
        </div> 
        <!-- Exchange -->
        <div class="p-2">
            <p class="mb-1 font-bold text-sm 2xl:text-base 4xl:text-xl">Requirements :</p>
            <p class="whitespace-pre-line text-sm 4xl:text-base">{{universityP.universityPartnerCondition}}</p>
            <div v-if="!universityP.universityPartnerCondition" class="font-semibold xl:text-lg 4xl:text-xl">
                <p>Sorry, we don't have more information about this partner. If you have any information please edit this partner to help us improve our database.</p>
            </div>
        </div>
        <!-- universityPartnerWebsiteLink button -->
        <div class="relative text-sm 4xl:text-lg">
            <div class="container flex justify-center">
                <a v-bind:href="link" target="_blank">
                    <button class="inline-block px-4 py-1 font-medium text-center text-white leading-6 transition bg-blue-500 
                        rounded-full shadow ripple waves-light hover:shadow-lg focus:outline-none hover:bg-blue-900">
                        Website
                    </button>
                </a>
            </div>            
            <div class="space-x-1 absolute bottom-0.5 right-3">
                <button @click="callEditPartner" class="inline-block px-4 py-1 font-medium text-center text-white leading-6 transition bg-green-500 
                    rounded-full shadow ripple waves-light hover:shadow-lg focus:outline-none hover:bg-green-900">
                    Edit
                </button>
                <button @click="callDeletePartner" v-if="(grade === 'Admin') || (username === universityP.universityPartnerCreator && display === 'False')" class="inline-block px-4 py-1 font-medium text-center text-white leading-6 transition bg-red-500 
                    rounded-full shadow ripple waves-light hover:shadow-lg focus:outline-none hover:bg-red-900">
                    Delete
                </button>
            </div>
        </div>
    </div>
    <!-- Edited View -->
    <div v-else-if="editPartnerView && !deletePartnerView" class=" mb-6 mx-10 m-3 pb-2 bg-gray-200 rounded shadow-lg text-lg 4xl:text-xl">
        <!-- Université + Ville + Pays-->
        <div class="relative w-full bg-blue-500 rounded-t-sm pb-1 xl:text-xl 2xl:text-2xl">
            <p class="px-2 font-bold text-white">{{universityP.universityPartnerName}}</p>
            <p class="font-bold text-white pl-2 xl:pl-0 xl:absolute xl:top-0 xl:right-2">{{universityP.universityPartnerCity}}, {{universityP.universityPartnerCountry}}</p>
        </div>
        <!-- ??? -->
        <div class="font-bold grid grid-cols-2 gap-1 text-xs text-black w-full pt-5 pb-10 px-5">
            <div class="flex flex-wrap col-start-1 col-end-7">
                <div class="relative w-full appearance-none label-floating">
                    <input type="text" autocomplete="off" class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-white border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                    id="universitySourceName" v-model="universityPartner.universityPartnerName" :placeholder="universityP.universityPartnerName">
                    <label for="universitySourceName" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">universityP Partner Name</label>
                </div>
            </div>
            <div class="flex flex-wrap col-start-1 col-end-7">
                <div class="relative w-full appearance-none label-floating">
                    <input type="text" autocomplete="off" class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-white border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                    id="universitySourceAddress" v-model="universityPartner.universityPartnerAddress" :placeholder="universityP.universityPartnerAddress">
                    <label for="universitySourceAddress" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Partner Adress</label>
                </div>
            </div>
            <div class="flex flex-wrap col-span-3">
                <div class="relative w-full appearance-none label-floating">
                    <input type="text" autocomplete="off" class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-white border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                    id="universitySourceCountry" v-model="universityPartner.universityPartnerCountry" :placeholder="universityP.universityPartnerCountry">
                    <label for="universitySourceCountry" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Partner Country</label>
                </div>
            </div>
            <div class="flex flex-wrap col-span-3">
                <div class="relative w-full appearance-none label-floating">
                    <input type="text" autocomplete="off" class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-white border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                    id="universitySourceCity" v-model="universityPartner.universityPartnerCity" :placeholder="universityP.universityPartnerCity">
                    <label for="universitySourceCity" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Partner City</label>
                </div>
            </div>
            <div class="flex flex-wrap col-start-1 col-end-7">
                <div class="relative w-full appearance-none label-floating">
                    <input type="url" autocomplete="off" class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-white border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                    id="universitySourceWebsiteLink" v-model="universityPartner.universityPartnerWebsiteLink" :placeholder="universityP.universityPartnerWebsiteLink">
                    <label for="universitySourceWebsiteLink" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Partner Website</label>
                </div>
            </div>
            <div class="flex flex-wrap col-start-1 col-end-7 text-sm bg-white py-2 px-4 rounded">
                <div><p class="text-green-600">Academic Cycle</p></div>
                <ul class="flex">
                    <li class="ml-5 space-x-2 font-semibold" v-for="(universityCycle, index) in universityCycle" v-bind:key="index">
                        <input :id="universityCycle" :value="universityCycle" name="universityCycle" type="checkbox" v-model="universityPartner.universityPartnerCycle" @change="log"/>
                        <label :for="universityCycle">{{universityCycle}}</label>
                    </li>
                </ul>
            </div>
            <div class="flex flex-wrap col-start-1 col-end-7">
                <div class="relative w-full appearance-none label-floating col-start-1 col-end-7">
                    <textarea class="autoexpand h-40 tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-white border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                        v-model="universityPartner.universityPartnerCondition" :placeholder="universityP.universityPartnerCondition"></textarea>
                    <label class="absolute tracking-wide py-2 px-4 opacity-0 leading-tight block top-0 left-0 cursor-text" for="Condition">Partner Condition</label>
                </div>
            </div>
            <div class="w-full col-start-1 col-end-7">
                <smart-tagz
                    editable
                    autosuggest
                    input-placeholder="Speciality ..."
                    :defaultTags= universityP.universityPartnerSpeciality
                    :sources= listOfSpeciality
                    :on-changed="logResult"
                    :allowPaste="{delimiter: ','}"
                    :allowDuplicates="false"
                    :max-tags="100"
                />
            </div>
        </div>
        <!-- universityPartnerWebsiteLink button -->
        <div class="relative text-sm 4xl:text-xl">
            <div class="space-x-1 absolute bottom-0.5 right-3">
                <button @click="callEditPartner" class="inline-block px-4 py-1 font-medium text-center text-white leading-6 transition bg-red-500 
                    rounded-full shadow ripple waves-light hover:shadow-lg focus:outline-none hover:bg-red-900">
                    Cancel
                </button>
                <button @click="editPartner" class="inline-block px-4 py-1 font-medium text-center text-white leading-6 transition bg-green-500 
                    rounded-full shadow ripple waves-light hover:shadow-lg focus:outline-none hover:bg-green-900">
                    Send
                </button>
            </div>
        </div>
    </div>
    <!-- Deleted View -->
    <div v-else-if="deletePartnerView && !editPartnerView" class=" mb-6 mx-10 m-3 pb-2 bg-red-300 rounded shadow-lg text-lg 4xl:text-xl">
        <!-- Université + Ville + Pays-->
        <div class="relative w-full bg-blue-500 rounded-t-sm pb-1 xl:text-xl 2xl:text-2xl">
            <p class="px-2 font-bold text-white">{{universityP.universityPartnerName}}</p>
            <p class="font-bold text-white pl-2 xl:pl-0 xl:absolute xl:top-0 xl:right-2">{{universityP.universityPartnerCity}}, {{universityP.universityPartnerCountry}}</p>
        </div>
        <!-- ??? -->
        <div class="my-10 p-5 text-center font-semibold text-xs md:text-lg xl:text-xl 4xl:text-2xl">
            <p>Are you sure you want to delete {{universityP.universityPartnerName}}?</p>
        </div>
        <!-- universityPartnerWebsiteLink button -->
        <div class="relative text-sm 4xl:text-xl">
            <div class="space-x-1 absolute bottom-0.5 right-3">
                <button @click="callDeletePartner" class="inline-block px-4 py-1 font-medium text-center text-white leading-6 transition bg-red-500 
                    rounded-full shadow ripple waves-light hover:shadow-lg focus:outline-none hover:bg-red-900">
                    Cancel
                </button>
                <button @click="removePart" class="inline-block px-4 py-1 font-medium text-center text-white leading-6 transition bg-green-500 
                    rounded-full shadow ripple waves-light hover:shadow-lg focus:outline-none hover:bg-green-900">
                    Valid
                </button>
            </div>
        </div>
    </div>
    
</template>

<script>
    import { SmartTagz } from "smart-tagz";
    import "smart-tagz/dist/smart-tagz.css";
    import { defineComponent } from "vue";

    import Tag from '../Tag.vue'
    import {apps, name} from '../../main.js'
    import db from '../../main.js'

  export default defineComponent ({
    name: "Basic",

    components:{
        SmartTagz,
        Tag
    },
    
    props: ['universityP', 'display', 'listOfSpeciality'],
    test: [],

    data() {
        return{
            username:'',
            grade:'',
            editPartnerView: false,
            deletePartnerView: false,
            checked: false,
            link: '#',
            universityCycle: ["Doctorate/PhD", "Master", "Bachelor"],

            "universityPartner": {
                "universityPartnerName": "",
                "universityPartnerCountry": "",
                "universityPartnerCity": "",
                "universityPartnerAddress": "",
                "universityPartnerWebsiteLink": "",
                "universityPartnerCondition": "",
                "universityPartnerDisplay": "",
                "universityPartnerCreator": "",
                "universityPartnerLastUpdate": "",  
                "universityPartnerSpeciality": [],
                "universityPartnerCycle": [],
            },
        }
    },

    async beforeCreate(){
      await apps.auth().onAuthStateChanged((user) => {
        if(user != undefined) {
          db.ref('users/' + user.uid).once('value').then((snapshot) => {
              this.username = snapshot.val().username
              this.grade = snapshot.val().grade
          })
        }
      })
    },

    mounted(){
        this.universityPartner = JSON.parse(JSON.stringify(this.universityP))
        if(this.universityPartner.universityPartnerCycle == true || this.universityPartner.universityPartnerCycle == false || this.universityPartner.universityPartnerCycle == undefined) {
            this.universityPartner.universityPartnerCycle = []
        }
        this.link = JSON.parse(JSON.stringify(this.universityP.universityPartnerWebsiteLink))
    },

    setup(props) {
        const logResult = (result) =>{
            props.universityP.universityPartnerSpeciality = result
        };
        return {
            logResult,
        };
    },

    methods: {

        callEditPartner(){
            this.editPartnerView = !this.editPartnerView
        },

        callDeletePartner(){
            this.deletePartnerView = !this.deletePartnerView
        },

        editPartner(){
            if(this.universityP.universityPartnerSpeciality) {
                this.universityPartner.universityPartnerSpeciality = JSON.parse(JSON.stringify(this.universityP.universityPartnerSpeciality))
            }
            this.$emit('editPartner', this.universityPartner)
            this.callEditPartner()
        },

        removePart(){
            this.$emit('deletePartner', this.universityP)
            this.callDeletePartner()
        }
    },   

  });
</script>
