<template>
    <div class="mt-1 md:mt-12 mx-auto flex justify-center items-center w-full h-full">

        <div class="grid grid-cols-1 w-full">
            <!-- Filter City/Destination/Speciality -->
            <div class="container flex justify-center flex-col ms:flex-row text-gray-900">
                <div class="pt-6 ms:pl-1 flex">
                    <Multiselect
                        class="bg-gray-200  text-black"
                        mode="single"
                        :searchable="true"
                        placeholder="From All Cities"
                        v-model="CityFilter"
                        :options="option.cityStartOption"/>
                    <button @click="resetCity" class="px-1 rounded-none" :class="(CityFilter === '' || CityFilter === null || CityFilter === undefined) ? 'bg-gray-200 border border-gray-200 invisible' : 'bg-red-700 border border-red-700 visible text-white'">X</button>
                </div>
                <div class="pt-6 ms:pl-1 flex">
                    <Multiselect
                        class="bg-gray-200  text-black"
                        mode="single"
                        :searchable="true"
                        placeholder="To All Destinations"
                        v-model="DestinationFilter"
                        :options="option.countryOption"/>
                    <button @click="resetDestination" class="px-1 rounded-none" :class="(DestinationFilter === '' || DestinationFilter === null || DestinationFilter === undefined) ? 'bg-gray-200 border border-gray-200 invisible' : 'bg-red-700 border border-red-700 visible text-white'">X</button>
                </div>
                <!--<div class="pt-6 ms:pl-1 flex">
                    <Multiselect
                        class="bg-gray-200  text-black"
                        mode="single"
                        :searchable="true"
                        placeholder="For All Majors"
                        v-model="SpecialityFilter"
                        :options="option.specialityOption"/>
                    <button @click="resetSpeciality" class="px-1 rounded-none" :class="(SpecialityFilter === '' || SpecialityFilter === null || SpecialityFilter === undefined) ? 'bg-gray-200 border border-gray-200 invisible' : 'bg-red-700 border border-red-700 visible text-white'">X</button>
                </div>-->
            </div>

            <div class="container flex flex-col justify-center">
                <button @click="searchByFilter" class="mx-auto mt-6 px-10 ms:px-20 md:px-10 py-2 border rounded-md bg-red-800 text-white">Search</button>
                <button @click="resetAllFilter" class="mt-2 mx-auto focus:border-transparent">Reset Filter</button>
            </div>

            <!-- University Card -->
            <transition-group name="slide-fade">
                <div v-if="visible" class="p-8 md:p-10 lg:px-20 2xl:px-32 grid gap-4 grid-cols-1 ms:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    <card
                        v-for="(university, index) in this.universitysSend.slice(0,minElement)"
                        :key="university.universitySourceName"
                        :university="university"
                        :index="index"
                        @onClick = "getuniqueUniversityNameCard">
                    </card>
                    <transition name="slide-fade">
                        <div v-if="!show && minElement >= this.universitysSend.length && visible" class="text-sm md:text-xl mx-5 ms:mx-auto bg-gray-500 bg-opacity-75 h-60 p-10 rounded-lg overflow-hidden shadow-2xl relative justify-center items-center grid grid-cols-1">
                            <p class="text-center">You know more universities or schools that offer exchanges to asian countries?</p>
                            <p v-if="userConnected" class="text-center">Send us your informations with <router-link to="/editorview" class="text-blue-500 font-semibold">editor mode</router-link>!</p>
                            <p v-if="!userConnected" class="text-center">Go to <router-link to="/signup" class="text-blue-500 font-semibold">register</router-link> and propose them to us!</p>
                        </div>
                    </transition>
                </div>
                <pulse-loader v-if="minElement <= this.universitysSend.length || !visible" class=" mt-10 m-auto"></pulse-loader>
            </transition-group>

            <!-- Error Search -->
            <transition name="slide-fade">
                <div v-if="show" class="container mb-10 justify-center bg-gray-500 w-full bg-opacity-75 p-10">
                    <p class="text-xl lg:text-2xl text-white text-center mb-6">We are sorry,<br>we are not able to find a university or school that fits the selected parameters.</p>
                    <p class="text-xl lg:text-2xl text-white text-center">If you know of a university corresponding the chosen conditions, add it to our database by <router-link to="/login" class="font-bold">logging</router-link> on to our site and consulting the <router-link class="font-bold" to="/editorview">Editor Mode</router-link>.</p>
                </div>
            </transition>

            <!-- Component University Card -->
            <navbar class="z-40" ref="navbarComponent" :university="universityObject"></navbar>
        </div>

        <back-to-top class="z-30" bottom="50px" right="50px">
            <button type="button" class="py-1 2xl:py-2 px-2.5 2xl:px-3.5 rounded-xl 2xl:rounded-3xl bg-green-500 text-white 4xl:text-xl">Back to top</button>
        </back-to-top>
    </div>
</template>

<script>
    import $ from 'jQuery'
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
    import firebase from 'firebase'
    import Multiselect from '@vueform/multiselect'
    import BackToTop from 'vue-backtotop'

    import db from '../../main.js'
    import {name} from '../../main.js'
    
    import Card from '../../components/HomeComponent/UniversityCard.vue'
    import Navbar from '../../components/HomeComponent/navbar.vue'

    export default {
        name: "Basic",

        components:{
            Card,
            Navbar,
            PulseLoader,
            Multiselect,
            BackToTop,
        },

        data () {
            return {
                modelV:'',
                modelD:'',
                modelS:'',
                CityFilter:'',
                DestinationFilter:'',
                SpecialityFilter:'',

                minElement: 12,

                show: false,
                visible: false,
                userConnected: false,
                
                universitysSend: [],

                option: {
                    cityStartOption: [],
                    countryOption: [],
                    specialityOption: [],
                },

                universitys: [
                    {
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
                        "universitySourceContributors": [
                            {
                                "contributorSourceName": name,
                                "contributorSourceEditNumber": 1
                            }
                        ],
                        "universitySourceLastUpdate": new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19),   
                        "universitySourcerPartner": [
                            {
                                "universityPartnerName": "University Partner",
                                "universityPartnerCountry": "",
                                "universityPartnerCity": "",
                                "universityPartnerAddress": "",
                                "universityPartnerWebsiteLink": "",
                                "universityPartnerCondition": "",
                                "universityPartnerDisplay": "True",
                                "universityPartnerLastUpdate": new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19),  
                                "universityPartnerSpeciality": [],  
                                "universityPartnerCycle": [],
                            }
                        ], 
                    }
                ],

                universityObject: {
                    universitySourceId: '',
                    universitySourceName: '',
                    universitySourceCountry: '',
                    universitySourceCity: '',
                    universitySourceAddress: '',
                    universitySourceImageLink: '',
                    universitySourceWebsiteLink: '',
                    universitySourceDisplay: '',
                    universitySourceCreator: '',
                    universitySourceMoreInfo: '',
                    universitySourceContributors: [],
                    universitySourceLastUpdate: '',
                    universitySourcerPartner: []
                },
            }
        },

        async beforeCreate(){
            await firebase.auth().onAuthStateChanged((user) => {
                if(user != undefined) {
                    db.ref('users/' + user.uid).once('value').then((snapshot) => {
                        this.userConnected = true
                    })
                }
            })
        },

        async created(){
            var testuni = this.universitys

            await db.ref("universitys").once("value", function(snapshot){
                snapshot.forEach(function(element){
                    testuni.push(element.val())
                })
            })
            
            this.universitysSend = testuni
            this.universitysSend.splice(0,1)

            for (let index = this.universitysSend.length-1; index >= 0; index--) {
                if(this.universitysSend[index].universitySourceDisplay === "False" || !this.universitysSend[index].universitySourcerPartner){
                    this.universitysSend.splice(index, 1)
                } else {
                    if(this.universitysSend[index].universitySourcerPartner){
                        for (let index2 = this.universitysSend[index].universitySourcerPartner.length-1; index2 >= 0 ; index2--) {
                            if(this.universitysSend[index].universitySourcerPartner[index2].universityPartnerDisplay === "False") {
                                this.universitysSend[index].universitySourcerPartner.splice(index2, 1)
                            }
                        }
                    }
                }
            }
            
            this.universitysSend.sort(function(a,b){
                if(a.universitySourceName.toLowerCase() < b.universitySourceName.toLowerCase()) {return -1;}
                if(a.universitySourceName.toLowerCase() > b.universitySourceName.toLowerCase()) {return 1;}
                return 0;
            })

            if(this.universitysSend.length > 0){
                this.visible = !this.visible;
                this.init();
                if(this.$route.query.id) {
                    this.getuniqueUniversityNameCard(this.$route.query.id)
                }
            }
        },

        mounted() {
            this.scroll()
        },

        methods: {

            scroll(){
                window.onscroll = () => {
                    let bottomOfWindow = Math.round(Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight) === Math.round(document.documentElement.offsetHeight) || Math.round(Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight) === (Math.round(document.documentElement.offsetHeight)-1)
                    
                    if (bottomOfWindow) {
                        this.minElement = this.minElement + 9;
                        bottomOfWindow = false;
                    }
                }
            },
            
            init(){
                var cityStart = [];
                var countryPartener = [];
                var specialityPartener = [];

                this.universitysSend.forEach(el => {
                    cityStart.push(el.universitySourceCity)
                    if(el.universitySourcerPartner) {
                        el.universitySourcerPartner.forEach(el2 => {
                            if(el2.universityPartnerSpeciality) {
                                el2.universityPartnerSpeciality.forEach(el3 => {
                                    if(el3 != "" && el3 != "N/A") {
                                        specialityPartener.push(el3)
                                    }
                                })
                            }                  
                            countryPartener.push(el2.universityPartnerCountry)
                        })
                    }
                })

                this.option.countryOption = [...new Set(countryPartener)]
                this.option.countryOption.sort()
                this.option.specialityOption = [...new Set(specialityPartener)]
                this.option.specialityOption.sort()
                this.option.cityStartOption = [...new Set(cityStart)]
                this.option.cityStartOption.sort()
            },

            getuniqueUniversityNameCard (idUniv) {
                this.setValue(idUniv)
                this.$refs.navbarComponent.drawer();
            },

            setValue: function(universitySourceIdToFind) {
                for (var i = 0; i < this.universitys.length; i++) {
                    if(this.universitys[i].universitySourceId === universitySourceIdToFind){
                        this.universityObject.universitySourceId = this.universitys[i].universitySourceId,
                        this.universityObject.universitySourceName = this.universitys[i].universitySourceName,
                        this.universityObject.universitySourceCountry = this.universitys[i].universitySourceCountry,
                        this.universityObject.universitySourceCity = this.universitys[i].universitySourceCity,
                        this.universityObject.universitySourceAddress = this.universitys[i].universitySourceAddress,
                        this.universityObject.universitySourceImageLink = this.universitys[i].universitySourceImageLink,
                        this.universityObject.universitySourceWebsiteLink = this.universitys[i].universitySourceWebsiteLink,
                        this.universityObject.universitySourceDisplay = this.universitys[i].universitySourceDisplay,
                        this.universityObject.universitySourceCreator = this.universitys[i].universitySourceCreator,
                        this.universityObject.universitySourceMoreInfo = this.universitys[i].universitySourceMoreInfo,
                        this.universityObject.universitySourceContributors = this.universitys[i].universitySourceContributors,                
                        this.universityObject.universitySourceLastUpdate = this.universitys[i].universitySourceLastUpdate,
                        this.universityObject.universitySourcerPartner = this.universitys[i].universitySourcerPartner
                    }
                }
            },

            resetAllFilter(){
                this.CityFilter = undefined
                this.DestinationFilter = undefined
                this.SpecialityFilter = undefined
                this.searchByFilter()
            },

            resetCity(){
                this.CityFilter = undefined
                this.searchByFilter()
            },

            resetDestination(){
                this.DestinationFilter = undefined
                this.searchByFilter()
            },

            resetSpeciality(){
                this.SpecialityFilter = undefined
                this.searchByFilter()
            },

            searchByFilter() {
                this.modelV = this.option.cityStartOption[this.CityFilter]
                this.modelD = this.option.countryOption[this.DestinationFilter]
                this.modelS = this.option.specialityOption[this.SpecialityFilter]

                this.universitysSend = this.universitys.filter(
                    (el) => {
                        if(this.modelV == "" || this.modelV == null || this.modelV == undefined) {
                            return (this.booleanByCountry(el.universitySourcerPartner))
                        } else {
                            return (el.universitySourceCity.toLowerCase() == this.modelV.toLowerCase() && this.booleanByCountry(el.universitySourcerPartner))
                        }
                    }
                )
                
                if(this.universitysSend.length > 0) {
                    this.show = false
                } else {
                    this.show = true
                }
            },

            booleanByCountry(consultList) {
                var res = false

                if(this.modelD != undefined && this.modelS != undefined && consultList) {
                    consultList.forEach(el => {
                        if(el.universityPartnerCountry == this.modelD) {
                            el.universityPartnerSpeciality.forEach(el2=>{
                                if(el2 == this.modelS) {
                                    res = true
                                }
                            })
                        }
                    })
                }

                if(this.modelD == undefined && this.modelS != undefined && consultList) {
                     consultList.forEach(el => {
                        if(el.universityPartnerSpeciality != undefined) {
                            for (let index = 0; index < el.universityPartnerSpeciality.length; index++) {
                                if(el.universityPartnerSpeciality[index] === this.modelS) {
                                    res = true
                                }
                            }
                        }
                    })
                }
                
                if(this.modelD != undefined && this.modelS == undefined && consultList) {
                    consultList.forEach(el => {
                        if(el.universityPartnerCountry === this.modelD) {
                            res = true
                        }
                    })
                }

                if(this.modelD == undefined && this.modelS == undefined) {
                    res = true
                }

                return res        
            },

            enter: function(el, done) {
                $(el).hide().slideDown(800,done)
            },

            leave: function(el, done) {
                $(el).show().slideUp(800, done)
            },

            setVisible: function() {
                this.visible = !this.visible
            }
        },
    }
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
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